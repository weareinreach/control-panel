import _omit from 'lodash/omit';
import _reduce from 'lodash/reduce';
import _sortBy from 'lodash/sortBy';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';
import {SectionTitle} from './styles';
import withOrganizations from './WithOrganizations';
import OrganizationAutocomplete from './OrganizationAutocomplete';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
} from '../data/properties.json';
import tagData from '../data/tags.json';
import {useInputChange} from '../utils/hooks';
import DateFieldPicker from './DateFieldPicker';

const propertyList = [
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
]
  .reduce((result, propertyCategory) => {
    result = result.concat(
      propertyCategory
        .filter(({type}) => type === 'checkbox')
        .map(({key}) => key)
    );

    return result;
  }, [])
  .sort();

const tagList = _reduce(
  tagData,
  (result, catagories, country) => {
    const countryTags = _reduce(
      catagories,
      (countryResult, subCatagories, name) => {
        if (Array.isArray(subCatagories)) {
          countryResult = countryResult.concat(
            subCatagories.map((subCategory) => ({
              label: subCategory,
              value: `${name}.${subCategory}`,
            }))
          );
        } else {
          countryResult.push({label: name, value: name});
        }

        return countryResult;
      },
      []
    );

    result[country] = _sortBy(countryTags, 'label');

    return result;
  },
  {}
);

const FiltersOrganizations = (props) => {
  const {
    updateQuery,
    setOrgSelection,
    setOrgQuery,
    onOrgFetchRequested,
    onQueryClearRequested,
    handleBlurOrganizations,
    organizations,
    orgSelection,
    orgQuery,
  } = props;
  const [name, handleNameChange] = useState('');
  const [serviceArea, handleServiceAreaChange] = useInputChange();
  const [tagLocale, setTagLocale] = useInputChange('united_states');
  const [properties, setProperties] = useState({});
  const [isPublished, setPublishedStatus] = useState(true);
  const [tags, setTags] = useState([]);
  const [lastVerified, setLastVerified] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const handlePublishChange = (ev) => setPublishedStatus(ev.target.checked);
  const handleSelect = (type) => (ev) => {
    const value = ev.target.value;

    if (type === 'properties') {
      setProperties({
        ...properties,
        [value]: 'true',
      });
    } else if (type === 'tags') {
      setTags([...tags, value].sort());
    }
  };
  const propertyKeys = Object.keys(properties);
  const removeTag = (index) => {
    const newTags = [...tags];

    newTags.splice(index, 1);

    setTags(newTags);
  };
  const removeProperty = (property) => {
    setProperties(_omit(properties, [property]));
  };
  const handleSearch = (ev) => {
    ev.preventDefault();

    // const query = {name, properties, tags, tagLocale};
    const query = {name, properties, tags, tagLocale, lastVerified, lastUpdated}

    if (serviceArea) {
      query.serviceArea = serviceArea;
    }

    if (!isPublished) {
      query.pending = 'true';
    }

    if (lastVerified) {
      query.lastVerified = new Date(lastVerified).toISOString();
    }

    if (lastUpdated) {
      query.lastUpdated = new Date(lastUpdated).toISOString();
    }

    updateQuery(query);
  };
  useEffect(() => {
    handleNameChange(`${orgSelection?.name}` || '');
  }, [orgSelection]);

  useEffect(() => {
    handleNameChange(`${orgQuery}` || '');
  }, [orgQuery]);
  
  const tagsNames = tags.map((tag) => {
    const [category, subCategory] = tag.split('.');

    return subCategory || category;
  });



  return (
    <form onSubmit={handleSearch}>
      <SectionTitle>Filter Organizations</SectionTitle>
      <Stack>
        <Text>Name:</Text>
        <OrganizationAutocomplete
          setOrgSelection={setOrgSelection}
          setOrgQuery={setOrgQuery}
          onOrgFetchRequested={onOrgFetchRequested}
          onQueryClearRequested={onQueryClearRequested}
          handleBlurOrganizations={handleBlurOrganizations}
          organizations={organizations}
          orgSelection={orgSelection}
          orgQuery={orgQuery}
        />
        <Text>Service Area Coverage:</Text>
        <Input
          onChange={handleServiceAreaChange}
          variant="filled"
          placeholder="Search on a service area"
          value={serviceArea}
        />

        <Text>Last Verified Before:</Text>
        <DateFieldPicker selected={lastVerified} onChange={setLastVerified} />

        <Text>Last Updated Before:</Text>
        <DateFieldPicker selected={lastUpdated} onChange={setLastUpdated} />

        <Text>Publish Status:</Text>
        <Checkbox
          isChecked={isPublished}
          onChange={handlePublishChange}
          type="checkbox"
        >
          Published
        </Checkbox>
        <Text>Properties:</Text>
        <Select
          onChange={handleSelect('properties')}
          variant="filled"
          placeholder="Select a property"
          value=""
        >
          {propertyList.map((prop) => (
            <option key={prop} value={prop}>
              {prop}
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
        <Text>Tags:</Text>
        <Select
          onChange={setTagLocale}
          variant="filled"
          placeholder="Select a country"
          value={tagLocale}
        >
          <option value="united_states">United States</option>
          <option value="canada">Canada</option>
          <option value="mexico">Mexico</option>
        </Select>
        <Select
          onChange={handleSelect('tags')}
          variant="filled"
          placeholder="Select a tag"
          value=""
        >
          {tagList?.[tagLocale]?.map(({label, value}) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        {tagsNames?.map((key, index) => (
          <Checkbox
            key={key}
            defaultIsChecked
            onChange={() => removeTag(index)}
          >
            {key}
          </Checkbox>
        ))}
        <Box textAlign="right">
          <Button
            display="inline-block"
            onClick={handleSearch}
            variantColor="blue"
          >
            Search
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

FiltersOrganizations.propTypes = {
  query: PropTypes.object,
  updateQuery: PropTypes.func,
};

export default withOrganizations(FiltersOrganizations);
