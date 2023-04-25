const { WrongParametrsError, FollowError } = require("../helpers/errors");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const getUser = async ({ username, userId }) => {
  const user = username
    ? await User.findOne({ username }, { __v: 0, password: 0, updatedAt: 0 })
    : await User.findById(
        { _id: userId },
        { __v: 0, password: 0, updatedAt: 0 }
      );

  if (!user) {
    throw new WrongParametrsError(`User not found`);
  }

  return user;
};

const updateUser = async ({ userId, id, body }) => {
  if (userId === id || body.isAdmin) {
    if (body.password) {
      try {
        body.password = await bcrypt.hash(body.password, 10);
      } catch (error) {
        throw new WrongParametrsError(error.message);
      }
    }

    const user = await User.findByIdAndUpdate({ _id: id }, { $set: body });

    if (!user) {
      throw new WrongParametrsError(`User with id: ${id} not found`);
    }
  }
  throw new WrongParametrsError(`You can update only your account!`);
};

const deleteUser = async ({ id, userId, body }) => {
  if (userId === id || body.isAdmin) {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new WrongParametrsError("User not found");
    }
  }
  throw new WrongParametrsError("You can delete only your account!");
};

const getFriendsUser = async ({ id, userId }) => {
  const user = await User.findById(id);

  if (!user) {
    throw new WrongParametrsError("User not found");
  }

  if (user.followings.length > 0) {
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(
          { _id: friendId },
          { _id: 1, username: 1, profileAvatar: 1 }
        );
      })
    );
    // let friendsList = [];
    // friends.map((friend) => {
    //   const { _id, username, profileAvatar } = friend;
    //   friendsList.push({ _id, username, profileAvatar });
    // });
    // return friendsList;
    return friends;
  }
  throw new WrongParametrsError("User has no friends");
};

const followUser = async ({ id, userId }) => {
  if (userId !== id) {
    const user = await User.findById(id);

    if (!user) {
      throw new WrongParametrsError("User not found");
    }
    const currentUser = await User.findById(userId);

    if (!user.followers.includes(userId)) {
      await user.updateOne({ $push: { followers: userId } });
      await currentUser.updateOne({ $push: { followings: id } });
    } else {
      throw new FollowError("you allready follow this user");
    }
  } else {
    throw new FollowError("you can't follow yourself");
  }
};

const unfollowUser = async ({ id, userId }) => {
  if (id !== userId) {
    const user = await User.findById(id);

    if (!user) {
      throw new WrongParametrsError("User not found");
    }

    const currentUser = await User.findById(userId);
    if (user.followers.includes(userId)) {
      await user.updateOne({ $pull: { followers: userId } });
      await currentUser.updateOne({ $pull: { followings: id } });
    } else {
      throw new FollowError("you don't follow this user");
    }
  }
  throw new FollowError("you can't unfollow yourself");
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getFriendsUser,
  followUser,
  unfollowUser,
};
