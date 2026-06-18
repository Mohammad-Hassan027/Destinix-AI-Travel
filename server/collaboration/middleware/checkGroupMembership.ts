import { Response, NextFunction } from "express";
import { prisma } from "../services/db";

export const checkGroupMembership = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User context missing." });
    }

    // Try to resolve group ID from route param, body, or query
    const groupId = req.params.id || req.body.tripGroupId || req.query.tripGroupId;
    if (!groupId) {
      return res.status(400).json({ error: "Group ID is required" });
    }

    const group = await prisma.tripGroup.findUnique({
      where: { id: groupId }
    });

    if (!group) {
      return res.status(404).json({ error: "Trip group not found" });
    }

    const membership = await prisma.tripMember.findFirst({
      where: {
        tripGroupId: groupId,
        userId: userId
      }
    });

    if (!membership) {
      return res.status(403).json({ error: "Access denied. You are not a member of this group." });
    }

    req.membership = membership;
    next();
  } catch (error) {
    console.error("Check group membership middleware error:", error);
    return res.status(500).json({ error: "Internal server error checking membership" });
  }
};
