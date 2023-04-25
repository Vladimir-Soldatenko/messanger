const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getAllPost,
  getAllTimelinePost,
} = require("../services/post");

const createPostController = async (req, res) => {
  const { userId } = req.user;
  const { desc, img, likes } = req.body;

  const newPost = await createPost({ userId, desc, img, likes });

  res.status(200).json(newPost);
};

const updatePostController = async (req, res) => {
  const { userId } = req.user;
  const { desc, img, likes } = req.body;
  const { postId } = req.params;

  await updatePost({ userId, desc, img, likes, postId });

  res.status(200).json({ status: "post has been updated" });
};

const deletePostController = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.params;

  await deletePost({ userId, postId });

  res.status(200).json({ status: "post has been deleted" });
};

const likePostController = async (req, res) => {
  const { userId } = req.user;
  const { id: postId } = req.params;

  await likePost({ userId, postId });

  res.status(200).json({ status: "success" });
};

const getPostController = async (req, res) => {
  const { userId } = req.user;
  const { id: postId } = req.params;

  const post = await getPost({ userId, postId });

  res.status(200).json(post);
};

const getAllPostController = async (req, res) => {
  const { userId } = req.user;

  const posts = await getAllPost(userId);

  res.status(200).json(posts);
};

const getAllTimelinePostsController = async (req, res) => {
  const { userId } = req.user;

  const posts = await getAllTimelinePost(userId);

  res.status(200).json(posts);
};

module.exports = {
  createPostController,
  updatePostController,
  deletePostController,
  likePostController,
  getPostController,
  getAllPostController,
  getAllTimelinePostsController,
};
