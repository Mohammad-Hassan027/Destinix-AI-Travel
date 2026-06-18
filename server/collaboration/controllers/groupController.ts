import { Response } from "express";
import { GroupService } from "../services/groupService";

export class GroupController {
  static async createGroup(req: any, res: Response) {
    try {
      const { name } = req.body;
      const ownerId = req.user.id;
      const group = await GroupService.createGroup(name, ownerId);
      return res.status(201).json(group);
    } catch (error: any) {
      console.error("Create group controller error:", error);
      return res.status(500).json({ error: error.message || "Failed to create group" });
    }
  }

  static async getGroupDetails(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const group = await GroupService.getGroupDetails(groupId);
      if (!group) return res.status(404).json({ error: "Group not found" });
      return res.json(group);
    } catch (error: any) {
      console.error("Get group details error:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch group details" });
    }
  }

  static async listUserGroups(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const groups = await GroupService.listUserGroups(userId);
      return res.json(groups);
    } catch (error: any) {
      console.error("List user groups error:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch user groups" });
    }
  }

  static async deleteGroup(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      await GroupService.deleteGroup(groupId);
      return res.json({ success: true, message: "Group deleted successfully" });
    } catch (error: any) {
      console.error("Delete group error:", error);
      return res.status(500).json({ error: error.message || "Failed to delete group" });
    }
  }
}
