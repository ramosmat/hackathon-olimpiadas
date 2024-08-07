import React, { useEffect, useState } from 'react';
import styles from './Country.module.css';
import useFetch from '../../../hooks/useFetch';
import { eventsUrl, countriesUrl } from '../../../API';
import { ColorRing } from 'react-loader-spinner';
import EventosItem from '../../Eventos/EventosItem';

const Country = () => {
  const { loading, request } = useFetch();
  const [countryData, setCountryData] = useState(null);
  const [countryEvents, setCountryEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const [page, setPage] = useState(1);
  const [finalPage, setFinalPage] = useState(10);

  const url = window.location.href.split('/');
  const pais = url[url.length - 1];

  useEffect(() => {
    console.log('ativou');

    console.log('page:', page);
    console.log('finalPage: ', finalPage);

    console.log('countryData:', countryData);
    console.log('countryEvents:', countryEvents);
    console.log('loadingData:', loadingData, 'loadingEvents', loadingEvents);
  }, [page]);

  useEffect(() => {
    async function getCountryEvents() {
      setLoadingEvents(true);

      const countryResponse = await fetch(`${eventsUrl}?country=${pais}`);
      const countryJson = await countryResponse.json();
      setCountryEvents(countryJson.data);

      const countriesResponse = await fetch(countriesUrl);
      const countriesJson = await countriesResponse.json();
      const country = countriesJson.data.find((item) => item.id === pais);

      if (countryJson.data) {
        setCountryData(country);
        setLoadingEvents(false);
      }
    }

    getCountryEvents();
  }, [pais]);

  useEffect(() => {
    async function getEvents() {
      if (page === 1) return; // Evita recarregar a primeira página

      const { json, totalPages } = await request(
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

      if (totalPages) {
        setFinalPage(totalPages);
      }
    }

    if (page <= finalPage && !loading) {
      getEvents();
    }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      if (!loading && !loadingEvents) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, loadingEvents]);

  if (loadingEvents) {
    return (
      <div className="container">
        <h1 className="title">Carregando eventos do país</h1>
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
                🏆 Rank: <span>{countryData.rank}</span>
              </p>
              <p className={styles.gold}>
                🥇 Medalhas de Ouro: <span>{countryData.gold_medals}</span>
              </p>
              <p className={styles.silver}>
                🥈 Medalhas de Prata: <span>{countryData.silver_medals}</span>
              </p>
              <p className={styles.bronze}>
                🥉 Medalhas de Bronze: <span>{countryData.bronze_medals}</span>
              </p>
              <p className={styles.total}>
                🏅 Total de Medalhas: <span>{countryData.total_medals}</span>
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
            <EventosItem key={event.id} event={event} />
          ))}
        </ul>
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

export default Country;
