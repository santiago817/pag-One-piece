import { useFetchOnePiece } from "../hooks/useFetchOnePiece";

export default function CharactersList({ search }) {
  // 1. Se llama al custom hook
  const {
    data: characters,
    loading,
    error
  } = useFetchOnePiece("characters");

  // 2. Estado de carga
  if (loading) return <p>Cargando personajes...</p>;

  // 3. Error en la API
  if (error) return <p>Error al obtener personajes: {error}</p>;

  // 4. Filtrado por búsqueda (case insensitive)
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  // 5. Render de lista
  return (
    <section>
      <h2>Personajes</h2>

      {filteredCharacters.length === 0 && (
        <p>No se encontraron personajes con ese nombre.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem"
        }}
      >
        {filteredCharacters.map((char) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              background: "#fafafa"
            }}
          >
            <h3>{char.name}</h3>

            {char.image && (
              <img
                src={char.image}
                alt={char.name}
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  marginBottom: "10px"
                }}
              />
            )}

            <p>{char.description || "Sin descripción disponible."}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
