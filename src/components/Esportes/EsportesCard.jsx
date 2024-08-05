import React from 'react';
import styles from './EsportesCard.module.css';

const EsportesCard = ({ sport }) => {
  return (
    <div className={styles.card}>
      <div className={styles.divImg}>
        <img src={sport.pictogram_url} alt="sport_emblem" />
      </div>
      <h2 className={styles.name}>{sport.name}</h2>
    </div>
  );
};

export default EsportesCard;
