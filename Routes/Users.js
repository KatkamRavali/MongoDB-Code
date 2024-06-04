const express = require("express");
const { users } = require("../Data/users.json");
// {users} here { } are helpfully when we call multiple arrays in the json file

// const userModel = require("../Modals/users-modals");
// const BookModel = require("../Modals/books-modal");
//  --- Or ----
// const modelIndex = require("../Modals/index.js");
//  --- Or ----
const { userModel, BookModel } = require("../Modals/index.js");
const {
  getAllUsers,
  getSingleUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
} = require("../Controllers/users-controller.js");

const routerUser = express.Router(); // Importing

// --------------------------------------------------------------------------------------------------------------

/**
 * Route : /
 * Method : GET
 * Description : Get all users
 * Access : Public
 * Parameters : None
 */

routerUser.get("/", getAllUsers);

// --------------------------------------------------------------------------------------------------------------

/**
 * Route : /:id
 * Method : GET
 * Description : Get single user by their id
 * Access : Public
 * Parameters : Id
 */
routerUser.get("/:id", getSingleUserById);

// --------------------------------------------------------------------------------------------------------------

/**
 * Route : /
 * Method : POST
 * Description : Add new user
 * Access : Public
 * Parameters : None
 */
routerUser.post("/", addNewUser);

// --------------------------------------------------------------------------------------------------------------

/**
 * Route : /:id
 * Method : PUT
 * Description : Update user by their id
 * Access : Public
 * Parameters : id
 */
routerUser.put("/:id", updateUserById);

// --------------------------------------------------------------------------------------------------------------

/**
 * Route : /:id
 * Method : DELETE
 * Description : Delete user using id
 * Access : Public
 * Parameters : id
 */
routerUser.delete("/:id", deleteUserById);

// --------------------------------------------------------------------------------------------------------------

/**
 * Route : /subscription-details/:id
 * Method : GET
 * Description : Get all user subscription details using id
 * Access : Public
 * Parameters : id
 */
routerUser.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params; // To get id
  const subscriptionDetails = users.find((each) => each.id === id); // Find whether the id exist or not

  if (!subscriptionDetails) {
    return res.status(400).json({
      success: false,
      message: "User with the id doesnot exist",
    });
  }

  //  To get the no of days
  const getDateInDays = (Data = "") => {
    // This is for getting the subscription date in days
    let date; // Assiging a variable
    if (Data === "") {
      //  If we have date as blank we will consider this
      date = new Date();
    } else {
      //  If we have date we will return the same date in this condition
      date = new Date(Data);
    }
    // 12hr => 12*60 mins              &&           155mins => 155/60
    let days = Math.floor(date / (1000 * 60 * 60 * 24)); // floor example:- 2.7 = 2   &&    seal example:- 2.7 = 3
    // To convert into days  [1000ms * 60sec * 60min * 24hr]
    return days;
  };
  const subscriptionType = (date) => {
    // if (subscriptionDetails.subscriptionType === "Basic") {
    //   date = date + 30;
    // } else
    if (subscriptionDetails.subscriptionType === "Basic") {
      date = date + 90;
    } else if (subscriptionDetails.subscriptionType === "Standard") {
      date = date + 180;
    } else if (subscriptionDetails.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  //  Jan 1 1970 UTC
  let returnDate = getDateInDays(subscriptionDetails.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(subscriptionDetails.subscriptionDate);
  let subscriptionExpire = subscriptionType(subscriptionDate);

  // console.log("ReturnDate", returnDate);
  // console.log("CurrentDate", currentDate);
  // console.log("subscriptionDate", subscriptionDate);
  // console.log("subscriptionDate", subscriptionExpire);

  const Data = {
    ...subscriptionDetails,
    IsSubscriptionExpired: subscriptionExpire < currentDate,
    daysLeftForExpire:
      subscriptionExpire <= currentDate ? 0 : subscriptionExpire - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpire <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription details for the user is :",
    Data,
  });
});

module.exports = routerUser; // Exporting
