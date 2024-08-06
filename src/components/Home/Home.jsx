import React, { useEffect, useState } from 'react';
import { countriesUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import styles from './Home.module.css';
import CountryCard from './CountryCard';
import { Circles, ColorRing } from 'react-loader-spinner';

const Home = () => {
  const { data, setData, loading, request } = useFetch();

  //Estado começa na pagina 1 e quando o usuário chega no final da pagina, soma mais 1
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getCountries() {
      const { response, json } = await request(`${countriesUrl}?page=${page}`);

      if (data === null) {
        return;
      } else {
        setData([...data, ...json.data]);
      }
    }

    getCountries();
  }, [request, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading && page === 1) {
    return (
      <div className="container">
        <h1 className="title">Quadro de Medalhas</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="container">
        <h1 className="title">Quadro de Medalhas</h1>
        <section className={styles.bar}>
          <div className={styles.barCountry}>
            <p>#</p>
            <p>País</p>
          </div>

          <div className={styles.barMedals}>
            <p>Ouro</p>
            <span className={styles.gold} />
            <p>Prata</p>
            <span className={styles.silver} />
            <p>Bronze</p>
            <span className={styles.bronze} />
            <p>Total</p>
            <span className={styles.total} />
          </div>
        </section>
        <section>
          {data.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </section>
      </div>
    );
  }

  return null;
};

export default Home;
