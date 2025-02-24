const Book = require("../models/books.model.js");

const postBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Successfully submitted book details", book: newBook });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error on sending book details", error: err.message });
  }
};
const postBooks = async (req, res) => {
  try {
    const newBook = await Book.insertMany(req.body);

    res
      .status(200)
      .send({ message: "Successfully submitted book details", book: newBook });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error on sending book details", error: err.message });
  }
};
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
   

    res.status(200).send(books);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to fetch Books", error: err.message });
  }
};
const getABook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(404).send({ message: "book Not Found" });

    const book = await Book.findById(id);
    if (!book) return res.status(404).send({ message: "id Not Found" });
    res.status(200).send(book);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to fetch Books", error: err.message });
  }
};
const updateABook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send({ message: "Book Not Found" });

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook)
      return res.status(404).send({ message: "Book Not Found" });

    res.status(200).send({ book: updatedBook });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to update a book", error: err.message });
  }
};
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send({ message: "Book Not Found" });

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook)
      return res.status(404).send({ message: "Book Not Found" });

    res
      .status(200)
      .send({ message: "successfully deleted", book: deletedBook });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to delete a book", error: err.message });
  }
};
module.exports = {
  postBook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
  postBooks,
};
