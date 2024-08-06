import React, { useState, useEffect } from 'react';
import { eventsUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import { Circles, ColorRing } from 'react-loader-spinner';
import EventosCard from './EventosCard';

const Eventos = () => {
  const { data, setData, loading, request } = useFetch();

  //Estado começa na pagina 1 e quando o usuário chega no final da pagina, soma mais 1
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getEvents() {
      const { response, json } = await request(`${eventsUrl}?page=${page}`);

      if (data === null) {
        return;
      } else {
        setData([...data, ...json.data]);
      }
    }

    getEvents();
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
        <h1 className="title">Eventos</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="container">
        <h1 className="title">Eventos</h1>
        <div className="cardsFlex">
          {data.map((event) => (
            <EventosCard key={event.id} event={event} />
          ))}
        </div>
        {loading && <p>Loading more events...</p>}
      </div>
    );
  }

  return null;
};

export default Eventos;
