import { getCurrentUser } from "../authService";

const getHeaders = () => {
  const user = getCurrentUser();
  return {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

export const inviteMember = async (groupId: string, email: string) => {
  const res = await fetch(`/api/groups/${groupId}/invite`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to send invitation");
  }
  return await res.json();
};

export const listPendingInvitations = async () => {
  const res = await fetch("/api/invitations", {
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to list invitations");
  }
  return await res.json();
};

export const acceptInvitation = async (id: string) => {
  const res = await fetch(`/api/invitations/${id}/accept`, {
    method: "POST",
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to accept invitation");
  }
  return await res.json();
};

export const declineInvitation = async (id: string) => {
  const res = await fetch(`/api/invitations/${id}/decline`, {
    method: "POST",
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to decline invitation");
  }
  return await res.json();
};
