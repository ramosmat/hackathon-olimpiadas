import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CountryItem.module.css';
import useMedia from '../../hooks/useMedia';

const CountryItem = ({ country }) => {
  const mobile = useMedia('(max-width: 600px)');
  console.log(mobile);

  return (
    <NavLink to={`/pais/${country.id}`} className={styles.section}>
      <div className={styles.country}>
        <p>{country.rank}</p>
        <img src={country.flag_url} alt="bandeira" title={country.name} />
        <p>{!mobile ? country.name : country.id}</p>
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
