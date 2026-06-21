// SafetyAssistant.tsx
import React from 'react';

interface Props {
  destination: string;
}

const SafetyAssistant: React.FC<Props> = ({ destination }) => {
  return (
    <section className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-white">Safety in {destination}</h2>
      <p className="text-gray-300">Safety score, common precautions, tourist tips, and emergency contacts will be shown here.</p>
    </section>
  );
};

export default SafetyAssistant;
