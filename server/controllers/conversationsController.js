const {
  saveConversation,
  getUserConversation,
} = require("../services/conversation");

const saveConversationController = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const conversation = await saveConversation({ senderId, receiverId });

  res.status(200).json(conversation);
};

const getUserConversationController = async (req, res) => {
  const { userId: id } = req.user;
  const { userId } = req.params;

  const conversation = await getUserConversation(userId);

  res.status(200).json(conversation);
};

module.exports = { saveConversationController, getUserConversationController };
