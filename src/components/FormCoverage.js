import { css, Global, ClassNames } from '@emotion/core'
import _omit from 'lodash/omit';
import _capitalize from 'lodash/capitalize';
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
import {areaCoverageProperties} from '../data/properties.json';

import styled from '@emotion/styled';

const OptionalTag = styled.span`
  color: #888;
  padding-left: 8px;
  font-size: 12px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
  & > h1 {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const FormField = ({label, children, isOptional}) => {
  return (
    <FormControl css={css`
      margin-top: 5px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      & > label {
        display:inline-flex;
        min-width: 200px;
        flex-shrink: 0;
        align-items: center;
      }
      & > .form-field-children {
        width: 100%;
      }
    `}>
      <FormLabel>
        <span>{label}</span>
        {isOptional && <OptionalTag>(Optional)</OptionalTag>}
      </FormLabel>
      <div className="form-field-children">
        {children}
      </div>
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
      nextField = <USPicker key="us-state-picker" />;
    } else if(country.value === 'Canada'){
      nextField = <CanadianPicker key="canadian-province-picker" />;
    } else if(country.value === 'Mexico') {
      nextField = <MexicoPicker key="mexican-state-picker" />;
    }
  }
  return (
    <FormSection>
      <h1>New Coverage Area</h1>
      <FormField label="Country">
        <Select options={countryOptions}
                onChange={(option) => setCountry(option)}
                value={country}
                placeholder="Select a country" />
      </FormField>
      {nextField}
    </FormSection>
  )
};

const USStateOptions = _values(USStates).map(state => ({value: state, label: state}));
const CanadianProvinceOptions = _values(CanadianProvinces).map(province => ({value: province.name, label: province.name}));
const USCountyOptions = areaCoverageProperties.filter(prop => prop.startsWith('service-county'));

const USPicker = () => {
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [county, setCounty] = useState(null);
  const [town, setTown] = useState(null);
  const cityOptions = USCities[state?.value]?.map(city => ({value: city, label: city})) ?? [];
  const countyOptions = USCountyOptions.filter(county => {
    return county.startsWith(`service-county-${state?.value.toLowerCase()}`);
  }).map(county => {
    return {
      value: county,
      label: _capitalize(county.split('-')[3])
    };
  });
  return (
    <>
      <FormField label="State">
        <Select options={USStateOptions}
                onChange={(option) => setState(option)}
                value={state} placeholder="Select a State" />
      </FormField>
      {state &&
        <>
          <FormField label="City">
            <Creatable
              isClearable
              options={cityOptions}
              onChange={(option) => setCity(option)}
              value={city}
              placeholder="Select a City" />
          </FormField>
          <FormField label="County" isOptional>
            <Creatable
              isClearable
              options={countyOptions}
              onChange={(option) => setCounty(option)}
              value={county}
              placeholder="Select a County" />
          </FormField>
          <FormField label="Town" isOptional>
            <Input type="text" value={town} onChange={event => setTown(event.target.value)} />
          </FormField>
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
        <Creatable
          isClearable
          options={CanadianProvinceOptions}
          onChange={(option) => setProvince(option)}
          value={province}
          placeholder="Select a Province" />
      </FormField>
      {province &&
        <FormField label="City">
          <Creatable
            isClearable
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
          isClearable
          options={stateOptions}
          onChange={(option) => setState(option)}
          value={state}
          placeholder="Select a State" />
      </FormField>
      {state &&
        <>
          <FormField label="City">
            <Creatable
              isClearable
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

const ExistingCoverageAreas = ({properties, updateProperties}) => {
  const propertyKeys = Object.keys(properties).filter((key) =>
    key.includes('service-')
  );
  const removeProperty = (property) => {
    const newProperties = _omit(properties, [property]);
    updateProperties(newProperties);
  };
  return (
    <FormSection>
      <h1>Existing Coverage Areas</h1>
      {propertyKeys?.map((key) => (
        <Checkbox
          key={key}
          defaultIsChecked
          onChange={() => removeProperty(key)}
        >
          {key}
        </Checkbox>
      ))}
    </FormSection>
  );
};


const FormCoverage = (props) => {
  const {properties: initialProperties = {}, updateField} = props;
  const [properties, setProperties] = useState(initialProperties);
  const updateProperties = (value) => {
    updateField('properties', value);
    setProperties(value);
  }
  return (
    <Stack space={4}>
      <ExistingCoverageAreas properties={properties} updateProperties={updateProperties} />
      <ServiceAreaForm />
    </Stack>
  );
}

export default FormCoverage;
