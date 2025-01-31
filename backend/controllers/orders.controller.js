const Order = require("../models/orders.model.js");
const postOrder = async (req, res) => {
  try {
    
    const order = new Order(req.body);
    const savedorder = await order.save();
    res
      .status(201)
      .send({ success: "successfully created an order", data: savedorder });
  } catch (error) {
    console.log("there is an error(order)", error);
    res.status(500).send("there is an error during creation of order");
  }
};
const getOrders = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { postOrder, getOrders };
