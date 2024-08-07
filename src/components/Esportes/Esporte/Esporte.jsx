import React, { useEffect, useState } from 'react';
import styles from './Esporte.module.css';
import useFetch from '../../../hooks/useFetch';
import { eventsUrl } from '../../../API';
import { ColorRing } from 'react-loader-spinner';
import EventosItem from '../../Eventos/EventosItem';

const Esporte = () => {
  const { data, loading, request } = useFetch();
  const [sportEvents, setSportEvents] = useState([]);

  const url = window.location.href.split('/');
  const esporte = url[url.length - 1];

  useEffect(() => {
    async function getSport() {
      const { json } = await request(`${eventsUrl}?discipline=${esporte}`);

      if (json && json.data) {
        setSportEvents((prevEvents) => {
          const newEvents = json.data.filter(
            (newEvent) => !prevEvents.some((event) => event.id === newEvent.id),
          );
          return [...prevEvents, ...newEvents];
        });
      }
    }

    getSport();
  }, [request, esporte]);

  if (loading) {
    return (
      <div className="container">
        <h1 className="title">Carregando eventos do esporte</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {data && data.length > 0 && (
        <section className={styles.sport}>
          <div className={styles.divImg}>
            <img src={data[0].discipline_pictogram} alt="sport_emblem" />
          </div>
          <h2 className={styles.name}>{data[0].discipline_name}</h2>
        </section>
      )}
      <section className={styles.events}>
        <h2 className="subTitle">Eventos</h2>
        <ul className="cardsFlex">
          {sportEvents.map((event) => (
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

export default Esporte;
