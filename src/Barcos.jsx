import React, { useState, useEffect } from 'react'

export default function Barcos() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [boton, setBoton] = useState(false);

    useEffect(() => {

        setError(null);

        fetch(`https://api.api-onepiece.com/v2/${`boats`}/en`)

            .then((resp) => {
                if (!resp.ok) throw new Error("Error al obtener datos de la API");
                return resp.json();
            })
            .then((info) => {
                setData(info);
            })
            .catch((err) => setError(err.message))
    }, []);

    if (error) return <p className="text-center text-red-500">❌ {error}</p>;


    return (
        <div className="bg-white  p-4 rounded-2xl shadow-md">
            <div><button onClick={() => setBoton(!boton)} className={`border-none rounded-2xl p-2 bg-slate-700 text-white text-center `}> Barcos</button></div>

            {boton && (
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
                    {data.map((s) => (
                        <div key={s.id} className="bg-blue-100 rounded-lg p-3">
                            <img
                                src={s.img ?? ""}
                                alt={s.name}
                                className=" h-20 object-cover rounded-lg mb-2"
                            />
                            <h3 className="font-bold">{s.name}</h3>
                            <p className="text-sm">Tipo: {s.type || "Sin tipo"}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
