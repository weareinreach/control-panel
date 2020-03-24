import {get} from 'axios';
import {useEffect, useState} from 'react';

import {getAPIUrl} from './index';

export const useAPIGet = path => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `${getAPIUrl()}${path}`;
  const fetchUrl = fetchUrl => {
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
    if (path) {
      fetchUrl(url);
    } else {
      setLoading(false);
    }
  }, [path, url]);

  return {data, loading, fetchUrl};
};

export const useMultipleAPIGet = paths => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUrls = paths => {
    const queryData = {};
    const requests = Object.keys(paths).map(key => {
      const url = `${getAPIUrl()}${paths[key]}`;

      console.log('GET:', url);

      return get(url)
        .then(({data}) => {
          queryData[key] = data;

          return;
        })
        .catch(err => {
          throw new Error(err);
        });
    });

    Promise.all(requests).then(() => {
      setData(queryData);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (paths) {
      fetchUrls(paths);
    } else {
      setLoading(false);
    }
    // TODO: remove for something that actually works
    // eslint-disable-next-line
  }, [JSON.stringify(paths)]);

  return {data, loading, fetchUrls};
};

export const useInputChange = (initalState = '') => {
  const [value, setValue] = useState(initalState);
  const setInputValue = event => {
    setValue(event.target.value);
  };

  return [value, setInputValue];
};

const STATE_ERROR = 'ERROR';
const STATE_IN_PROGRESS = 'IN_PROGRESS';
const STATE_SUCCESS = 'SUCCESS';

export const useStatus = initalStatus => {
  const [status, setStatus] = useState(initalStatus);
  const isError = status === STATE_ERROR;
  const isLoading = status === STATE_IN_PROGRESS;
  const isSuccess = status === STATE_SUCCESS;
  const setError = () => setStatus(STATE_ERROR);
  const setLoading = () => setStatus(STATE_IN_PROGRESS);
  const setSuccess = () => setStatus(STATE_SUCCESS);

  return {
    isError,
    isLoading,
    isSuccess,
    setError,
    setLoading,
    setSuccess
  };
};

export const useToggle = (initalState = false) => {
  const [value, setValue] = useState(initalState);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};
