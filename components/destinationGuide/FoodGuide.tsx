// FoodGuide.tsx
import React from 'react';

interface Props {
  destination: string;
}

const FoodGuide: React.FC<Props> = ({ destination }) => {
  return (
    <section className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-white">Food & Dining in {destination}</h2>
      <p className="text-gray-300">Popular local dishes, street food areas, fine‑dining spots, and dietary filters will be displayed here.</p>
    </section>
  );
};

export default FoodGuide;
