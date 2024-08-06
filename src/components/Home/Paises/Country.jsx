import React, { useEffect, useState } from 'react';
import styles from './Country.module.css';
import useFetch from '../../../hooks/useFetch';
import EventosCard from '../../Eventos/EventosCard';
import { eventsUrl, countriesUrl } from '../../../API';
import { ColorRing } from 'react-loader-spinner';

const Country = () => {
  const { request } = useFetch();
  const [countryData, setCountryData] = useState(null);
  const [countryEvents, setCountryEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Inicia como true para mostrar o loader inicial
  const [page, setPage] = useState(1);

  const url = window.location.href.split('/');
  const pais = url[url.length - 1];

  useEffect(() => {
    async function getCountryEvents() {
      setLoading(true);

      const countryResponse = await fetch(`${eventsUrl}?country=${pais}`);
      const countryJson = await countryResponse.json();
      setCountryEvents(countryJson.data);

      const countriesResponse = await fetch(countriesUrl);
      const countriesJson = await countriesResponse.json();
      const country = countriesJson.data.find((item) => item.id === pais);
      setCountryData(country);

      setLoading(false);
    }

    getCountryEvents();
  }, [pais]);

  useEffect(() => {
    async function getEvents() {
      if (page === 1) return; // Evita recarregar a primeira página
      setLoading(true);

      const { response, json } = await request(
        `${eventsUrl}?country=${pais}&page=${page}`,
      );
      if (json && json.data) {
        setCountryEvents((prevEvents) => {
          const newEvents = json.data.filter(
            (newEvent) => !prevEvents.some((event) => event.id === newEvent.id),
          );
          return [...prevEvents, ...newEvents];
        });
      }

      setLoading(false);
    }

    getEvents();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
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

  if (loading && countryData === null && countryEvents.length === 0) {
    return (
      <div className="container">
        <h1 className="title">Eventos</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {countryData && (
        <>
          <h1 className="title">{countryData.name}</h1>
          <section className={styles.infos}>
            <div className={styles.divMedals}>
              <p className={styles.rank}>
                Rank: <span>{countryData.rank}</span>
              </p>
              <p className={styles.gold}>
                Medalhas de Ouro: <span>{countryData.gold_medals}</span>
              </p>
              <p className={styles.silver}>
                Medalhas de Prata: <span>{countryData.silver_medals}</span>
              </p>
              <p className={styles.bronze}>
                Medalhas de Bronze: <span>{countryData.bronze_medals}</span>
              </p>
              <p className={styles.total}>
                Total de Medalhas: <span>{countryData.total_medals}</span>
              </p>
            </div>
            <div className={styles.divImg}>
              <img src={countryData.flag_url} alt="bandeira" />
            </div>
          </section>
        </>
      )}

      <section className={styles.events}>
        <h2 className="subTitle">Eventos</h2>
        <ul className="cardsFlex">
          {countryEvents.map((event) => (
            <EventosCard key={event.id} event={event} />
          ))}
        </ul>
        {loading && (
          <div className="loader">
            <ColorRing />
          </div>
        )}
      </section>
    </div>
  );
};

export default Country;
