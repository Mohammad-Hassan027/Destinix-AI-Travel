import { useState, useEffect } from "react";
import * as itineraryService from "../../services/collaboration/itineraryService";
import { getSocket } from "../../services/collaboration/socket";

export const useItinerary = (groupId: string | undefined) => {
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItinerary = async () => {
    if (!groupId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await itineraryService.getItinerary(groupId);
      setItinerary(data);
    } catch (err: any) {
      setError(err.message || "Failed to load itinerary");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (title: string, description: string, dayNumber: number) => {
    if (!groupId) return;
    try {
      return await itineraryService.createItineraryItem(groupId, title, description, dayNumber);
    } catch (err: any) {
      throw new Error(err.message || "Failed to add itinerary item");
    }
  };

  const updateItem = async (id: string, title: string, description: string, dayNumber: number) => {
    if (!groupId) return;
    try {
      return await itineraryService.updateItineraryItem(id, groupId, title, description, dayNumber);
    } catch (err: any) {
      throw new Error(err.message || "Failed to update itinerary item");
    }
  };

  const deleteItem = async (id: string) => {
    if (!groupId) return;
    try {
      await itineraryService.deleteItineraryItem(id, groupId);
    } catch (err: any) {
      throw new Error(err.message || "Failed to delete itinerary item");
    }
  };

  useEffect(() => {
    if (!groupId) return;

    fetchItinerary();

    // Setup Socket.IO listeners
    const socket = getSocket();
    socket.emit("group:join", groupId);

    const handleCreated = (newItem: any) => {
      setItinerary(prev => {
        if (prev.find(item => item.id === newItem.id)) return prev;
        const updated = [...prev, newItem];
        return updated.sort(
          (a, b) => a.dayNumber - b.dayNumber || new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    };

    const handleUpdated = (updatedItem: any) => {
      setItinerary(prev => {
        if (updatedItem.deleted) {
          return prev.filter(item => item.id !== updatedItem.id);
        }
        const index = prev.findIndex(item => item.id === updatedItem.id);
        if (index === -1) {
          return [...prev, updatedItem].sort(
            (a, b) => a.dayNumber - b.dayNumber || new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        const updated = [...prev];
        updated[index] = updatedItem;
        return updated.sort(
          (a, b) => a.dayNumber - b.dayNumber || new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    };

    socket.on("itinerary:created", handleCreated);
    socket.on("itinerary:updated", handleUpdated);

    return () => {
      socket.off("itinerary:created", handleCreated);
      socket.off("itinerary:updated", handleUpdated);
    };
  }, [groupId]);

  return { itinerary, loading, error, fetchItinerary, addItem, updateItem, deleteItem };
};
