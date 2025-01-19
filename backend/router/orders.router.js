const express = require("express");
const { postOrder, getOrders } = require("../controllers/orders.controller.js");

const router = express.Router();
router.post("/create-order", postOrder);
router.get("/:email", getOrders);
module.exports = router;
