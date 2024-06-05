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
  getAllSubscriptionDetailsById,
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

routerUser.get("/subscription-details/:id", getAllSubscriptionDetailsById);

module.exports = routerUser; // Exporting
