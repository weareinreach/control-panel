import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import {Checkbox, Stack, Text} from '@chakra-ui/core';

const ListProperties = props => {
  const {list, properties} = props;

  return (
    <Stack space={4}>
      {_map(list, ({key, type}) => {
        const value = properties[key];

        if (value) {
          if (type === 'checkbox') {
            console.log('check box', value === true || value === 'true');
            console.log('check box check 1', value === true);
            console.log('check box check 2', value === 'true');

            return (
              <Checkbox
                key={key}
                isChecked={value === true || value === 'true'}
              >
                {key}
              </Checkbox>
            );
          }

          return (
            <Text>
              {key}: {value}
            </Text>
          );
        }
      })}
    </Stack>
  );
};

ListProperties.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()),
  properties: PropTypes.shape()
};

export default ListProperties;

export const ListServiceArea = props => {
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
