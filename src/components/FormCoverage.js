import _omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Checkbox, Stack} from '@chakra-ui/core';
import Select from 'react-select';

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
    const value = ev.value;
    const newProperties = {...properties, [value]: 'true'};

    updateProperties(newProperties);
  };
  const removeProperty = (property) => {
    const newProperties = _omit(properties, [property]);

    updateProperties(newProperties);
  };

  const filterOption = (option, inputValue) => {
    const {label, value} = option;
    const otherKey = options.filter(
      (opt) => opt.label === label && opt.value.includes(inputValue)
    );
    return value.includes(inputValue) || otherKey.length > 0;
  };

  const options = areaCoverageProperties.map((x) => {
    return {value: x, label: x};
  });

  return (
    <Stack space={4}>
      <Select
        onChange={handleSelect}
        filterOption={filterOption}
        options={options}
        // variant="filled"
        placeholder="Select an area"
        // value=""
      ></Select>
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
