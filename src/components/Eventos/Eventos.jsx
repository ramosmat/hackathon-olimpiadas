import React from 'react';
import { eventsUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import { Circles, ColorRing } from 'react-loader-spinner';
import EventosCard from './EventosCard';

const Eventos = () => {
  const { data, loading, request } = useFetch();

  React.useEffect(() => {
    async function getEvents() {
      const { response, json } = await request(eventsUrl);
    }

    getEvents();
  }, [request]);

  console.log(data);

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

  if (data) {
    return (
      <div className="container">
        <h1 className="title">Eventos</h1>

        <div className="cardsFlex">
          {data.data.map((event) => (
            <EventosCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  }
};

export default Eventos;
