import React, { useEffect, useState } from 'react';
import styles from './CountryCard.module.css';
import { countriesUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import CountryItem from './CountryItem';
import { ColorRing } from 'react-loader-spinner';

const CountryCard = () => {
  const { data, setData, loading, request } = useFetch();

  //Estado começa na pagina 1 e quando o usuário chega no final da pagina, soma mais 1
  const [page, setPage] = useState(1);
  const [finalPage, setFinalPage] = useState(2);

  useEffect(() => {
    async function getCountries() {
      const { json, totalPages } = await request(
        `${countriesUrl}?page=${page}`,
      );

      if (json.data === null) {
        return;
      } else {
        setData([...data, ...json.data]);
      }

      if (totalPages) {
        setFinalPage(totalPages);
      }
    }

    if (page <= finalPage && !loading) {
      getCountries();
    }
  }, [request, page]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }

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

  if (data)
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
            <CountryItem key={country.id} country={country} />
          ))}
        </section>
        {loading && (
          <div className="container">
            <div className="loader">
              <ColorRing />
            </div>
          </div>
        )}
      </div>
    );
};

export default CountryCard;
