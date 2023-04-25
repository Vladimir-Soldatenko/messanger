const { CustomMainError } = require("./errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomMainError) {
    return res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;
