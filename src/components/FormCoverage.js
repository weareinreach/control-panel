import { css, Global, ClassNames } from '@emotion/core'
import _omit from 'lodash/omit';
import _sortBy from 'lodash/sortBy';
import _values from 'lodash/values';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Checkbox, Stack, Input, FormControl, FormLabel} from '@chakra-ui/core';
import Select from 'react-select';
import Creatable from 'react-select/creatable';

import USStates from '../data/us-states.json';
import CanadianProvinces from '../data/canadian-provinces.json';
import CanadianCities from '../data/canadian-cities.json';
import USCities from '../data/us-cities.json';
import MexicanCities from '../data/mexican-cities.json';
import MexicanStates from '../data/mexican-states.json';

import styled from '@emotion/styled';

const OptionalTag = styled.span`
  color: #888;
  padding-left: 8px;
  font-size: 12px;
`

const FormField = ({label, children, isOptional}) => {
  return (
    <FormControl css={css`
      margin: 15px 0;
    `}>
      <FormLabel>
        <span>{label}</span>
        {isOptional && <OptionalTag>(Optional)</OptionalTag>}
      </FormLabel>
      {children}
    </FormControl>
  )
}

const ServiceAreaForm = () => {
  const [country, setCountry] = React.useState(null);
  const countryOptions = [
    {value: 'Canada', label: 'Canada'},
    {value: 'Mexico', label: 'Mexico'},
    {value: 'USA', label: 'USA'}
  ];
  let nextField = null;
  if(country){
    if(country.value === 'USA') {
      nextField = <USStatePicker key="us-state-picker" />;
    } else if(country.value === 'Canada'){
      nextField = <CanadianPicker key="canadian-province-picker" />;
    } else if(country.value === 'Mexico') {
      nextField = <MexicoPicker key="mexican-state-picker" />;
    }
  }
  return (
    <>
      <FormField label="Country">
        <Select options={countryOptions}
                onChange={(option) => setCountry(option)}
                value={country}
                placeholder="Select a country" />
      </FormField>
      {nextField}
    </>
  )
};

const USStateOptions = _values(USStates).map(state => ({value: state, label: state}));
const CanadianProvinceOptions = _values(CanadianProvinces).map(province => ({value: province.name, label: province.name}));

const USCityPicker = ({state}) => {
  const [city, setCity] = useState(null);
  const options = USCities[state]?.map(city => ({value: city, label: city})) ?? [];
  return (
    <FormField label="City">
      <Creatable
        options={options}
        onChange={(option) => setCity(option)}
        value={city}
        placeholder="Select a City" />
    </FormField>
  )
}

const USCountyPicker = () => {
  const [county, setCounty] = useState(null);
  return (
    <FormField label="County" isOptional>
      <Input type="text" value={county} onChange={event => setCounty(event.target.value)} />
    </FormField>
  )
}

const USTownPicker = () => {
  const [town, setTown] = useState(null);
  return (
    <FormField label="Town" isOptional>
      <Input type="text" value={town} onChange={event => setTown(event.target.value)} />
    </FormField>
  );
}

const USStatePicker = () => {
  const [state, setState] = useState(null);
  return (
    <>
      <FormField label="State">
        <Select options={USStateOptions}
                onChange={(option) => setState(option)}
                value={state} placeholder="Select a State" />
      </FormField>
      {state &&
        <>
          <USCityPicker state={state.value} />
          <USCountyPicker />
          <USTownPicker />
        </>
      }
    </>
  );
};

const CanadianPicker = () => {
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const cityOptions = _sortBy(CanadianCities.filter(city => city.admin === province?.value).map(city => {
    return {label: city.city, value: city.city}
  }), option => option.label);
  return (
    <>
      <FormField label="Province">
        <Select options={CanadianProvinceOptions}
                onChange={(option) => setProvince(option)}
                value={province} placeholder="Select a Province" />
      </FormField>
      {province &&
        <FormField label="City">
          <Select
            options={cityOptions}
            onChange={(option) => setCity(option)}
            value={city}
            placeholder="Select a City"
          />
        </FormField>
      }
    </>
  );
};

const MexicoPicker = () => {
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const stateOptions = _sortBy(MexicanStates.states.map(state => {
    return {label: state.name, value: state.name, state_id: state.id}
  }), option => option.label);
  const cityOptions =
    MexicanCities.cities
      .filter(city => city.state_id === state?.state_id)
      .map(city => ({label: city.name, value: city.name}));
  return (
    <>
      <FormField label="State">
        <Creatable
          options={stateOptions}
          onChange={(option) => setState(option)}
          value={state}
          placeholder="Select a State" />
      </FormField>
      {state &&
        <>
          <FormField label="City">
            <Creatable
              options={cityOptions}
              onChange={(option) => setCity(option)}
              value={city}
              placeholder="Select a City" />
          </FormField>
        </>
      }
    </>
  );
};

const ExistingCoverageAreas = () => {
  return (
    <div>

    </div>
  );
};


const FormCoverage = (props) => {
  return (
    <Stack space={4}>
      <ServiceAreaForm />
      <ExistingCoverageAreas />
    </Stack>
  );
}

export default FormCoverage;
