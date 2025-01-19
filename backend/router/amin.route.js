const express = require("express");
const ordersModel = require("../models/orders.model");
const booksModel = require("../models/books.model");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const totalOrders = await ordersModel.countDocuments();
    const totalSales = await ordersModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    const trendingBooksCount = await ordersModel.aggregate([
      {
        $match: {
          trending: true,
        },
      },
      {
        $count: "trendingBooksCount",
      },
    ]);
    const trendingBookscount =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;
    const totalBooks = await booksModel.countDocuments();
    const monthlySales = await ordersModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
            },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
          totalOrders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(200).json({
      totalOrders,
      totalBooks,
      trendingBookscount,
      totalSales: totalSales[0]?.totalSales || 0,
      monthlySales,
    });
  } catch (error) {
    console.log("Error occured: ", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});
module.exports = router;
