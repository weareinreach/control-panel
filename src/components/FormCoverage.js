import _omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Checkbox, Select, Stack} from '@chakra-ui/core';

import {areaCoverageProperties} from '../data/properties.json';

const FormCoverage = (props) => {
  const {properties: initialProperties = {}, updateField} = props;
  const [properties, setProperties] = useState(initialProperties);
  const propertyKeys = Object.keys(properties).filter((key) =>
    key.includes('service-')
  );
  const updateProperties = (value) => {
    updateField('properties', value);
    setProperties(value);
  };
  const handleSelect = (ev) => {
    const value = ev.target.value;
    const newProperties = {...properties, [value]: 'true'};

    updateProperties(newProperties);
  };
  const removeProperty = (property) => {
    const newProperties = _omit(properties, [property]);

    updateProperties(newProperties);
  };

  return (
    <Stack space={2}>
      <Select
        onChange={handleSelect}
        variant="filled"
        placeholder="Select an area"
        value=""
      >
        {areaCoverageProperties.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      {propertyKeys?.map((key) => (
        <Checkbox
          key={key}
          defaultIsChecked
          onChange={() => removeProperty(key)}
        >
          {key}
        </Checkbox>
      ))}
    </Stack>
  );
};

FormCoverage.propTypes = {
  properties: PropTypes.object,
  updateField: PropTypes.func,
};

export default FormCoverage;
