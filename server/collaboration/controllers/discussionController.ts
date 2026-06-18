import { Response } from "express";
import { DiscussionService } from "../services/discussionService";

export class DiscussionController {
  static async createMessage(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const { message } = req.body;
      const userId = req.user.id;

      const chatMessage = await DiscussionService.createMessage(groupId, message, userId);

      if (req.io) {
        req.io.to(groupId).emit("message:new", chatMessage);
      }

      return res.status(201).json(chatMessage);
    } catch (error: any) {
      console.error("Create message error:", error);
      return res.status(500).json({ error: error.message || "Failed to post message" });
    }
  }

  static async getMessages(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const messages = await DiscussionService.getMessages(groupId);
      return res.json(messages);
    } catch (error: any) {
      console.error("Get messages error:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch messages" });
    }
  }
}
