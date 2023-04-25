const { WrongParametrsError } = require("../helpers/errors");
const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

const createPost = async ({ userId, desc, img, likes }) => {
  const newPost = new Post({ userId, desc, img, likes });

  await newPost.save();

  return newPost;
};

const updatePost = async ({ userId, desc, img, likes, postId }) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new WrongParametrsError(`Post with id: ${postId} not found`);
  }

  if (userId === post.userId) {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { desc, img, likes }
    );

    return updatedPost;
  }
};

const deletePost = async ({ userId, postId }) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new WrongParametrsError(`Post with id: ${postId} not found`);
  }

  if (userId === post.userId) {
    await Post.findByIdAndRemove(postId);
  }
};

const likePost = async ({ userId, postId }) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new WrongParametrsError(`Post with id: ${postId} not found`);
  }

  if (post.likes.includes(userId)) {
    await post.updateOne({ $pull: { likes: userId } });
  } else {
    await post.updateOne({ $push: { likes: userId } });
  }
};

const getPost = async ({ userId, postId }) => {
  const post = await Post.find({ _id: postId, userId });

  if (!post) {
    throw new WrongParametrsError(`Post not found`);
  }
  return post;
};

const getAllPost = async (userId) => {
  const posts = await Post.find({ userId });

  if (!posts) {
    throw new WrongParametrsError(`User don't have a posts`);
  }
  return posts;
};

const getAllTimelinePost = async (userId) => {
  const currentUser = await User.findById({ _id: userId });
  const userPosts = await Post.find({ userId });

  if (!userPosts) {
    throw new WrongParametrsError(`User don't have a posts`);
  }

  if (currentUser.followers.length > 0) {
    const friendsPosts = await Promise.all(
      currentUser.followers.forEach((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return { ...userPosts, ...friendsPosts };
  }
  return userPosts;
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getAllPost,
  getAllTimelinePost,
};
