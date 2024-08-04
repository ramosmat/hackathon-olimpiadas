import React from 'react';
import styles from './Header.module.css';
import Emblema from '../assets/emblem.svg?react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.header}>
      <Emblema />
      <nav className={styles.nav}>
        <NavLink to="/">Países</NavLink>
        <NavLink to="/esportes">Esportes</NavLink>
        <NavLink to="/eventos">Eventos</NavLink>
        <NavLink to="/locais">Locais</NavLink>
      </nav>
    </div>
  );
};

export default Header;
