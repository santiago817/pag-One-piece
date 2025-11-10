import React from "react";
import { Link } from "react-router-dom";

export default function Botton() {
  return (
    <div className="flex flex-col items-center pt-10 gap-6">
      <div className="flex gap-6">
        <Link
          to="/characters"
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
        >
          Characters
        </Link>

        <Link
          to="/barcos"
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
        >
          Barcos
        </Link>

        <Link
          to="/crews"
          className="px-6 py-3 bg-amber-400 text-white font-bold rounded-lg hover:bg-amber-500 transition"
        >
          Crews
        </Link>
      </div>
    </div>
  );
}
