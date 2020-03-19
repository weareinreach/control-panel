import {get} from 'axios';
import {useEffect, useState} from 'react';

import {getAPIUrl} from './index';

export const useAPIGet = path => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `${getAPIUrl()}${path}`;
  const fetchMore = fetchUrl => {
    setLoading(true);

    console.log('GET:', fetchUrl);

    get(fetchUrl)
      .then(({data}) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    fetchMore(url);
  }, [url]);

  return {data, loading, fetchMore};
};

export const useInputChange = (initalState = '') => {
  const [value, setValue] = useState(initalState);
  const setInputValue = event => {
    setValue(event.target.value);
  };

  return [value, setInputValue];
};

export const useToggle = (initalState = false) => {
  const [value, setValue] = useState(initalState);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};
