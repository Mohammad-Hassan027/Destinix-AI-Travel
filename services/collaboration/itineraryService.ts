import { getCurrentUser } from "../authService";

const getHeaders = () => {
  const user = getCurrentUser();
  return {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

export const getItinerary = async (groupId: string) => {
  const res = await fetch(`/api/groups/${groupId}/itinerary`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch itinerary");
  }
  return await res.json();
};

export const createItineraryItem = async (groupId: string, title: string, description: string, dayNumber: number) => {
  const res = await fetch(`/api/groups/${groupId}/itinerary`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title, description, dayNumber })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create itinerary item");
  }
  return await res.json();
};

export const updateItineraryItem = async (id: string, tripGroupId: string, title: string, description: string, dayNumber: number) => {
  const res = await fetch(`/api/itinerary/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ title, description, dayNumber, tripGroupId })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update itinerary item");
  }
  return await res.json();
};

export const deleteItineraryItem = async (id: string, tripGroupId: string) => {
  const res = await fetch(`/api/itinerary/${id}?tripGroupId=${tripGroupId}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to delete itinerary item");
  }
  return await res.json();
};
