const router = require("express").Router();

const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

router.post("/register", ctrlWrapper(registerController));

router.post("/login", ctrlWrapper(loginController));

module.exports = router;
