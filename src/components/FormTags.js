import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Divider, Stack, Text} from '@chakra-ui/core';

import FormField from './FormField';
import tagList from '../data/tags.json';

const FormTags = (props) => {
  const {country, formik} = props;
  const categories = tagList[country] || '';

  return (
    <Stack space={4}>
      {_map(categories, (subcategories, category, tagIndex) => (
        <Fragment key={category}>
          <Text marginTop={4}>
            <strong>{category}</strong>
          </Text>
          <Divider marginBottom={4} />
          <Stack space={4}>
            {subcategories.length > 0 ? (
              subcategories.map((subCatgory) => (
                <FormField
                  key={subCatgory}
                  fieldKey={`tags.${country}.${category}.${subCatgory}`}
                  formik={formik}
                  label={subCatgory}
                  type="checkbox"
                />
              ))
            ) : (
              <FormField
                fieldKey={`tags.${country}.${category}`}
                formik={formik}
                label={category}
                type="checkbox"
              />
            )}
          </Stack>
        </Fragment>
      ))}
    </Stack>
  );
};

FormTags.propTypes = {
  country: PropTypes.string,
  formik: PropTypes.shape({}),
  initialTags: PropTypes.shape({}),
};

export default FormTags;
