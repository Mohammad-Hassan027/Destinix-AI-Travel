import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { TripJournal } from '../types';
import { getJournal } from '../services/journalService';

const JournalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [journal, setJournal] = useState<TripJournal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchJournal = async () => {
      try {
        const data = await getJournal(id);
        setJournal(data);
      } catch (err) {
        setError('Failed to load journal. It may have been deleted or made private.');
      } finally {
        setLoading(false);
      }
    };
    fetchJournal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <div className="min-h-screen pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Oops!</h1>
        <p className="text-gray-400 mb-8">{error || 'Journal not found'}</p>
        <button onClick={() => navigate('/community')} className="text-indigo-400 hover:underline">
          &larr; Back to Community
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-gray-950">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        {journal.coverImage ? (
          <img src={journal.coverImage} alt={journal.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-black"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-5xl mx-auto right-0">
          <button 
            onClick={() => navigate('/community')}
            className="mb-6 flex items-center text-sm font-bold text-gray-300 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md w-max border border-white/10 hover:bg-white/20"
          >
            &larr; Back to Feed
          </button>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {journal.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center overflow-hidden shadow-lg">
              {journal.user?.avatar ? (
                <img src={journal.user.avatar} alt="Author" className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg text-indigo-300 font-bold">{journal.user?.name?.charAt(0) || '?'}</span>
              )}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-100">{journal.user?.name || 'Anonymous Traveler'}</p>
              <p className="text-sm text-gray-400">{new Date(journal.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 backdrop-blur-xl shadow-2xl"
        >
          <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-headings:font-serif">
            {journal.content.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
            <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:border-red-400/50">
              <span className="text-xl">❤️</span>
              <span className="font-bold">{journal.likes} Likes</span>
            </button>
            <button className="text-gray-400 hover:text-white flex items-center gap-2 font-bold text-sm">
              <span>🔗</span> Share Story
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JournalDetails;
