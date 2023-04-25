const router = require("express").Router();

const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  createPostController,
  updatePostController,
  deletePostController,
  likePostController,
  getPostController,
  getAllPostController,
  getAllTimelinePostsController,
} = require("../controllers/postsController");

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// create post
router.post("/", ctrlWrapper(createPostController));

//update post
router.put("/:postId", ctrlWrapper(updatePostController));

//delete post
router.delete("/:postId", ctrlWrapper(deletePostController));

//like-dislike  post
router.put("/:id/like", ctrlWrapper(likePostController));

//get post
router.get("/:id", ctrlWrapper(getPostController));

//get all post
router.get("/", ctrlWrapper(getAllPostController));

//timeline posts
router.get("/timeline/all", ctrlWrapper(getAllTimelinePostsController));

module.exports = router;
