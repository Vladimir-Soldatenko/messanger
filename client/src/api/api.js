import axios from "axios";

const token = sessionStorage.getItem("token");

const api = {
  posts: {
    createPost: (post) =>
      axios
        .post("/post", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            post,
          },
        })
        .then((res) => res.data),
    updatePost: ({ postId, post }) =>
      axios
        .put(
          `/post/${postId}`,
          {
            post,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res),
    deletePost: (postId) =>
      axios
        .delete(`/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res),
    getPost: (id) =>
      axios
        .get(`/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    getAllPosts: () =>
      axios
        .get("/post", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    getTimelinePosts: () =>
      axios
        .get("/post/timeline/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  },
  user: {
    getUserByUsername: (username) =>
      axios
        .get(`/users?username=${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    getUserByUserId: (id) =>
      axios
        .get(`/users?userId=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    getUserFriend: (id) =>
      axios
        .get(`/users/friends/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  },
  auth: {
    login: ({ email, password }) =>
      axios
        .post(
          "/auth/login",
          { email: email, password: password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data),
    register: ({ email, password, username }) =>
      axios
        .post(
          "/auth/register",
          {
            email: email,
            password: password,
            username: username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data),
  },
  conversations: {
    getUserConversations: (id) =>
      axios.get(`/conversation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },
  messages: {
    getMessages: (conversationId) =>
      axios
        .get(`/messages/${conversationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    sendMessage: ({ sender, text, conversationId }) =>
      axios
        .post(
          "/messages",
          { sender, text, conversationId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data),
  },
};

export default api;
