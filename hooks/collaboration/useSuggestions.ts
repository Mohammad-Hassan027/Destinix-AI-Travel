import { useState, useEffect } from "react";
import * as suggestionService from "../../services/collaboration/suggestionService";
import { getSocket } from "../../services/collaboration/socket";

export const useSuggestions = (groupId: string | undefined) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    if (!groupId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await suggestionService.getSuggestions(groupId);
      setSuggestions(data);
    } catch (err: any) {
      setError(err.message || "Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  };

  const addSuggestion = async (destinationName: string) => {
    if (!groupId) return;
    try {
      return await suggestionService.createSuggestion(groupId, destinationName);
    } catch (err: any) {
      throw new Error(err.message || "Failed to add suggestion");
    }
  };

  const vote = async (id: string) => {
    if (!groupId) return;
    try {
      return await suggestionService.voteSuggestion(id, groupId);
    } catch (err: any) {
      throw new Error(err.message || "Failed to submit vote");
    }
  };

  const unvote = async (id: string) => {
    if (!groupId) return;
    try {
      return await suggestionService.removeVote(id, groupId);
    } catch (err: any) {
      throw new Error(err.message || "Failed to remove vote");
    }
  };

  useEffect(() => {
    if (!groupId) return;

    fetchSuggestions();

    const socket = getSocket();
    socket.emit("group:join", groupId);

    const handleNewSuggestion = (newSug: any) => {
      setSuggestions(prev => {
        if (prev.find(s => s.id === newSug.id)) return prev;
        return [newSug, ...prev];
      });
    };

    const handleVoteAdded = (updatedSug: any) => {
      setSuggestions(prev => {
        const index = prev.findIndex(s => s.id === updatedSug.id);
        if (index === -1) return prev;
        const updated = [...prev];
        updated[index] = updatedSug;
        return updated;
      });
    };

    socket.on("suggestion:new", handleNewSuggestion);
    socket.on("vote:added", handleVoteAdded);

    return () => {
      socket.off("suggestion:new", handleNewSuggestion);
      socket.off("vote:added", handleVoteAdded);
    };
  }, [groupId]);

  return { suggestions, loading, error, fetchSuggestions, addSuggestion, vote, unvote };
};
