import { getCurrentUser } from "../authService";

const getHeaders = () => {
  const user = getCurrentUser();
  return {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

export const syncUser = async (name: string, avatar?: string, id?: string) => {
  const res = await fetch("/api/auth/sync", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, avatar, id })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to sync user session to backend");
  }
  return await res.json();
};

export const createGroup = async (name: string) => {
  const res = await fetch("/api/groups", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create group");
  }
  return await res.json();
};

export const getGroupDetails = async (id: string) => {
  const res = await fetch(`/api/groups/${id}`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch group details");
  }
  return await res.json();
};

export const listUserGroups = async () => {
  const res = await fetch("/api/groups/user/my-groups", {
    headers: getHeaders()
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to list groups");
  }
  return await res.json();
};

export const deleteGroup = async (id: string) => {
  const res = await fetch(`/api/groups/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete group");
  }
  return await res.json();
};
