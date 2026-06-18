import React, { useState, useEffect, useRef } from "react";
import { useDiscussion } from "../../hooks/collaboration/useDiscussion";
import { User } from "../../types";
import { Send, MessageSquare, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface DiscussionBoardProps {
  groupId: string;
  currentUser: User;
}

export const DiscussionBoard: React.FC<DiscussionBoardProps> = ({ groupId, currentUser }) => {
  const { messages, loading, sendMessage } = useDiscussion(groupId);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      await sendMessage(text.trim());
      setText("");
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Autoscroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl animate-[fadeIn_0.4s_ease-out]">
      {/* Discussion Header */}
      <div className="px-8 py-5 border-b border-white/10 flex items-center space-x-3 shrink-0">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-white text-lg">Group Discussion Board</h3>
          <p className="text-xs text-gray-500">Discuss dates, flight connections, and plan details in real-time.</p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 no-scrollbar">
        {loading && messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : messages.length > 0 ? (
          messages.map((m, idx) => {
            const isMe = m.userId === currentUser.id;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                className={`flex items-start gap-3 max-w-[75%] ${isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                  {m.user.avatar ? (
                    <img src={m.user.avatar} alt={m.user.name} className="w-full h-full object-cover" />
                  ) : (
                    m.user.name.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  {!isMe && (
                    <p className="text-[10px] text-gray-500 font-bold px-1">{m.user.name}</p>
                  )}
                  <div
                    className={`px-5 py-3.5 rounded-[22px] text-sm leading-relaxed ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10"
                        : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.message}</p>
                  </div>
                  <p className={`text-[9px] text-gray-600 px-2 ${isMe ? "text-right" : "text-left"}`}>
                    {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="w-12 h-12 text-gray-600 mb-4" />
            <h4 className="text-base font-bold text-white mb-1">No messages yet</h4>
            <p className="text-xs text-gray-500 max-w-xs">Be the first to post a greeting and start the discussion!</p>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-6 border-t border-white/10 bg-black/20 shrink-0">
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <input
            type="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent px-5 py-4 text-white outline-none border-none text-sm placeholder:text-gray-600 pr-14"
          />
          <button
            type="submit"
            disabled={sending || !text.trim()}
            className="absolute right-2.5 p-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:hover:bg-indigo-600"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default DiscussionBoard;
