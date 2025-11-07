import { useState, useEffect } from "react";

export function useFetchOnePiece(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://api.api-onepiece.com/v2";

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(`${BASE_URL}/${endpoint}`);

        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }

        const json = await response.json();

        // ✅ La API devuelve un array directo
        if (isMounted) {
          if (Array.isArray(json)) {
            setData(json);
          } else {
            throw new Error("Formato inesperado: se esperaba un array");
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
