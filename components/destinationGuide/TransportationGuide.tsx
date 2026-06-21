// TransportationGuide.tsx
import React from 'react';

interface Props {
  destination: string;
}

const TransportationGuide: React.FC<Props> = ({ destination }) => {
  return (
    <section className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-white">Transportation in {destination}</h2>
      <p className="text-gray-300">Metro, bus, taxi, rental options, cost estimates, and tips will appear here.</p>
    </section>
  );
};

export default TransportationGuide;
