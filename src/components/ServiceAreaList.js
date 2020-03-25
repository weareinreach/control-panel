import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import {Checkbox} from '@chakra-ui/core';

const ListServiceArea = props => {
  const {properties} = props;

  return _map(properties, (value, key) => {
    if (key.includes('service-')) {
      return (
        <div key={key}>
          <Checkbox isChecked={true}>{key}</Checkbox>
        </div>
      );
    }
    return null;
  });
};

ListServiceArea.propTypes = {
  properties: PropTypes.shape({})
};

export default ListServiceArea;
