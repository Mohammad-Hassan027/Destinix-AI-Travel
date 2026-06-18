import { getCurrentUser } from "../authService";

const getHeaders = () => {
  const user = getCurrentUser();
  return {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

export const getSuggestions = async (groupId: string) => {
  const res = await fetch(`/api/groups/${groupId}/suggestions`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch suggestions");
  }
  return await res.json();
};

export const createSuggestion = async (groupId: string, destinationName: string) => {
  const res = await fetch(`/api/groups/${groupId}/suggestions`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ destinationName })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create suggestion");
  }
  return await res.json();
};

export const voteSuggestion = async (id: string, tripGroupId: string) => {
  const res = await fetch(`/api/suggestions/${id}/vote`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ tripGroupId })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to vote for suggestion");
  }
  return await res.json();
};

export const removeVote = async (id: string, tripGroupId: string) => {
  const res = await fetch(`/api/suggestions/${id}/vote?tripGroupId=${tripGroupId}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to remove vote");
  }
  return await res.json();
};
