const Conversation = require("../models/ConversationSchema");
const { WrongParametrsError } = require("../helpers/errors");

const saveConversation = async ({ senderId, receiverId }) => {
  const newConversation = new Conversation({ members: [senderId, receiverId] });

  await newConversation.save();

  return newConversation;
};

const getUserConversation = async (userId) => {
  const conversation = await Conversation.find({ members: { $in: [userId] } });

  if (!conversation) {
    throw new WrongParametrsError("Conversation not found");
  }

  return conversation;
};

module.exports = {
  saveConversation,
  getUserConversation,
};
