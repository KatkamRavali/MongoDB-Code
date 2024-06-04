const express = require("express");
const { books } = require("../Data/books.json"); // { books } here { } are helpfully when we call multiple arrays in the json file
const { users } = require("../Data/users.json");

// const userModel = require("../Modals/users-modals");
// const BookModel = require("../Modals/books-modal");
//  --- Or ----
// const modelIndex = require("../Modals/index.js");
//  --- Or ----
const { userModel, BookModel } = require("../Modals/index.js");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../Controllers/books-controller.js");

const routerBook = express.Router(); // Importing

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/
 * Method : GET
 * Description : Get all books
 * Access : Public
 * Parameters : None
 */

routerBook.get("/", getAllBooks);

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get book by their id
 * Access : Public
 * Parameters : Id
 */

routerBook.get("/:id", getSingleBookById);

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/issuedBooks/allDetails
 * Method : GET
 * Description : Get all details of issued books
 * Access : Public
 * Parameters : None
 */

routerBook.get("/issuedBooks/allDetails", getAllIssuedBooks);

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/
 * Method : POST
 * Description : Add a new Book
 * Access : Public
 * Parameters : None
 */

/** routerBook.post("/", (req, res) => {
    const { Data } = req.body;
    //  This is for if we dont pass any data
    if (!Data) {
      return res.status(404).json({
        success: false,
        message: "No data to add a book",
      });

    const book = books.find((each) => each.id === Data.id);
    if (book) {
      return res.status(404).json({
        success: false,
        message: "Book with this id already exist",
      });
    }
    const allBook = { ...books, Data }; // [ This line indicates that we get all the books + updated book details ]
    // const allBook = Data;  // [ This line indicates that we get only the updated book detail ]
    return res.status(201).json({
      success: true,
      message: "Book got added successfully",
      Data: allBook,
    });
  });
*/

routerBook.post("/", addNewBook);

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /updateBook/:id
 * Method : PUT
 * Description : Update books by their id
 * Access : Public
 * Parameters : id
 */

routerBook.put("/updateBook/:id", updateBookById);

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /issuedBook/withFine
 * Method : GET
 * Description : Get all issued books with their fines
 * Access : Public
 * Parameters : id
 */

module.exports = routerBook; // Exporting
