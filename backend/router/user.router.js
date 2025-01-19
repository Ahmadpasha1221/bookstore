const express = require("express");
const user = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username + "  " + password);
    const admin = await user.findOne({ username });
    if (!admin) {
      return res.status(404).send({ message: "admin not found" });
    }
    console.log(admin);
    if (admin.password !== password) {
      res.status(401).send({ message: "Invalid password!" });
    }
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    if (!token) {
      return res.send({ message: "Invalid credentials" });
    }
    return res.status(200).send({
      success: "Authentication Success",
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log({ error: error });
    res.send({ error: error });
  }
});
module.exports = router;
