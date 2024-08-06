import { Route, Routes } from 'react-router-dom';
import React from 'react';
import CountryCard from './CountryCard';
import Country from './Paises/Country';

const Home = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<CountryCard />} />
        <Route path="paises/*" element={<Country />} />
      </Routes>
    </div>
  );
};

export default Home;
