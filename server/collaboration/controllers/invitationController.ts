import { Response } from "express";
import { InvitationService } from "../services/invitationService";

export class InvitationController {
  static async inviteMember(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const { email } = req.body;
      const invitedBy = req.user.id;

      const invitation = await InvitationService.createInvitation(groupId, email, invitedBy);
      return res.status(201).json(invitation);
    } catch (error: any) {
      console.error("Invite member error:", error);
      return res.status(500).json({ error: error.message || "Failed to send invitation" });
    }
  }

  static async listPendingInvitations(req: any, res: Response) {
    try {
      const email = req.user.email;
      const invitations = await InvitationService.listPendingInvitations(email);
      return res.json(invitations);
    } catch (error: any) {
      console.error("List pending invitations error:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch invitations" });
    }
  }

  static async acceptInvitation(req: any, res: Response) {
    try {
      const invitationId = req.params.id;
      const userId = req.user.id;

      const member = await InvitationService.acceptInvitation(invitationId, userId);
      return res.json({ success: true, member });
    } catch (error: any) {
      console.error("Accept invitation error:", error);
      return res.status(500).json({ error: error.message || "Failed to accept invitation" });
    }
  }

  static async declineInvitation(req: any, res: Response) {
    try {
      const invitationId = req.params.id;
      await InvitationService.declineInvitation(invitationId);
      return res.json({ success: true, message: "Invitation declined successfully" });
    } catch (error: any) {
      console.error("Decline invitation error:", error);
      return res.status(500).json({ error: error.message || "Failed to decline invitation" });
    }
  }
}
