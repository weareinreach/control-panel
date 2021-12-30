import {get} from 'axios';
import {useEffect, useState} from 'react';

import {CATALOG_API_URL} from './index';

/**
 * Fetch the catalog api for a single endpoint
 * @param  {Object} endpoint The endpoint to query
 * @return {Object} An object of data, loading status, etc
 */
export const useAPIGet = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUrl = (fetchEndpoint) => {
    const url = `${CATALOG_API_URL}${fetchEndpoint}`;

    setLoading(true);

    get(url)
      .then(({data}) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (endpoint) {
      fetchUrl(endpoint);
    } else {
      setLoading(false);
    }
  }, [endpoint]);

  return {data, loading, fetchUrl};
};

/**
 * Handle change for an input element
 * @param  {Object} initalState The initial value
 * @return {Object} Hook value and updater
 */
export const useInputChange = (initalState = '') => {
  const [value, setValue] = useState(initalState);
  const setInputValue = (event) => {
    setValue(event.target.value);
  };

  return [value, setInputValue];
};

const STATE_ERROR = 'ERROR';
const STATE_IN_PROGRESS = 'IN_PROGRESS';
const STATE_SUCCESS = 'SUCCESS';

/**
 * Reliably maintain the status of an operation
 * @param  {Object} initalState The initial value
 * @return {Object} Hook values and updaters
 */
export const useStatus = (initalStatus) => {
  const [status, setStatus] = useState(initalStatus);
  const [errorMessage, setErrorMessage] = useState('');
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
    setSuccess,
    errorMessage,
    setErrorMessage
  };
};

/**
 * Reliably toggle between true and false values
 * @param  {Object} initalState The initial value
 * @return {Object} Hook value and updaters
 */
export const useToggle = (initalState = false) => {
  const [value, setValue] = useState(initalState);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};
