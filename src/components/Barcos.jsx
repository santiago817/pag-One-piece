import React from "react";
import useBarcos from "../hooks/hookShip";

export default function Barcos() {
  const { barcos, loading, error } = useBarcos(10);

  if (loading)
    return <p className="text-center mt-10">🚢 Cargando barcos...</p>;
  if (error) return <p className="text-center text-red-500">❌ {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-5">
      {barcos.map((b) => (
        <div
          key={b.id}
          className="bg-blue-100 rounded-xl p-4 border border-blue-200 shadow-md"
        >
          <img
            src={b.img ?? "https://via.placeholder.com/150?text=No+Image"}
            alt={b.name}
            className="h-24 w-full object-cover rounded-lg mb-2"
          />
          <h3 className="font-bold text-lg">{b.name}</h3>
          <p className="text-sm">Tipo: {b.type || "Sin tipo"}</p>
          <p className="text-sm">Capitán: {b.captain || "Desconocido"}</p>
        </div>
      ))}
    </div>
  );
}
