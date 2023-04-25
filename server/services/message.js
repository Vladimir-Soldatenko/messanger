const Message = require("../models/MessageSchema");
const { WrongParametrsError } = require("../helpers/errors");

const saveMessage = async (mess) => {
  const newMessage = new Message(mess);

  await newMessage.save();

  return newMessage;
};

const getAllMessage = async (conversationId) => {
  const messages = await Message.find({ conversationId });

  if (!messages) {
    throw new WrongParametrsError("Conversation not found");
  }

  return messages;
};

module.exports = {
  saveMessage,
  getAllMessage,
};
