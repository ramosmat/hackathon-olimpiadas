import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import EsportesCard from './components/Esportes/EsportesCard';
import Esporte from './components/Esportes/Esporte/Esporte';
import Locais from './components/Locais/Locais';
import Country from './components/Home/Pais/Country';
import CountryCard from './components/Home/CountryCard';
import EventosCard from './components/Eventos/EventosCard';
import Evento from './components/Eventos/Evento/Evento';

const App = () => {
  return (
    <section>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="esportes" element={<EsportesCard />} />
            <Route path="esportes/*" element={<Esporte />} />
            <Route path="eventos" element={<EventosCard />} />
            <Route path="eventos/*" element={<Evento />} />
            <Route path="pais/*" element={<Country />} />
            <Route path="locais" element={<Locais />} />
            <Route path="*" element={<CountryCard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </section>
  );
};

export default App;
