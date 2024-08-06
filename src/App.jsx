import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home/Home';
import Esportes from './components/Esportes/Esportes';
import Eventos from './components/Eventos/Eventos';
import Locais from './components/Locais/Locais';
import Country from './components/Home/Paises/Country';

const App = () => {
  return (
    <section>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="pais/*" element={<Country />} />
            <Route path="esportes/" element={<Esportes />} />
            <Route path="eventos/" element={<Eventos />} />
            <Route path="locais" element={<Locais />} />
          </Routes>
        </main>
      </BrowserRouter>
    </section>
  );
};

export default App;
