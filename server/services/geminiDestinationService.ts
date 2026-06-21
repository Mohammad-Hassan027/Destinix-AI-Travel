export const getGeminiRecommendations = async (destId: string): Promise<string[]> => {
  // In a real implementation this would call the Gemini API with the destination ID
  // For now we return a static set of recommendations per destination
  const mock: Record<string, string[]> = {
    paris: [
      'Visit the Eiffel Tower at sunrise for stunning photos.',
      'Explore hidden passages of the Louvre after hours.',
      'Take a day trip to Versailles and enjoy the gardens.'
    ],
    dubai: [
      'Book a desert safari early morning to avoid heat.',
      'Dine at a traditional Emirati restaurant for authentic flavors.',
      'Visit the observation deck of Burj Khalifa at sunset.'
    ]
  };
  return mock[destId] || ['Explore the local attractions and enjoy your stay!'];
};
