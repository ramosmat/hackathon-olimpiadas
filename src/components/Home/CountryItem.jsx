import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CountryItem.module.css';
import useFetch from '../../hooks/useFetch';

const CountryItem = ({ country }) => {
  const { data, loading, request } = useFetch();

  return (
    <NavLink to={`/pais/${country.id}`} className={styles.section}>
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
    </NavLink>
  );
};

export default CountryItem;
