import React from 'react';
import { sportsUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import { ColorRing } from 'react-loader-spinner';
import EsportesItem from './EsportesItem';

const EsportesCard = () => {
  const { data, loading, request } = useFetch();

  React.useEffect(() => {
    async function getSports() {
      const { response, json } = await request(sportsUrl);
    }

    getSports();
  }, [request]);

  if (loading)
    return (
      <div className="container">
        <h1 className="title">Esportes</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );

  if (data) {
    return (
      <div className="container">
        <h1 className="title">Esportes</h1>
        <div className="cardsFlex">
          {data.map((sport) => (
            <EsportesItem key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    );
  }
};

export default EsportesCard;
