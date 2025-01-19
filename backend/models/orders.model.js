const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email regex validation
    },
    phone: {
      type: String,
      required: true,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    billing_same: {
      type: Boolean,
      required: true,
    },
    // Add other fields like total price, cart items, etc., if necessary
    // Example:
    // totalPrice: {
    //   type: Number,
    //   required: true,
    // },
    // cartItems: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'CartItem',
    // }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
