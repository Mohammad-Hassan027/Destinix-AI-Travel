import { prisma } from "./db";
import { GroupRole } from "@prisma/client";

export class GroupService {
  static async createGroup(name: string, ownerId: string) {
    return await prisma.$transaction(async (tx) => {
      // 1. Create the group
      const group = await tx.tripGroup.create({
        data: {
          name,
          ownerId
        }
      });

      // 2. Add owner as first member with OWNER role
      await tx.tripMember.create({
        data: {
          tripGroupId: group.id,
          userId: ownerId,
          role: GroupRole.OWNER
        }
      });

      return group;
    });
  }

  static async getGroupDetails(groupId: string) {
    return await prisma.tripGroup.findUnique({
      where: { id: groupId },
      include: {
        owner: {
          select: { id: true, name: true, email: true, avatar: true }
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true }
            }
          }
        },
        invitations: true
      }
    });
  }

  static async listUserGroups(userId: string) {
    return await prisma.tripGroup.findMany({
      where: {
        members: {
          some: { userId }
        }
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true, avatar: true }
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true }
            }
          }
        }
      },
      orderBy: { updatedAt: "desc" }
    });
  }

  static async deleteGroup(groupId: string) {
    return await prisma.tripGroup.delete({
      where: { id: groupId }
    });
  }
}
