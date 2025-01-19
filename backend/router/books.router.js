const express = require("express");
const {
  postBook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
  postBooks,
} = require("../controllers/books.controller");
const { verifyToken } = require("../middleware/verifytoken");
const router = express.Router();
router.post("/create-books", verifyToken, postBooks);
router.post("/create-book", postBook);
router.get("/", getAllBooks);
router.get("/:id", getABook);
router.put("/edit/:id", verifyToken, updateABook);
router.delete("/:id", verifyToken, deleteABook);

module.exports = router;
