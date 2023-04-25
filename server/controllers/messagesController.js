const { saveMessage, getAllMessage } = require("../services/message");

const saveMessageController = async (req, res) => {
  const newMessage = await saveMessage(req.body);

  res.status(200).json(newMessage);
};

const getAllMessageController = async (req, res) => {
  const { conversationId } = req.params;
  const messages = await getAllMessage(conversationId);

  res.status(200).json(messages);
};

module.exports = { saveMessageController, getAllMessageController };
