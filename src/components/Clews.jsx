import React from "react";
import useCrews from "../hooks/hookCrews";

function Clews() {
  const { crews, loading, error } = useCrews(10);

  if (loading)
    return <p className="text-center mt-10">Cargando tripulaciones...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">❌ {error}</p>;

  return (
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
  );
}

export default Clews;
