import { useState, useEffect } from "react";

export default function useBarcos(count = 10) {
  const [barcos, setBarcos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);

    fetch("https://api.api-onepiece.com/v2/boats/en")
      .then((resp) => {
        if (!resp.ok) throw new Error("Error al obtener datos de la API");
        return resp.json();
      })
      .then((info) => {
        const getRandomBoats = (boats, count) =>
          [...boats].sort(() => 0.5 - Math.random()).slice(0, count);

        const randomBoats = getRandomBoats(info, count);
        setBarcos(randomBoats);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [count]);

  return { barcos, loading, error };
}
