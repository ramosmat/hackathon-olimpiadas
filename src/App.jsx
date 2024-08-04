import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Esportes from './components/esportes/Esportes';
import Eventos from './components/eventos/Eventos';
import Locais from './components/locais/Locais';

const App = () => {
  return (
    <section>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/esportes" element={<Esportes />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/locais" element={<Locais />} />
          </Routes>
        </main>
      </BrowserRouter>
    </section>
  );
};

export default App;
