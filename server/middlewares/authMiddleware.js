const { Unauthorized } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.get("Authorization")) {
    next(new Unauthorized("You are not authorized"));
  }
  const [tokenType, token] = req.get("Authorization").split(" ");

  if (!token) {
    next(new Unauthorized("Please, provide a token"));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new Unauthorized("Invalid token"));
  }
};

module.exports = authMiddleware;
