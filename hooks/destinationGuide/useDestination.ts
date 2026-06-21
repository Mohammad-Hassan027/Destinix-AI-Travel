import { useState, useEffect } from 'react';
import { Destination } from '../../types';

export const useDestination = (destId: string) => {
  const [data, setData] = useState<Destination | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!destId) return;
    setLoading(true);
    fetch(`/api/destination-guide/${destId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        setData(json as Destination);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [destId]);

  return { data, isLoading, error };
};
