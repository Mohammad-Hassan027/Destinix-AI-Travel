import { useState, useEffect } from "react";
import * as discussionService from "../../services/collaboration/discussionService";
import { getSocket } from "../../services/collaboration/socket";

export const useDiscussion = (groupId: string | undefined) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!groupId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await discussionService.getMessages(groupId);
      setMessages(data);
    } catch (err: any) {
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!groupId) return;
    try {
      return await discussionService.createMessage(groupId, message);
    } catch (err: any) {
      throw new Error(err.message || "Failed to send message");
    }
  };

  useEffect(() => {
    if (!groupId) return;

    fetchMessages();

    const socket = getSocket();
    socket.emit("group:join", groupId);

    const handleNewMessage = (newMsg: any) => {
      setMessages(prev => {
        if (prev.find(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [groupId]);

  return { messages, loading, error, fetchMessages, sendMessage };
};
