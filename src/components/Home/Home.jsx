import React from 'react';
import { countriesUrl } from '../../API';
import useFetch from '../../hooks/useFetch';
import styles from './Home.module.css';
import CountryCard from './CountryCard';
import { Loader } from 'lucide-react';

const Home = () => {
  const total = 10;
  const { loading, data, request } = useFetch();

  React.useEffect(() => {
    async function fetchCountries() {
      const { response, json } = await request(countriesUrl);
    }

    fetchCountries();
  }, [request]);

  if (loading)
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  if (data) {
    return (
      <div className="container">
        <h1 className="title">Quadro de Medalhas</h1>

        <section className={styles.bar}>
          <div className={styles.barCountry}>
            <p>#</p>
            <p>País</p>
          </div>

          <div className={styles.barMedals}>
            <p>Ouro</p>
            <p>Prata</p>
            <p>Bronze</p>
            <p>Total</p>
          </div>
        </section>

        <section>
          {data.data.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </section>
      </div>
    );
  }

  return null;
};

export default Home;
