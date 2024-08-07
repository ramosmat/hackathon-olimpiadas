import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    let totalPages;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
      if (json.links && json.links.last) {
        totalPages = +json.links.last.split('=').pop();
      }
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json.data);
      setLoading(false);
      return { response, json, totalPages };
    }
  }, []);

  return { data, setData, loading, setLoading, error, request };
};

export default useFetch;
