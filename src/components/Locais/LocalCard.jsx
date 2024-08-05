import React from 'react';
import styles from './LocalCard.module.css';

const LocalCard = ({ local }) => {
  return (
    <div className={styles.card}>
      <a
        className={styles.url}
        href={local.url}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className={styles.name}>{local.name}</h2>
        <p className={styles.p}>Veja mais</p>
      </a>
    </div>
  );
};

export default LocalCard;
