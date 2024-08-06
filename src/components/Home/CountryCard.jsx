import React from 'react';
import styles from './CountryCard.module.css';

const CountryCard = ({ country }) => {
  return (
    <section className={styles.section}>
      <div className={styles.country}>
        <p>{country.rank}</p>
        <img src={country.flag_url} alt="bandeira" title={country.name} />
        <p>{country.name}</p>
      </div>

      <div className={styles.medals}>
        <p className={styles.gold}>{country.gold_medals}</p>
        <p className={styles.silver}>{country.silver_medals}</p>
        <p className={styles.bronze}>{country.bronze_medals}</p>
        <p className={styles.total}>{country.total_medals}</p>
      </div>
    </section>
  );
};

export default CountryCard;
