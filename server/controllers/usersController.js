const {
  getUser,
  updateUser,
  deleteUser,
  getFriendsUser,
  followUser,
  unfollowUser,
} = require("../services/users");

const getUserController = async (req, res) => {
  const { userId } = req.query;
  const { username } = req.query;

  const user = await getUser({ username, userId });

  res.status(200).json(user);
};

const updateUserController = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const { body } = req;

  await updateUser({ userId, id, body });

  res.status(200).json({ status: "Account has been updated" });
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { body } = req;

  await deleteUser({ id, userId, body });

  res.status(200).json({ status: "Account has been deleted" });
};

const getFriendsUserController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const userFriends = await getFriendsUser({ id, userId });

  res.status(200).json(userFriends);
};

const followUserController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  await followUser({ id, userId });

  res.status(200).json({ status: "user has been followed" });
};

const unfollowUserController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  await unfollowUser({ id, userId });

  res.status(200).json({ status: "user has been unfollowed" });
};

module.exports = {
  getUserController,
  updateUserController,
  deleteUserController,
  getFriendsUserController,
  followUserController,
  unfollowUserController,
};
