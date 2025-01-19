const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
const db = require("./DB/db.js");
const booksRouter = require("./router/books.router.js");
const ordersRouter = require("./router/orders.router.js");
const userRouter = require("./router/user.router.js");
const adminRoutes = require("./router/amin.route.js");
env.config();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use("/api/auth", userRouter);
app.use("/api/books", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Helloooooooooooooo");
});
app.listen(port, () => {
  db();
  console.log(`Listening to ${port}`);
});
