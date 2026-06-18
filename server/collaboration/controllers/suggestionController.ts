import { Response } from "express";
import { SuggestionService } from "../services/suggestionService";

export class SuggestionController {
  static async createSuggestion(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const { destinationName } = req.body;
      const suggestedBy = req.user.id;

      const suggestion = await SuggestionService.createSuggestion(groupId, destinationName, suggestedBy);

      if (req.io) {
        req.io.to(groupId).emit("suggestion:new", suggestion);
      }

      return res.status(201).json(suggestion);
    } catch (error: any) {
      console.error("Create suggestion error:", error);
      return res.status(500).json({ error: error.message || "Failed to create suggestion" });
    }
  }

  static async getSuggestions(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const suggestions = await SuggestionService.getSuggestions(groupId);
      return res.json(suggestions);
    } catch (error: any) {
      console.error("Get suggestions error:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch suggestions" });
    }
  }

  static async voteSuggestion(req: any, res: Response) {
    try {
      const suggestionId = req.params.id;
      const userId = req.user.id;

      const suggestion = await SuggestionService.voteSuggestion(suggestionId, userId);
      if (!suggestion) return res.status(404).json({ error: "Suggestion not found" });

      if (req.io) {
        req.io.to(suggestion.tripGroupId).emit("vote:added", suggestion);
      }

      return res.json(suggestion);
    } catch (error: any) {
      console.error("Vote suggestion error:", error);
      return res.status(500).json({ error: error.message || "Failed to vote suggestion" });
    }
  }

  static async removeVote(req: any, res: Response) {
    try {
      const suggestionId = req.params.id;
      const userId = req.user.id;

      const suggestion = await SuggestionService.removeVote(suggestionId, userId);
      if (!suggestion) return res.status(404).json({ error: "Suggestion not found" });

      if (req.io) {
        req.io.to(suggestion.tripGroupId).emit("vote:added", suggestion);
      }

      return res.json(suggestion);
    } catch (error: any) {
      console.error("Remove vote error:", error);
      return res.status(500).json({ error: error.message || "Failed to remove vote" });
    }
  }
}
