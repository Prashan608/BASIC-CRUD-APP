const express = require("express");

const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const bookRoutes = express.Router();

bookRoutes.post("/add", addBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:id", getBookById);
bookRoutes.put("/update/:id", updateBook);
bookRoutes.delete("/delete/:id", deleteBook);

module.exports = bookRoutes;