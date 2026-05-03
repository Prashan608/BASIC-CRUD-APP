const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: [true, "Book name is required"],
      trim: true
    },

    bookTitle: {
      type: String,
      required: [true, "Book title is required"],
      trim: true
    },

    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true
    },

    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: [0, "Price cannot be negative"]
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;