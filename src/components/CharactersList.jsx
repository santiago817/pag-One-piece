import React, { useEffect, useState } from "react";

export default function CharactersList({ search }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch("https://api.api-onepiece.com/v2/characters/en");
        const data = await res.json();
        setCharacters(data.slice(0, 10)); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando personajes...</p>;

  return (
    <div className="flex flex-wrap gap-5 justify-center mt-10">
      {characters.map((char) => (
        <div key={char.id} className="border rounded-lg p-4 w-52 text-center shadow-md">
          <img
            src={char.image || "https://via.placeholder.com/150"}
            alt={char.name}
            className="w-36 h-36 object-cover mx-auto"
          />
          <h3 className="mt-2 font-semibold">{char.name}</h3>
        </div>
      ))}
    </div>
  );
}
=======
import { useFetchOnePiece } from "../hooks/useFetchOnePiece";

export default function CharactersList({ search }) {
  const { data: characters, loading, error } = useFetchOnePiece("characters/en");

  if (loading) return <p>Cargando personajes...</p>;
  if (error) return <p>Error al obtener personajes: {error}</p>;

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  const translateStatus = (status) => {
    const map = {
      vivant: "Vivo",
      deceased: "Fallecido",
      unknown: "Desconocido",
    };
    return map[status?.toLowerCase()] || status || "Desconocido";
  };

  const formatBounty = (value) => {
    if (!value) return "Sin recompensa";
    return new Intl.NumberFormat("es-MX").format(Number(value));
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>Personajes de One Piece</h2>

      {filteredCharacters.length === 0 && <p>No se encontraron personajes.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginTop: "20px",
        }}
      >
        {filteredCharacters.map((char) => (
          <div
            key={char.id}
            style={{
              padding: "1.2rem",
              background: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              boxShadow: "0 3px 6px rgba(0,0,0,0.08)",
            }}
          
            <h3 style={{ marginBottom: "10px" }}>{char.name}</h3>

            
            <p><strong>Rol:</strong> {char.job || "Desconocido"}</p>

            
            <p><strong>Tripulación:</strong> {char.crew?.name || "Ninguna"}</p>

            
            <p>
              <strong>Fruta:</strong>{" "}
              {char.fruit?.name
                ? `${char.fruit.name} (${char.fruit.type})`
                : "Ninguna"}
            </p>

           }
            <p><strong>Edad:</strong> {char.age?.replace(" ans", "") || "N/A"}</p>

            
            <p>
              <strong>Recompensa:</strong>{" "}
              {formatBounty(char.bounty)}
            </p>

            
            <p><strong>Estado:</strong> {translateStatus(char.status)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

