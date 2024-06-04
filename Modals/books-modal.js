const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    publisher: {
      type: String,
      require: true,
    },
  },
  //  timestamp helps to know when that particular update or insertion has been made
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
