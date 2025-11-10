import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Botton from "./components/Botton";
import CharactersList from "./components/CharactersList";
import Barcos from "./components/Barcos";
import Clews from "./components/Clews";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center min-h-screen pt-10">
        
        <div className="w-full flex justify-center mb-6">
          <Search />
        </div>

        
        <Botton />

        
        <Routes>
          <Route path="/characters" element={<CharactersList search="" />} />
          <Route path="/barcos" element={<Barcos />} />
          <Route path="/crews" element={<Clews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
