import { useState, useEffect } from 'react';

export const useRecommendations = (destId: string) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!destId) return;
    setLoading(true);
    fetch(`/api/destination-guide/${destId}/recommendations`, {
      method: 'POST',
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        setRecommendations(json.recommendations || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [destId]);

  return { recommendations, isLoading, error };
};
