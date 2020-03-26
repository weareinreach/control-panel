import _omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';
import {Checkbox, Select, Stack} from '@chakra-ui/core';

import {areaCoverageProperties} from '../data/properties.json';

const ServiceAreaCoverage = props => {
  const {handleUpdate, properties = {}} = props;
  const propertyKeys = Object.keys(properties).filter(key =>
    key.includes('service-')
  );
  const handleSelect = ev => {
    const value = ev.target.value;

    handleUpdate({
      ...properties,
      [value]: 'true'
    });
  };
  const removeProperty = property => {
    handleUpdate(_omit(properties, [property]));
  };

  return (
    <Stack space={2}>
      <Select
        onChange={handleSelect}
        variant="filled"
        placeholder="Select an area"
        value=""
      >
        {areaCoverageProperties.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      {propertyKeys?.map(key => (
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

ServiceAreaCoverage.propTypes = {
  handleUpdate: PropTypes.func,
  properties: PropTypes.object
};

export default ServiceAreaCoverage;
