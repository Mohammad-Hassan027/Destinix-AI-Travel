import React, { useState } from "react";
import { useSuggestions } from "../../hooks/collaboration/useSuggestions";
import { VotingPanel } from "./VotingPanel";
import { User } from "../../types";
import { Plus, Compass, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface DestinationSuggestionsProps {
  groupId: string;
  currentUser: User;
  userRole: string; // "OWNER" | "EDITOR" | "VIEWER"
}

export const DestinationSuggestions: React.FC<DestinationSuggestionsProps> = ({
  groupId,
  currentUser,
  userRole
}) => {
  const { suggestions, loading, addSuggestion, vote, unvote } = useSuggestions(groupId);
  const [destinationName, setDestinationName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canEdit = userRole === "OWNER" || userRole === "EDITOR";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationName.trim() || !canEdit) return;

    setSubmitting(true);
    try {
      await addSuggestion(destinationName.trim());
      setDestinationName("");
    } catch (err) {
      alert("Failed to submit suggestion");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (suggestionId: string) => {
    try {
      await vote(suggestionId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnvote = async (suggestionId: string) => {
    try {
      await unvote(suggestionId);
    } catch (err) {
      console.error(err);
    }
  };

  // Sort suggestions by vote count descending, then by creation date descending
  const sortedSuggestions = [...suggestions].sort((a, b) => {
    const aVotes = a.votes?.length || 0;
    const bVotes = b.votes?.length || 0;
    return bVotes - aVotes || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Destination Suggestions</h2>
          <p className="text-gray-400">Suggest places to visit and vote on options with your team.</p>
        </div>
      </div>

      {/* Suggestion Form */}
      {canEdit && (
        <form onSubmit={handleSubmit} className="flex gap-4 max-w-xl">
          <input
            type="text"
            required
            value={destinationName}
            onChange={(e) => setDestinationName(e.target.value)}
            placeholder="e.g. Louvre Museum, Paris Day Trip"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-600 text-sm"
          />
          <button
            type="submit"
            disabled={submitting || !destinationName.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-4 rounded-xl font-bold transition-all text-white text-sm flex items-center space-x-2 shrink-0 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span>Propose</span>
          </button>
        </form>
      )}

      {/* Suggestions Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : sortedSuggestions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSuggestions.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl hover:border-indigo-500/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                    {s.suggestedByUser.avatar ? (
                      <img src={s.suggestedByUser.avatar} alt={s.suggestedByUser.name} className="w-full h-full object-cover" />
                    ) : (
                      s.suggestedByUser.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Suggested by</p>
                    <p className="text-xs text-gray-300 font-medium">{s.suggestedByUser.name}</p>
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white leading-tight line-clamp-2">
                  {s.destinationName}
                </h3>
              </div>

              <VotingPanel
                suggestion={s}
                currentUser={currentUser}
                onVote={() => handleVote(s.id)}
                onUnvote={() => handleUnvote(s.id)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 bg-white/5 border border-white/10 border-dashed rounded-[32px] text-center max-w-2xl mx-auto flex flex-col items-center">
          <Compass className="w-10 h-10 text-gray-600 mb-4" />
          <h4 className="text-lg font-bold text-white mb-1">No suggestions proposed</h4>
          <p className="text-sm text-gray-500 max-w-xs mb-6">
            {canEdit
              ? "Submit the first destination idea for the group to vote on!"
              : "No destinations have been suggested yet."}
          </p>
        </div>
      )}
    </div>
  );
};
export default DestinationSuggestions;
