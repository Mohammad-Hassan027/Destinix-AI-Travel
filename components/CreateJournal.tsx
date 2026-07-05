import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User } from '../types';
import { createJournal } from '../services/journalService';

interface CreateJournalProps {
  user: User;
}

const CreateJournal: React.FC<CreateJournalProps> = ({ user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newJournal = await createJournal({
        userId: user.id,
        title,
        content,
        coverImage,
        isPublic
      });
      navigate(`/journals/${newJournal.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to publish journal');
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 min-h-screen">
      <div className="mb-12">
        <button 
          onClick={() => navigate('/profile')}
          className="mb-6 flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors"
        >
          &larr; Back to Profile
        </button>
        <h1 className="text-4xl font-serif font-bold text-white mb-2">Write a Journal</h1>
        <p className="text-gray-400">Share your travel experiences with the Destinix community.</p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12"
      >
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl mb-8 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Story Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. A Magical Weekend in Kyoto"
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Cover Image URL (Optional)</label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {coverImage && (
              <div className="mt-4 h-48 rounded-2xl overflow-hidden border border-white/10 relative">
                <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Your Story</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell us about your adventure..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[300px] resize-y"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-5 h-5 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-black"
            />
            <label htmlFor="isPublic" className="text-gray-300">
              Make this journal public to the Community Feed
            </label>
          </div>

          <div className="pt-8 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.4)] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Publishing...' : 'Publish Journal'}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default CreateJournal;
