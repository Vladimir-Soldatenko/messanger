const router = require("express").Router();

const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  saveConversationController,
  getUserConversationController,
} = require("../controllers/conversationsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", ctrlWrapper(saveConversationController));

router.get("/:userId", ctrlWrapper(getUserConversationController));

module.exports = router;
