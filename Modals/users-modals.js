const mongoose = require("mongoose"); // Importing mongoose

const Schema = mongoose.Schema; // initializing schema

// Creating class
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    surname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    issuedBookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      require: false,
    },
    issuedDate: {
      type: String,
      require: false,
    },
    returnDate: {
      type: String,
      require: false,
    },
    subscriptionType: {
      type: String,
      require: true,
    },
    subscriptionDate: {
      type: String,
      require: true,
    },
  },
  //  timestamp helps to know when that particular update or insertion has been made
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
