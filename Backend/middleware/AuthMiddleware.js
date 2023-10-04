const jwt = require("jsonwebtoken");
require('dotenv').config()

const AuthMiddleware = (req, res, next) => {
  const JWT_SIGN = process.env.JWT_SIGN;
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SIGN);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = AuthMiddleware;
