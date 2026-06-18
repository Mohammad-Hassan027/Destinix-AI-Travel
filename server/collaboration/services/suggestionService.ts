import { prisma } from "./db";

export class SuggestionService {
  static async createSuggestion(groupId: string, destinationName: string, suggestedByUserId: string) {
    return await prisma.destinationSuggestion.create({
      data: {
        tripGroupId: groupId,
        destinationName,
        suggestedBy: suggestedByUserId
      },
      include: {
        suggestedByUser: {
          select: { id: true, name: true, email: true, avatar: true }
        },
        votes: true
      }
    });
  }

  static async getSuggestions(groupId: string) {
    return await prisma.destinationSuggestion.findMany({
      where: { tripGroupId: groupId },
      include: {
        suggestedByUser: {
          select: { id: true, name: true, email: true, avatar: true }
        },
        votes: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async voteSuggestion(suggestionId: string, userId: string) {
    await prisma.destinationVote.upsert({
      where: {
        suggestionId_userId: {
          suggestionId,
          userId
        }
      },
      update: {},
      create: {
        suggestionId,
        userId
      }
    });

    return await prisma.destinationSuggestion.findUnique({
      where: { id: suggestionId },
      include: {
        suggestedByUser: {
          select: { id: true, name: true, email: true, avatar: true }
        },
        votes: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true }
            }
          }
        }
      }
    });
  }

  static async removeVote(suggestionId: string, userId: string) {
    await prisma.destinationVote.delete({
      where: {
        suggestionId_userId: {
          suggestionId,
          userId
        }
      }
    });

    return await prisma.destinationSuggestion.findUnique({
      where: { id: suggestionId },
      include: {
        suggestedByUser: {
          select: { id: true, name: true, email: true, avatar: true }
        },
        votes: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true }
            }
          }
        }
      }
    });
  }
}
