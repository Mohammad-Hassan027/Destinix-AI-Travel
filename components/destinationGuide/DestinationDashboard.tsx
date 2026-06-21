// DestinationDashboard.tsx
import React from 'react';


interface Props {
  data: any;
}
  data: DestinationInfo;
}

const DestinationDashboard: React.FC<Props> = ({ data }) => {
  return (
    <section className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-white">{data.name}, {data.country}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
        <div><strong>Region:</strong> {data.region}</div>
        <div><strong>Time Zone:</strong> {data.timeZone}</div>
        <div><strong>Currency:</strong> {data.currency}</div>
        <div><strong>Languages:</strong> {data.languages.join(', ')}</div>
      </div>
    </section>
  );
};

export default DestinationDashboard;
