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
