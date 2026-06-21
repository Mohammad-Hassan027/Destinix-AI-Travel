import { useState } from 'react';

export const useDestinationChat = (destId: string) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    if (!destId) return;
    const newUserMsg = { role: 'user' as const, content: text };
    const updatedHistory = [...messages, newUserMsg];
    setMessages(updatedHistory);
    setLoading(true);
    try {
      const res = await fetch(`/api/destination-guide/${destId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory }),
      });
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      const assistantMsg = { role: 'assistant' as const, content: json.reply || '' };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, isLoading, error };
};
