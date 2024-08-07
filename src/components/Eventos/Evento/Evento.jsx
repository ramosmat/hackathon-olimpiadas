import React, { useEffect } from 'react';
import styles from './Evento.module.css';
import { eventsUrl } from '../../../API';
import useFetch from '../../../hooks/useFetch';
import { ColorRing } from 'react-loader-spinner';

const Evento = () => {
  const { loading, data, request } = useFetch();

  const url = window.location.href.split('/');
  const eventoID = url[url.length - 1];

  useEffect(() => {
    async function getEvento() {
      const { response, json } = await request(`${eventsUrl}/${eventoID}`);
    }

    if (!loading) {
      getEvento();
    }
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1 className="title">Carregando evento</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );
  }

  if (data && data.competitors) {
    return (
      <div className="container">
        <h1 className="title">Evento: {data.discipline_name}</h1>
        <section className={styles.section}>
          <div className={styles.infos}>
            <h3 className={styles.group}>{data.detailed_event_name}</h3>

            <p>
              Data: <span>{data.day}</span>
            </p>
            <p>
              Horário:{' '}
              <span>
                {new Date(data.start_date).toLocaleTimeString()} -{' '}
                {new Date(data.end_date).toLocaleTimeString()}
              </span>
            </p>
            <p>
              Local: <span>{data.venue_name}</span>
            </p>
            <p>
              Status: <span>{data.status}</span>
            </p>
            <p>
              Evento com medalha:{' '}
              <span>{data.is_medal_event ? 'Sim' : 'Não'}</span>
            </p>
            <p>
              Evento ao vivo: <span>{data.is_live ? 'Sim' : 'Não'}</span>
            </p>
          </div>

          {data.competitors.length > 0 && (
            <div className={styles.divCompetidores}>
              <h3>Competidores:</h3>
              {data.competitors.map((competitor) => (
                <div
                  key={competitor.competitor_name}
                  className={styles.competitoresNomes}
                >
                  <div className={styles.divImg}>
                    <img src={competitor.country_flag_url} alt="bandeira" />
                  </div>
                  {competitor.competitor_name} (
                  <span>
                    {competitor.result_winnerLoserTie
                      ? competitor.result_winnerLoserTie
                      : 'Em progresso...'}
                    )
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.divEmblem}>
            <img src={data.discipline_pictogram} alt="emblem" />
          </div>
        </section>
      </div>
    );
  }
};

export default Evento;
