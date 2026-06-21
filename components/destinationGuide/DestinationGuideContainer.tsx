import React from 'react';
import DestinationDashboard from './DestinationDashboard';
import AttractionsExplorer from './AttractionsExplorer';
import FoodGuide from './FoodGuide';
import TransportationGuide from './TransportationGuide';
import SafetyAssistant from './SafetyAssistant';
import TravelTipsGenerator from './TravelTipsGenerator';
import DestinationAssistant from './DestinationAssistant';
import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/destinationGuide/useDestination';

/**
 * Main container assembling all destination guide sections.
 * Layout adapts to mobile via Tailwind's responsive utilities.
 */
const DestinationGuideContainer: React.FC = () => {
  const { destId } = useParams<{ destId: string }>();
  const { data, isLoading, error } = useDestination(destId);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-400">Loading destination data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-400">Error loading destination: {error}</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      <DestinationDashboard data={data} />
      <AttractionsExplorer destination={data.name} />
      <FoodGuide destination={data.name} />
      <TransportationGuide destination={data.name} />
      <SafetyAssistant destination={data.name} />
      <TravelTipsGenerator destination={data.name} />
      <DestinationAssistant />
    </div>
  );
};

export default DestinationGuideContainer;
