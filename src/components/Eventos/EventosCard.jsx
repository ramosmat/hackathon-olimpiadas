import React, { useState, useEffect } from 'react';
import { eventsUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import { Circles, ColorRing } from 'react-loader-spinner';
import EventosItem from './EventosItem';

const EventosCard = () => {
  const { data, setData, loading, request } = useFetch();

  //Estado começa na pagina 1 e quando o usuário chega no final da pagina, soma mais 1
  const [page, setPage] = useState(1);
  const [finalPage, setFinalPage] = useState(10);

  useEffect(() => {
    async function getEvents() {
      const { response, json, totalPages } = await request(
        `${eventsUrl}?page=${page}`,
      );

      if (data === null) {
        return;
      } else {
        setData([...data, ...json.data]);
      }

      if (totalPages) {
        setFinalPage(totalPages);
      }
    }

    getEvents();
  }, [request, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
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
            <EventosItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default EventosCard;
