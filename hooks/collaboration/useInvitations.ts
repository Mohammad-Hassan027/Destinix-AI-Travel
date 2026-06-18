import { useState, useEffect } from "react";
import * as invitationService from "../../services/collaboration/invitationService";

export const useInvitations = () => {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvitations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await invitationService.listPendingInvitations();
      setInvitations(data);
    } catch (err: any) {
      setError(err.message || "Failed to load invitations");
    } finally {
      setLoading(false);
    }
  };

  const inviteUser = async (groupId: string, email: string) => {
    try {
      return await invitationService.inviteMember(groupId, email);
    } catch (err: any) {
      throw new Error(err.message || "Failed to invite user");
    }
  };

  const acceptInvite = async (id: string) => {
    try {
      await invitationService.acceptInvitation(id);
      setInvitations(prev => prev.filter(i => i.id !== id));
    } catch (err: any) {
      throw new Error(err.message || "Failed to accept invitation");
    }
  };

  const declineInvite = async (id: string) => {
    try {
      await invitationService.declineInvitation(id);
      setInvitations(prev => prev.filter(i => i.id !== id));
    } catch (err: any) {
      throw new Error(err.message || "Failed to decline invitation");
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return {
    invitations,
    loading,
    error,
    fetchInvitations,
    inviteUser,
    acceptInvite,
    declineInvite
  };
};
