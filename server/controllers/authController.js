const { register, login } = require("../services/auth");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await register({ username, email, password });

  res.status(200).json({ status: "user has been registrated", data: user });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;

  const data = await login({ email, password });

  res.status(200).json({
    data,
  });
};

module.exports = {
  registerController,
  loginController,
};
