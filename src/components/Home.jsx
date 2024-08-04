import React from 'react';
import { countriesUrl } from '../API';
import useFetch from '../hooks/useFetch';

const Home = () => {
  React.useEffect(() => {
    async function getCountries() {
      const response = await fetch(countriesUrl);
      const data = await response.json();
      console.log(data);
    }

    getCountries();
  }, []);

  return <section>Home</section>;
};

export default Home;
