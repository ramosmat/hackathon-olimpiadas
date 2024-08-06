import React from 'react';
import styles from './Country.module.css';
import useFetch from '../../../hooks/useFetch';
import EventosCard from '../../Eventos/EventosCard';
import { eventsUrl, countriesUrl } from '../../../API';
import { ColorRing } from 'react-loader-spinner';

const Country = () => {
  const { request } = useFetch();
  const [countryData, setCountryData] = React.useState(null);
  const [countryEvents, setCountryEvents] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const url = window.location.href.split('/');
  const pais = url[url.length - 1];

  React.useEffect(() => {
    async function getCountryEvents() {
      setLoading(true);
      const { response, json } = await request(`${eventsUrl}?country=${pais}`);

      await fetch(countriesUrl).then((response) => {
        return response.json().then((json) => {
          const country = json.data.filter((item) => item.id === pais)[0];
          setCountryData(country);
        });
      });

      if (response.ok && json) {
        setCountryEvents(json.data);
        setLoading(false);
      }
    }

    getCountryEvents();
  }, [request]);

  if (loading) {
    return (
      <div className="container">
        <h1 className="title">Eventos</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );
  }

  if (countryEvents && countryData) {
    return (
      <div className="container">
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

        <section className={styles.events}>
          <h2 className="subTitle">Eventos</h2>
          <ul className="cardsFlex">
            {countryEvents.map((event) => (
              <EventosCard key={event.id} event={event} />
            ))}
          </ul>
        </section>
      </div>
    );
  }
};

export default Country;
