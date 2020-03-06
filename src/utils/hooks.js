import {get} from 'axios';
import {useEffect, useState} from 'react';

import {getAPIUrl} from './index';

export const useAPIGet = path => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = `${getAPIUrl()}${path}`;

  useEffect(() => {
    setLoading(true);

    console.log('GET:', url);

    get(url)
      .then(({data}) => {
        setLoading(false);
        setData(data);
      })
      .catch(err => {
        throw new Error(err);
      });
  }, [url]);

  return {data, loading};
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
