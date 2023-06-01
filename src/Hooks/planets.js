import { useEffect, useState, useCallback } from 'react';

export default function usePlanets(url) {
  const [planetsData, setPlanetsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((responseData) => {
        // Remover a coluna "residents" de cada planeta
        const modifiedData = responseData.results.map((planet) => {
          const { residents, ...rest } = planet;
          return rest;
        });
        setPlanetsData(modifiedData);
      })
      .catch((err) => setError(err))
      .finally(setLoading(false));
  }, [url]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { loading, error, data: planetsData, refresh };
}
