import { css } from '@emotion/react'
import _omit from 'lodash/omit';
import _drop from 'lodash/drop';
import _mapKeys from 'lodash/mapKeys';
import _capitalize from 'lodash/capitalize';
import _sortBy from 'lodash/sortBy';
import _values from 'lodash/values';
import React, {useState} from 'react';
import {Checkbox, Stack, Input, FormControl, FormLabel} from '@chakra-ui/react';
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

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
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
        <span data-test-id="coverage-form-label">{label}</span>
        {isOptional && <OptionalTag>&#40;Optional&#41;</OptionalTag>}
      </FormLabel>
      <div className="form-field-children" data-test-id="coverage-form-child">
        {children}
      </div>
    </FormControl>
  )
}

const USStateOptions = _values(USStates).map(state => ({value: state, label: state}));
const CanadianProvinceOptions = _values(CanadianProvinces).map(province => ({value: province.name, label: province.name}));
const USCountyOptions = areaCoverageProperties.filter(prop => prop.startsWith('service-county'));
const NormalizedUSCityNames = _mapKeys(USCities, (value, key) => {
  return key.toLowerCase();
});

function countyToLabel(state, county){
  const prefix = 'service-county-' + state;
  return _capitalize(county.slice(prefix.length).split('-').join(' ').trim());
}

const USPicker = (props) => {
  const {onChange} = props;
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [county, setCounty] = useState(null);
  const [town, setTown] = useState(null);
  const cityOptions = NormalizedUSCityNames[state?.value?.toLowerCase()]?.map(city => ({value: city, label: city})) ?? [];
  const countyOptions = USCountyOptions.filter(county => {
    return county.startsWith(`service-county-${state?.value.toLowerCase().split(' ').join('-')}`);
  }).map(county => {
    return {
      value: countyToLabel(state?.value, county),
      label: countyToLabel(state?.value, county)
    };
  });
  return (
    <>
      <FormField label="National">
        <Checkbox
          key='national'
          onChange={(e) => {
            onChange('national', e.target.checked);
          }}
        >
          check this field only if the org/service is able to help people located anywhere in the country.
        </Checkbox>
      </FormField>
      <FormField label="State">
        <Select options={USStateOptions}
                onChange={(option) => {
                  setState(option);
                  onChange('state', option?.value);
                }}
                value={state} placeholder="Select a State" />
      </FormField>
      {state &&
        <>
          <FormField label="City">
            <Creatable
              isClearable
              options={cityOptions}
              onChange={(option) => {
                setCity(option);
                onChange('city', option?.value);
              }}
              value={city}
              placeholder="Select a City" />
          </FormField>
          <FormField label="County" isOptional>
            <Creatable
              isClearable
              options={countyOptions}
              onChange={(option) => {
                setCounty(option);
                onChange('county', option?.value);
              }}
              value={county}
              placeholder="Select a County" />
          </FormField>
          <FormField label="Town" isOptional>
            <Input type="text" value={town} onChange={event => {
              setTown(event.target.value);
              onChange('town', event.target.value);
            }} />
          </FormField>
        </>
      }
    </>
  );
};

const CanadianPicker = ({onChange}) => {
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const cityOptions = _sortBy(CanadianCities.filter(city => city.admin === province?.value).map(city => {
    return {label: city.city, value: city.city}
  }), option => option.label);
  return (
    <>
      <FormField label="National">
        <Checkbox
          key='national'
          onChange={(e) => {
            onChange('national', e.target.checked);
          }}
        >
          check this field only if the org/service is able to help people located anywhere in the country.
        </Checkbox>
      </FormField>
      <FormField label="Province">
        <Creatable
          isClearable
          options={CanadianProvinceOptions}
          onChange={(option) => {
            setProvince(option)
            onChange('state', option?.value);
          }}
          value={province}
          placeholder="Select a Province" />
      </FormField>
      {province &&
        <FormField label="City">
          <Creatable
            isClearable
            options={cityOptions}
            onChange={(option) => {
              setCity(option);
              onChange('city', option?.value);
            }}
            value={city}
            placeholder="Select a City"
          />
        </FormField>
      }
    </>
  );
};

const MexicoPicker = ({onChange}) => {
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
      <FormField label="National">
        <Checkbox
          key='national'
          onChange={(e) => {
            onChange('national', e.target.checked);
          }}
        >
          check this field only if the org/service is able to help people located anywhere in the country.
        </Checkbox>
      </FormField>
      <FormField label="State">
        <Creatable
          isClearable
          options={stateOptions}
          onChange={(option) => {
            setState(option);
            onChange('state', option?.value);
          }}
          value={state}
          placeholder="Select a State" />
      </FormField>
      {state &&
        <>
          <FormField label="City">
            <Creatable
              isClearable
              options={cityOptions}
              onChange={(option) => {
                setCity(option);
                onChange('city', option?.value);
              }}
              value={city}
              placeholder="Select a City" />
          </FormField>
        </>
      }
    </>
  );
};

const ServiceAreaForm = (props) => {
  const {onChange} = props;
  const [country, setCountry] = React.useState(null);
  const countryOptions = [
    {value: 'Canada', label: 'Canada'},
    {value: 'Mexico', label: 'Mexico'},
    {value: 'United States', label: 'United States'}
  ];
  let nextField = null;
  if(country){
    if(country.value === 'United States') {
      nextField = <USPicker key="us-state-picker" onChange={onChange} />;
    } else if(country.value === 'Canada'){
      nextField = <CanadianPicker key="canadian-province-picker" onChange={onChange} />;
    } else if(country.value === 'Mexico') {
      nextField = <MexicoPicker key="mexican-state-picker" onChange={onChange} />;
    }
  }

  function onChangeCountry(option){
    setCountry(option);
    onChange('country', option.value);
  }

  return (
    <FormSection>
      <h1 data-test-id="coverage-form-area">New Coverage Area</h1>
      <FormField label="Country">
        <div data-test-id="coverage-form-select-country">
        <Select 
                options={countryOptions}
                onChange={onChangeCountry}
                value={country}
                placeholder="Select a country" />
          </div>
      </FormField>
      {nextField}
    </FormSection>
  )
};

export function normalizeField(field){
  return field.toLowerCase().replace(/ /g, '-');
}

function toProperties({ national, country, state, city, town, county }) {
  const properties = {};
  if (country && national) {
    properties[`service-national-${normalizeField(country)}`] = 'true';
  }
  if(state){
    properties[`service-state-${normalizeField(state)}`] = 'true';
    if(city){
      properties[`service-city-${normalizeField(state)}-${normalizeField(city)}`] = 'true';
    }
    if(town) {
      properties[`service-town-${normalizeField(state)}-${normalizeField(town)}`] = 'true';
    }
    if(county){
      properties[`service-county-${normalizeField(state)}-${normalizeField(county)}`] = 'true';
    }
  }
  return properties;
}

const ExistingCoverageAreas = ({existingProperties, locationFields, updateProperties}) => {
  const propertyKeys = Object.keys(existingProperties).filter((key) =>
    key.includes('service-')
  ).sort();
  const removeProperty = (property) => {
    const newProperties = _omit(existingProperties, [property]);
    updateProperties(newProperties);
  };
  return (
    <FormSection>
      <h1 data-test-id="coverage-form-header">Coverage Areas</h1>
      <CheckboxList>
        {propertyKeys?.map((key) => (
          <Checkbox
            data-test-id={key}
            key={key}
            isChecked={true}
            onChange={() => removeProperty(key)}
          >
            {key}
          </Checkbox>
        ))}
        {Object.keys(toProperties(locationFields))?.map((key) => (
            <Checkbox
              key={key}
              colorScheme="green"
              isChecked={true}
              onChange={() => removeProperty(key)}
            >
              {key}
            </Checkbox>
          ))}
      </CheckboxList>
    </FormSection>
  );
};


const FormCoverage = (props) => {
  const {properties: initialProperties = {}, updateField} = props;
  const [existingProperties, setExistingProperties] = useState(initialProperties);
  const [locationFields, setLocationFields] = useState({});


  function onChangeLocationFields(fields){
    updateField('properties', {...existingProperties, ...toProperties(fields)});
    setLocationFields(fields);
  }

  function onChangeExistingProperties(value){
    updateField('properties', {...toProperties(locationFields), ...value});
    setExistingProperties(value);
  }

  function onChange(name, value){
    if (name === 'national') {
      if (!value) {
        onChangeLocationFields(_omit(locationFields, 'national'));
      } else {
        onChangeLocationFields({
          ...locationFields,
          national: value
        });
      }
    } else if (name === 'country') {
      if(!value){
        onChangeLocationFields(_omit(locationFields, 'country'));
      } else {
        onChangeLocationFields({
          country: value
        });
      }
    } else if(name === 'state') {
      if(!value){
        onChangeLocationFields(_omit(locationFields, 'state'));
      } else {
        onChangeLocationFields({
          ...locationFields,
          state: value
        });
      }
    } else if(name === 'city') {
      if(!value){
        onChangeLocationFields(_omit(locationFields, 'city'));
      } else {
        onChangeLocationFields({
          ...locationFields,
          city: value
        });
      }
    } else if(name === 'county'){
      if(!value){
        onChangeLocationFields(_omit(locationFields, 'county'));
      } else {
        onChangeLocationFields({
          ...locationFields,
          county: value
        });
      }
    } else if(name === 'town') {
      if(!value){
        onChangeLocationFields(_omit(locationFields, 'town'));
      } else {
        onChangeLocationFields({
          ...locationFields,
          town: value
        });
      }
    } else {
      throw new Error(`Unknown Field ${name}`);
    }
  }

  console.log("Location Fields", locationFields);

  return (
    <Stack space={4}>
      <ExistingCoverageAreas
          existingProperties={existingProperties}
          locationFields={locationFields}
          updateProperties={onChangeExistingProperties} />
      <ServiceAreaForm onChange={onChange}/>
    </Stack>
  );
}

export default FormCoverage;
