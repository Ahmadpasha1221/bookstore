const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });

    next();
  } catch (error) {
    console.log("Error in verifyToken ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { verifyToken };
