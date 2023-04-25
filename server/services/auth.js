const User = require("../models/UserSchema");
const { Unauthorized } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async ({ username, email, password }) => {
  const newUser = new User({ username, email, password });

  await newUser.save();

  return newUser;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }, { __v: 0 });

  if (!user) {
    throw new Unauthorized(`User with email: ${email} not found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Unauthorized("Invalid password");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  return { token, user };
};

module.exports = { register, login };
