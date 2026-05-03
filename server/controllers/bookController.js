const Book = require("../models/bookModel");

// CREATE
exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    console.log(book)
    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      data: book
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      message: "All books fetched",
      data: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ONE
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};