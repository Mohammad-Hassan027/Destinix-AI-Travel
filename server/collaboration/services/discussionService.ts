import { prisma } from "./db";

export class DiscussionService {
  static async createMessage(groupId: string, message: string, userId: string) {
    return await prisma.discussionMessage.create({
      data: {
        tripGroupId: groupId,
        message,
        userId
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, avatar: true }
        }
      }
    });
  }

  static async getMessages(groupId: string) {
    return await prisma.discussionMessage.findMany({
      where: { tripGroupId: groupId },
      include: {
        user: {
          select: { id: true, name: true, email: true, avatar: true }
        }
      },
      orderBy: { createdAt: "asc" }
    });
  }
}
