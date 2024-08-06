import React from 'react';
import useFetch from '../../hooks/useFetch';
import { localsUrl } from '../../API';
import LocalCard from './LocalCard';
import { Circles, ColorRing } from 'react-loader-spinner';

const Locais = () => {
  const { loading, data, request } = useFetch();

  React.useEffect(() => {
    async function getLocals() {
      const { response, json } = await request(localsUrl);
    }

    getLocals();
  }, [request]);

  if (loading)
    return (
      <div className="container">
        <h1 className="title">Locais</h1>
        <div className="loader">
          <ColorRing />
        </div>
      </div>
    );

  if (data)
    return (
      <div className="container">
        <h1 className="title">Locais</h1>

        <div>
          {data.map((local) => (
            <LocalCard key={local.id} local={local} />
          ))}
        </div>
      </div>
    );
};

export default Locais;
