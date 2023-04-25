const router = require("express").Router();

const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  saveMessageController,
  getAllMessageController,
} = require("../controllers/messagesController");

router.post("/", ctrlWrapper(saveMessageController));

router.get("/:conversationId", ctrlWrapper(getAllMessageController));

module.exports = router;
