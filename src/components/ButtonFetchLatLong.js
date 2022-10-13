import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Button, ButtonGroup} from '@chakra-ui/react';
import config from '../utils/config';

export const url = `${config.apiDomain}${config.apiBasePath}/getCoords`;

const fetchCoords = async (query) => {
  const {data} = await axios.get(url, {
    params: {
      text: query,
    },
  });
  return data;
};

export const FetchLatLongBtn = ({formik}) => {
  console.log(formik);
  const {values, setFieldValue} = formik;
  const [loading, setLoading] = useState(false);
  const addressQuery = [
    values.address,
    values.city,
    values.state,
    values.zip_code,
    values.country,
  ]
    .filter((x) => x)
    .join(',');

  const checkUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURI(
    addressQuery
  )}&destination=${encodeURI(
    [values.lat, values.long].join(',')
  )}&travelmode=walking`;

  const updateCoords = (lat, long) => {
    setFieldValue('lat', lat);
    setFieldValue('long', long);
  };

  const getCoords = async () => {
    setLoading(true);
    const {lat, lon} = await fetchCoords(addressQuery);

    if (lat && lon) updateCoords(lat, lon);
    setLoading(false);
  };

  return (
    <ButtonGroup>
      <Button
        onClick={getCoords}
        size="md"
        colorScheme="green"
        isLoading={loading}
        loadingText="Fetching..."
      >
        Get Coords
      </Button>
      <a href={checkUrl} target="coordVerify">
        <Button size="md">Check distance to address</Button>
      </a>
    </ButtonGroup>
  );
};

FetchLatLongBtn.propTypes = {
  formik: PropTypes.any,
};
