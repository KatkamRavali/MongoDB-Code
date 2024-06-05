// const userModel = require("../Modals/users-modals");
// const BookModel = require("../Modals/books-modal");
//  --- Or ----
// const modelIndex = require("../Modals/index.js");
//  --- Or ----
const { userModel, bookModel } = require("../Modals/index.js");

const issuedBookId = require("../DTO/books-dto.js");

// -------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/
 * Method : GET
 * Description : Get all books
 * Access : Public
 * Parameters : None
 */

/**  routerBook.get("/", (req, res) => {
    res.status(200).json({
       success: true,
       message: "Got all the books.....:-)",
       Data: books, // This the Data: json File name
      });
    }); 
*/

const getAllBooks = async (req, res) => {
  const books = await bookModel.find();
  // console.log(books);
  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Books Not Found",
    });
  }
  // console.log(Data);
  return res.status(200).json({
    success: true,
    message: "Here are the Books Details :",
    Data: books,
  });
};

// ---------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get book by their id
 * Access : Public
 * Parameters : Id
 */

/** routerBook.get("/:id", (req, res) => {
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
*/

const getSingleBookById = async (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  const bookById = await bookModel.findById(id);
  if (!bookById) {
    return res.status(400).json({
      success: false,
      message: "Book Not Found ....!", // This the Data: json File name
    });
  }
  return res.status(200).json({
    success: true,
    message: "Here is the Book Details.... :-)",
    Data: bookById,
  });
};

// ----------------------------------------------------------------------------------------------------------------

/**
 * Route : /books/issuedBooks/allDetails
 * Method : GET
 * Description : Get all details of issued books
 * Access : Public
 * Parameters : None
 */

// routerBook.get("/issuedBooks/allDetails", (req, res) => {
//   const userWithIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each;
//   });

//   const issuedBooks = [];

//   userWithIssuedBook.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBook);

//     book.issuedTo = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBooks.push(book);
//   });
//   if (issuedBooks.length === 0) {
//     return res.status(404).json({
//       success: false,
//       messgae: "No Book have been issued yet",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Here are the Users with the issued books .....!",
//     Data: issuedBooks,
//   });
// });

const getAllIssuedBooks = async (req, res) => {
  const userWithIssuedBook = await userModel
    .find({
      issuedBookId: { $exists: true },
    })
    .populate("issuedBookId");

  const issuedBooks = userWithIssuedBook.map((each) => new IssuedBook(each));

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
};

// --------------------------------------------------------------------------------------------------------------

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
    };
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

const addNewBook = async (req, res) => {
  const { Data } = req.body;
  //  This is for if we dont pass any data
  if (!Data) {
    return res.status(404).json({
      success: false,
      message: "No data to add a book",
    });
  }
  //   const newBook =
  await bookModel.create(Data);
  const allBook = await bookModel.find();

  //   if (newBook) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Book with this id already exist",
  //     });
  //   }

  return res.status(201).json({
    success: true,
    message: "Book got added successfully",
    Data: allBook,
  });
};

// ---------------------------------------------------------------------------------------------------------------

/**
 * Route : /updateBook/:id
 * Method : PUT
 * Description : Update books by their id
 * Access : Public
 * Parameters : id
 */

/** http://localhost:8081/books/1
    http://localhost:8081/books?id=1
    http://localhost:8081/books?id=ID&name=Name
*/

/** routerBook.put("/updateBook/:id", (req, res) => {
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
*/

const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { Data } = req.body;

  const updateBook = await bookModel.findOneAndUpdate({ _id: id }, Data, {
    new: true, // This is used when we dont refresh the database and to get updated data
  });

  return res.status(200).json({
    success: true,
    message: "Book updated ....!",
    Data: updateBook,
  });
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
};

// --- Another Export method ---
/**
 * exports.getAllBooks = () => {};
 * exports.getSingleBookById = () => {};
 * exports.getAllIssuedBooks = () => {};
 * exports.addNewBook = () => {};
 * exports.updateBookById = () => {};
 */
