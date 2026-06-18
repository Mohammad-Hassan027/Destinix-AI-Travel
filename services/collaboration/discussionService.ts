import { getCurrentUser } from "../authService";

const getHeaders = () => {
  const user = getCurrentUser();
  return {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

export const getMessages = async (groupId: string) => {
  const res = await fetch(`/api/groups/${groupId}/messages`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch discussion messages");
  }
  return await res.json();
};

export const createMessage = async (groupId: string, message: string) => {
  const res = await fetch(`/api/groups/${groupId}/messages`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ message })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to send message");
  }
  return await res.json();
};
