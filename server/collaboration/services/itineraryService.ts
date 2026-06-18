import { prisma } from "./db";

export class ItineraryService {
  static async createItineraryItem(
    groupId: string,
    title: string,
    description: string | undefined,
    dayNumber: number,
    createdByUserId: string
  ) {
    return await prisma.sharedItinerary.create({
      data: {
        tripGroupId: groupId,
        title,
        description,
        dayNumber,
        createdBy: createdByUserId
      }
    });
  }

  static async updateItineraryItem(
    id: string,
    title: string,
    description: string | undefined,
    dayNumber: number,
    updatedByUserId: string
  ) {
    return await prisma.sharedItinerary.update({
      where: { id },
      data: {
        title,
        description,
        dayNumber,
        updatedBy: updatedByUserId
      }
    });
  }

  static async deleteItineraryItem(id: string) {
    return await prisma.sharedItinerary.delete({
      where: { id }
    });
  }

  static async getItinerary(groupId: string) {
    return await prisma.sharedItinerary.findMany({
      where: { tripGroupId: groupId },
      orderBy: [
        { dayNumber: "asc" },
        { createdAt: "asc" }
      ]
    });
  }
}
