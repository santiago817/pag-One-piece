import React, { useEffect, useState } from "react";

function Crews() {
  const [crews, setCrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCrews, setShowCrews] = useState(false);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const response = await fetch(
          "https://api.api-onepiece.com/v2/crews/en"
        );
        const data = await response.json();

        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        setCrews(selected);
      } catch (error) {
        console.error("Error al obtener los crews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrews();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Cargando tripulaciones...</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <button
        onClick={() => setShowCrews(!showCrews)}
        className="bg-amber-400 text-white font-bold py-2 px-6 rounded hover:bg-amber-500 transition"
      >
        Clews
      </button>

      {showCrews && (
        <div className="flex flex-wrap gap-5 justify-center mt-[5vh]">
          {crews.map((crew) => (
            <div
              key={crew.id}
              className="border border-gray-300 rounded-lg p-4 w-52 text-center shadow-md"
            >
              <img
                src="https://via.placeholder.com/150?text=No+Image"
                alt={`Bandera de ${crew.name}`}
                className="w-36 h-36 object-cover mx-auto"
              />
              <h3 className="mt-2 text-lg font-semibold">{crew.name}</h3>
              <p className="italic text-gray-500">{crew.roman_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Crews;
