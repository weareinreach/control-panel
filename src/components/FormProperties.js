import PropTypes from 'prop-types';
import React from 'react';
import {Divider, Stack} from '@chakra-ui/core';

import FormField from './FormField';
import {SectionTitle} from './styles';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
} from '../data/properties.json';

const FormTags = (props) => {
  const {formik} = props;

  return (
    <Stack space={4}>
      <Divider />
      <SectionTitle>Cost Properties</SectionTitle>
      <Stack space={4}>
        {costProperties.map(({key, ...rest}) => (
          <FormField
            key={key}
            fieldKey={`properties.${key}`}
            formik={formik}
            {...rest}
          />
        ))}
      </Stack>
      <Divider />
      <SectionTitle>Community Properties</SectionTitle>
      <Stack space={4}>
        {communityProperties.map(({key, ...rest}) => (
          <FormField
            key={key}
            fieldKey={`properties.${key}`}
            formik={formik}
            {...rest}
          />
        ))}
      </Stack>
      <Divider />
      <SectionTitle>Eligibility / Requirement Properties</SectionTitle>
      <Stack space={4}>
        {eligibilityRequirementProperties.map(({key, ...rest}) => (
          <FormField
            key={key}
            fieldKey={`properties.${key}`}
            formik={formik}
            {...rest}
          />
        ))}
      </Stack>
      <Divider />
      <SectionTitle>Language Properties</SectionTitle>
      <Stack space={4}>
        {languageProperties.map(({key, ...rest}) => (
          <FormField
            key={key}
            fieldKey={`properties.${key}`}
            formik={formik}
            {...rest}
          />
        ))}
      </Stack>
      <Divider />
      <SectionTitle>Additional Information Properties</SectionTitle>
      <Stack space={4}>
        {additionalInformationProperties.map(({key, ...rest}) => (
          <FormField
            key={key}
            fieldKey={`properties.${key}`}
            formik={formik}
            {...rest}
          />
        ))}
      </Stack>
    </Stack>
  );
};

FormTags.propTypes = {
  country: PropTypes.string,
  formik: PropTypes.shape({}),
  initialTags: PropTypes.shape({}),
};

export default FormTags;
