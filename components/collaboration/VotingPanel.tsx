import React from "react";
import { User } from "../../types";
import { ThumbsUp } from "lucide-react";

interface VotingPanelProps {
  suggestion: any;
  currentUser: User;
  onVote: () => void;
  onUnvote: () => void;
}

export const VotingPanel: React.FC<VotingPanelProps> = ({
  suggestion,
  currentUser,
  onVote,
  onUnvote
}) => {
  const hasVoted = suggestion.votes?.some((v: any) => v.userId === currentUser.id);

  return (
    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
      <button
        onClick={hasVoted ? onUnvote : onVote}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
          hasVoted
            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:scale-[1.02]"
            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/30 hover:scale-[1.02]"
        }`}
      >
        <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-white" : ""}`} />
        <span>{hasVoted ? "Voted" : "Vote"}</span>
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500 font-medium">Votes ({suggestion.votes?.length || 0})</span>
        <div className="flex items-center -space-x-1.5">
          {suggestion.votes?.slice(0, 3).map((v: any) => (
            <div
              key={v.id}
              className="w-6 h-6 rounded-full border border-gray-950 overflow-hidden bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              title={v.user.name}
            >
              {v.user.avatar ? (
                <img src={v.user.avatar} alt={v.user.name} className="w-full h-full object-cover" />
              ) : (
                v.user.name.charAt(0).toUpperCase()
              )}
            </div>
          ))}
          {suggestion.votes?.length > 3 && (
            <div className="w-6 h-6 rounded-full border border-gray-950 bg-gray-800 flex items-center justify-center text-[8px] font-bold text-gray-400 shrink-0">
              +{suggestion.votes.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default VotingPanel;
