import express from "express";
import { protectRoute } from "../middleware/auth";
import { getAllMessages, getUsersForSidebar, markMessagesAsSeen, sendMessage } from "../controllers/messageController";


const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getAllMessages);
messageRouter.put("/mark/:id", protectRoute, markMessagesAsSeen);
messageRouter.post("/send/:id",protectRoute,sendMessage)

export default messageRouter;