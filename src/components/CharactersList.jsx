import { useFetchOnePiece } from "../hooks/useFetchOnePiece";

export default function CharactersList({ search }) {
  const { data: characters, loading, error } = useFetchOnePiece("characters/en");

  if (loading) return <p>Cargando personajes...</p>;
  if (error) return <p>Error al obtener personajes: {error}</p>;

  // ✅ Filtro por nombre
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Utilidad para traducir estados
  const translateStatus = (status) => {
    const map = {
      vivant: "Vivo",
      deceased: "Fallecido",
      unknown: "Desconocido",
    };
    return map[status?.toLowerCase()] || status || "Desconocido";
  };

  // ✅ Formateador de recompensa
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
          >
            {/* ✅ Nombre */}
            <h3 style={{ marginBottom: "10px" }}>{char.name}</h3>

            {/* ✅ Rol */}
            <p><strong>Rol:</strong> {char.job || "Desconocido"}</p>

            {/* ✅ Tripulación */}
            <p><strong>Tripulación:</strong> {char.crew?.name || "Ninguna"}</p>

            {/* ✅ Fruta */}
            <p>
              <strong>Fruta:</strong>{" "}
              {char.fruit?.name
                ? `${char.fruit.name} (${char.fruit.type})`
                : "Ninguna"}
            </p>

            {/* ✅ Edad */}
            <p><strong>Edad:</strong> {char.age?.replace(" ans", "") || "N/A"}</p>

            {/* ✅ Recompensa */}
            <p>
              <strong>Recompensa:</strong>{" "}
              {formatBounty(char.bounty)}
            </p>

            {/* ✅ Estado traducido */}
            <p><strong>Estado:</strong> {translateStatus(char.status)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

