import React from 'react';
import styles from './EventosCard.module.css';

const EventosCard = ({ event }) => {
  return (
    <div className={styles.card}>
      <div className={styles.eventTitle}>
        <h2 className={styles.name}>{event.discipline_name}</h2>
        <div className={styles.divImg}>
          <img src={event.discipline_pictogram} alt="event_emblem" />
        </div>
      </div>
      <div className={styles.infos}>
        <p className={styles.p}>
          Categoria:{' '}
          <span className={styles.span}>{event.detailed_event_name}</span>
        </p>
        <p className={styles.p}>
          Data: <span className={styles.span}>{event.day}</span>
        </p>
        <p className={styles.p}>
          Início:{' '}
          <span className={styles.span}>
            {new Date(event.start_date).toLocaleTimeString()}
          </span>
        </p>
        <p className={styles.p}>
          Fim:{' '}
          <span className={styles.span}>
            {new Date(event.end_date).toLocaleTimeString()}
          </span>
        </p>
        <p className={styles.p}>
          Local: <span className={styles.span}>{event.venue_name}</span>
        </p>
        <p className={styles.p}>
          Status: <span className={styles.span}>{event.status}</span>
        </p>
      </div>
    </div>
  );
};

export default EventosCard;
