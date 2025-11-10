import { useState, useEffect } from "react";

export default function useCrews(count = 10) {
  const [crews, setCrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(
          "https://api.api-onepiece.com/v2/crews/en"
        );
        if (!response.ok) throw new Error("Error al obtener datos de la API");

        const data = await response.json();

        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);

        setCrews(selected);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCrews();
  }, [count]);

  return { crews, loading, error };
}
