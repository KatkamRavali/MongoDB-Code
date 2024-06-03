const express = require("express");
// --- Importing the env file ---
const dotenv = require("dotenv");

// --- Importing Mongo ----
const DBConnection = require("./databaseConnections.js");

const userRoute = require("./Routes/Users.js");
const bookRoute = require("./Routes/Books.js");

// --- to activate the dotenv file ---
dotenv.config();

const application = express();

DBConnection();
const Port = 8081;

application.use(express.json());

// http://localhost:8081/
// ------ Home Page ---------
application.get("/", (req, res) => {
  res.status(200).json({
    message: "Server started running",
  });
});

// http://localhost:8081/users
application.use("/users", userRoute);
// http://localhost:8081/books
application.use("/books", bookRoute);

// ------ Get all roots ---------
application.get("*", (req, res) => {
  res.status(404).json({
    message: "This root doesnot exist",
  });
});

application.listen(Port, () => {
  console.log(`Server is running on the Port ${Port}`);
});
