import React from 'react';
import styles from './Header.module.css';
import Olympics from '../assets/olympics.svg?react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.header}>
      <Olympics />
      <nav className={styles.nav}>
        <NavLink to="/">Medalhas</NavLink>
        <NavLink to="esportes">Esportes</NavLink>
        <NavLink to="eventos">Eventos</NavLink>
        <NavLink to="locais">Locais</NavLink>
      </nav>
    </div>
  );
};

export default Header;
