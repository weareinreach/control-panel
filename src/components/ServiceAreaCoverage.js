import PropTypes from 'prop-types';
import React from 'react';
import {Select, Stack} from '@chakra-ui/core';

const canadaProvidenceOptions = [{label: 'city', value: ''}];
const mexicoCityOptions = [{label: 'city', value: ''}];

const mexicoStateOptions = [{label: 'city', value: ''}];
const canadaCityOptions = [{label: 'city', value: ''}];

const usStateOptions = [{label: 'city', value: ''}];
const usCityOptions = [{label: 'city', value: ''}];

const renderOptions = options =>
  options.map(({label, value}) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

const ServiceAreaCoverage = props => {
  const {isCanada, isMexico, isUnitedStates} = props;

  return (
    <Stack space={2}>
      <Select
        onChange={value => value}
        variant="filled"
        placeholder="Select a country"
      >
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </Select>
      <Select
        onChange={value => value}
        variant="filled"
        placeholder="Select a state or providence"
      >
        {isCanada && renderOptions(canadaProvidenceOptions)}
        {isMexico && renderOptions(mexicoStateOptions)}
        {isUnitedStates && renderOptions(usStateOptions)}
      </Select>
      <Select
        onChange={value => value}
        variant="filled"
        placeholder="Select a city"
      >
        {isCanada && renderOptions(canadaCityOptions)}
        {isMexico && renderOptions(mexicoCityOptions)}
        {isUnitedStates && renderOptions(usCityOptions)}
      </Select>
    </Stack>
  );
};

ServiceAreaCoverage.propTypes = {
  isCanada: PropTypes.bool,
  isMexico: PropTypes.bool,
  isUnitedStates: PropTypes.bool
};

export default ServiceAreaCoverage;
