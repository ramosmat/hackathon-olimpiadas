import React from 'react';
import styles from './EsportesItem.module.css';
import { NavLink } from 'react-router-dom';

const EsportesItem = ({ sport }) => {
  return (
    <NavLink to={`/esportes/${sport.id}`} className={styles.card}>
      <div className={styles.divImg}>
        <img src={sport.pictogram_url} alt="sport_emblem" />
      </div>
      <h2 className={styles.name}>{sport.name}</h2>
    </NavLink>
  );
};

export default EsportesItem;
