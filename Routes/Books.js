const express = require("express");
const { books } = require("../Data/books.json"); // { books } here { } are helpfully when we call multiple arrays in the json file
const { users } = require("../Data/users.json");

const routerBook = express.Router(); // Importing

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/
 * Method : GET
 * Description : Get all books
 * Access : Public
 * Parameters : None
 */
routerBook.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the books.....:-)",
    Data: books, // This the Data: json File name
  });
});

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get book by their id
 * Access : Public
 * Parameters : Id
 */
routerBook.get("/:id", (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  const bookDetail = books.find((each) => each.id === id);
  if (!bookDetail) {
    return res.status(400).json({
      success: false,
      message: "Book Not Found ....!", // This the Data: json File name
    });
  }
  return res.status(200).json({
    success: true,
    message: "Here is the Book Details.... :-)",
    Data: bookDetail,
  });
});

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/issuedBooks/allDetails
 * Method : GET
 * Description : Get all details of issued books
 * Access : Public
 * Parameters : None
 */
routerBook.get("/issuedBooks/allDetails", (req, res) => {
  const userWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  userWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedTo = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      messgae: "No Book have been issued yet",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Here are the Users with the issued books .....!",
    Data: issuedBooks,
  });
});

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/
 * Method : POST
 * Description : Add a new Book
 * Access : Public
 * Parameters : None
 */
routerBook.post("/", (req, res) => {
  const { Data } = req.body;
  //  This is for if we dont pass any data
  if (!Data) {
    return res.status(404).json({
      success: false,
      message: "No data to add a book",
    });
  }

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

/**
 * Route : /books/
 * Method : POST
 * Description : Add new Book
 * Access : Public
 * Parameters : None
 */
// routerBook.post("/", (req, res) => {
//   const { id, name, author, genre, price, publisher } = req.body;

//   const newBook = books.find((each) => each.id === id);
//   if (newBook) {
//     return res.status(404).json({
//       success: false,
//       message: "Book with this id already exist",
//     });
//   }
//   books.push({
//     id,
//     name,
//     author,
//     genre,
//     price,
//     publisher,
//   });
//   return res.status(201).json({
//     success: true,
//     message: "User got Updated successfully",
//    // Data: newUser, [just the above content is displayed]
//     Data: books, // [The above content and the content we added is displayed]
//   });
// });

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /updateBook/:id
 * Method : PUT
 * Description : Update books by their id
 * Access : Public
 * Parameters : id
 */
// http://localhost:8081/books/1
// http://localhost:8081/books?id=1
// http://localhost:8081/books?id=ID&name=Name
routerBook.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { Data } = req.body;

  const bookDetail = books.find((each) => each.id === id);
  if (!bookDetail) {
    return res.status(400).json({
      success: false,
      message: "Book does not exist wit this id....!",
    });
  }
  const updateBookData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each, // indicates each element or key in a body
        ...Data, // indicates the data in the body
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "Book updated ....!",
    Data: updateBookData,
  });
});

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /issuedBook/withFine
 * Method : GET
 * Description : Get all issued books with their fines
 * Access : Public
 * Parameters : id
 */

module.exports = routerBook; // Exporting
