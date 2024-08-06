import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Esportes from './components/Esportes/Esportes';
import Eventos from './components/Eventos/Eventos';
import Locais from './components/Locais/Locais';
import Country from './components/Home/Paises/Country';
import CountryCard from './components/Home/CountryCard';

const App = () => {
  return (
    <section>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="pais/*" element={<Country />} />
            <Route path="esportes/" element={<Esportes />} />
            <Route path="eventos/" element={<Eventos />} />
            <Route path="locais" element={<Locais />} />
            <Route path="*" element={<CountryCard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </section>
  );
};

export default App;
