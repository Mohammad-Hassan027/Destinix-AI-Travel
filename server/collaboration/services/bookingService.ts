import { prisma } from "./db";

export class BookingService {
  static async createBookingRecord(
    groupId: string,
    bookingReference: string,
    bookingType: string,
    amount: number,
    status: string
  ) {
    return await prisma.sharedBooking.create({
      data: {
        tripGroupId: groupId,
        bookingReference,
        bookingType,
        amount,
        status
      }
    });
  }

  static async getBookings(groupId: string) {
    return await prisma.sharedBooking.findMany({
      where: { tripGroupId: groupId },
      orderBy: { createdAt: "desc" }
    });
  }
}
