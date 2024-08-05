import React from 'react';
import { sportsUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import EsportesCard from './EsportesCard';
import { Loader } from 'lucide-react';

const Esportes = () => {
  const { data, loading, request } = useFetch(sportsUrl);

  React.useEffect(() => {
    async function getSports() {
      const { response, json } = await request(sportsUrl);
    }

    getSports();
  }, [request]);

  if (loading)
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  console.log(data);

  if (data) {
    return (
      <div className="container">
        <h1 className="title">Esportes</h1>

        <div className="cardsFlex">
          {data.data.map((sport) => (
            <EsportesCard key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    );
  }
};

export default Esportes;
