const router = require("express").Router();

const ctrlWrapper = require("../helpers/ctrlWrapper");

const {
  getUserController,
  updateUserController,
  deleteUserController,
  getFriendsUserController,
  followUserController,
  unfollowUserController,
} = require("../controllers/usersController");

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// get user
router.get("/", ctrlWrapper(getUserController));

// update user
router.put("/:id", ctrlWrapper(updateUserController));

// delete user
router.delete("/:id", ctrlWrapper(deleteUserController));

// get friends user
router.get("/friends/:id", ctrlWrapper(getFriendsUserController));

// follow user
router.put("/:id/follow", ctrlWrapper(followUserController));

// unfollow user
router.put("/:id/unfollow", ctrlWrapper(unfollowUserController));

module.exports = router;
