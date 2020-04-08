import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import {Checkbox, Divider, Stack, Text} from '@chakra-ui/core';

const noChange = () => null;

const ListProperties = (props) => {
  const {list, properties = {}} = props;

  return (
    <Stack space={4}>
      {_map(list, ({key, type}) => {
        const value = properties[key];

        if (value) {
          if (type === 'checkbox') {
            return (
              <Checkbox
                key={key}
                isChecked={value === true || value === 'true'}
                onChange={noChange}
              >
                {key}
              </Checkbox>
            );
          }

          return (
            <Text key={key}>
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
  properties: PropTypes.shape(),
};

export default ListProperties;

export const ListServiceArea = (props) => {
  const {properties} = props;

  return _map(properties, (value, key) => {
    if (key.includes('service-')) {
      return (
        <div key={key}>
          <Checkbox isChecked onChange={noChange}>
            {key}
          </Checkbox>
        </div>
      );
    }
    return null;
  });
};

ListServiceArea.propTypes = {
  properties: PropTypes.shape({}),
};

export const ListTags = (props) => {
  const {items} = props;
  const renderList = (list) => {
    return _map(list, (value, key) => {
      if (typeof value === 'object') {
        return (
          <div key={key}>
            <Divider marginBottom={4} />
            <Text>{key}</Text>
            {renderList(value)}
          </div>
        );
      }

      return (
        <div key={key}>
          <Checkbox isChecked onChange={noChange}>
            {key}
          </Checkbox>
        </div>
      );
    });
  };

  return renderList(items);
};

ListTags.propTypes = {
  items: PropTypes.shape({}),
};
