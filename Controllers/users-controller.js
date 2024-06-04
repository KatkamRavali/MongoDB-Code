// const userModel = require("../Modals/users-modals");
// const BookModel = require("../Modals/books-modal");
//  --- Or ----
// const modelIndex = require("../Modals/index.js");
//  --- Or ----
const { userModel, BookModel } = require("../Modals/index.js");

// -----------------------------------------------------------------------------------------------------
/**
 * Route : /
 * Method : GET
 * Description : Get all users
 * Access : Public
 * Parameters : None
 */

/**
    routerUser.get("/", (req, res) => {
      res.status(200).json({
        success: true,
        Data: users, // This the Data: json File name
      });
    });
*/

const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Here are the user details :",
    Data: users, // This the Data: json File name
  });
};

// -------------------------------------------------------------------------------------------------------
/**
 * Route : /:id
 * Method : GET
 * Description : Get single user by their id
 * Access : Public
 * Parameters : Id
 */

/**
  routerUser.get("/:id", (req, res) => {
  const { id } = req.params; // or const id = req.params.id;
  const userDetail = users.find((each) => each.id === id);
  if (!userDetail) {
    return res.status(400).json({
      success: false,
      message: "User does not exist ....!", // This the Data: json File name
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "User found .... :-)",
      Data: userDetail,
    });
  }
});
*/

const getSingleUserById = async (re, res) => {
  const { id } = req.params; // const id = req.params.id;
  const userById = await userModel.findById(id);
  //   const userById = await userModel.findById({ _id: id });
  if (!userById) {
    return res.status(400).json({
      success: false,
      message: "User Not Found with this ID....!", // This the Data: json File name
    });
  }
  return res.status(200).json({
    success: true,
    message: "Here is the User Details.... :-)",
    Data: userById,
  });
};

// -----------------------------------------------------------------------------------------------------
/**
 * Route : /
 * Method : POST
 * Description : Add new user
 * Access : Public
 * Parameters : None
 */

/**
 * routerUser.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const newUser = users.find((each) => each.id === id);
  if (newUser) {
    return res.status(404).json({
      success: false,
      message: "User with this is alreay exist",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    message: "User got Updated successfully",
    // Data: newUser, [just the above content is displayed]
    Data: users, // [The above content and the content we added is displayed]
  });
});
*/

const addNewUser = async (req, res) => {
  const { Data } = req.body;
  //  This is for if we dont pass any data
  if (!Data) {
    return res.status(404).json({
      success: false,
      message: "No data to add a user",
    });
  }
  //   const newUser =
  await userModel.create(Data);
  const allUsers = await userModel.find();

  //   if (newUser) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "User with this id already exist",
  //     });
  //   }

  return res.status(201).json({
    success: true,
    message: "User got added successfully",
    Data: allUsers,
  });
};

// ---------------------------------------------------------------------------------------------------
/**
 * Route : /:id
 * Method : PUT
 * Description : Update user by their id
 * Access : Public
 * Parameters : id
 */

/**
 * routerUser.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const userDetail = users.find((each) => each.id === id);
  if (!userDetail) {
    return res.status(400).json({
      success: false,
      message: "User does not exist ....!",
    });
  }
  const updateUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each, // indicates each element or key in a body
        ...data, // indicates the data in the body
      };
    }
    return each;
  });
  return res.status(201).json({
    success: true,
    message: "User updated ....!",
    Data: updateUser,
  });
});
*/

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { Data } = req.body;

  //   const updateUser = await userModel.findOneAndUpdate({ _id: id }, Data, {
  //     new: true, // This is used when we dont refresh the database and to get updated data
  //   });

  const updateUser = await userModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...Data,
      },
    },
    {
      new: true, // This is used when we dont refresh the database and to get updated data
    }
  );

  return res.status(200).json({
    success: true,
    message: "User updated ....!",
    Data: updateUser,
  });
};

// ------------------------------------------------------------------------------------------------------
/**
 * Route : /:id
 * Method : DELETE
 * Description : Delete user using id
 * Access : Public
 * Parameters : id
 */

/**
 * routerUser.delete("/:id", (req, res) => {
  const { id } = req.params;

  const userDetail = users.find((each) => each.id === id);
  if (!userDetail) {
    return res.status(400).json({
      success: false,
      message: "User does not exist ....!",
    });
  } else {
    const index = users.indexOf(userDetail);
    users.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully ....!",
      Data: users,
    });
  }
});
 */

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  const deleteUser = await userModel.deleteOne({ _id: id });
  if (!deleteUser) {
    return res.status(400).json({
      success: false,
      message: "User does not exist ....!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully ....!",
    Data: users,
  });
};

module.exports = {
  getAllUsers,
  getSingleUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
};

// --- Another Export method ---
/**
 * exports.getAllUsers = () => {};
 * exports.getSingleUserById = () => {};
 * exports.addNewUser = () => {};
 * exports.updateUserById = () => {};
 * exports.deleteUserById = () => {};
 */
