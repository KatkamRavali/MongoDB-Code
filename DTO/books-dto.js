class IssuedBookId {
  _id;
  name;
  author;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(user) {
    this._id = user.issuedBookId._id;
    this.name = user.issuedBookId.name;
    this.author = user.issuedBookId.author;
    this.genre = user.issuedBookId.genre;
    this.price = user.issuedBookId.price;
    this.publisher = user.issuedBookId.publisher;
    this.issuedBy = user.issuedBy;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }
}
module.exports = IssuedBookId;
