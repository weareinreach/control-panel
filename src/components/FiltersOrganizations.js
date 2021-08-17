import _omit from 'lodash/omit';
import _reduce from 'lodash/reduce';
import _sortBy from 'lodash/sortBy';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Select,
  Spacer,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
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
import {useToggle} from '../utils/hooks';

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
  const [lastVerifiedStart, setLastVerifiedStart] = useState('');
  const [lastVerifiedEnd, setLastVerifiedEnd] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [lastUpdatedStart, setLastUpdatedStart] = useState('');
  const [lastUpdatedEnd, setLastUpdatedEnd] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [createdAtStart, setCreatedAtStart] = useState('');
  const [createdAtEnd, setCreatedAtEnd] = useState('');
  const [isVerifiedDateRange, setIsVerifiedDateRange] = useToggle(false);
  const [isUpdatedDateRange, setIsUpdatedDateRange] = useToggle(false);
  const [isCreatedDateRange, setIsCreatedDateRange] = useToggle(false);

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

    const query = {
      name,
      properties,
      tags,
      tagLocale,
      lastVerified,
      lastVerifiedStart,
      lastVerifiedEnd,
      lastUpdated,
      lastUpdatedStart,
      lastUpdatedEnd,
      createdAt,
      createdAtStart,
      createdAtEnd,
    };

    if (serviceArea) {
      query.serviceArea = serviceArea;
    }

    if (!isPublished) {
      query.pending = 'true';
    }

    if (lastVerified) {
      query.lastVerified = new Date(lastVerified).toISOString();
    }

    if (lastVerifiedStart) {
      query.lastVerifiedStart = new Date(lastVerifiedStart).toISOString();
    }

    if (lastVerifiedEnd) {
      query.lastVerifiedEnd = new Date(lastVerifiedEnd).toISOString();
    }

    if (lastUpdated) {
      query.lastUpdated = new Date(lastUpdated).toISOString();
    }

    if (lastUpdatedEnd) {
      query.lastUpdatedEnd = new Date(lastUpdatedEnd).toISOString();
    }

    if (createdAt) {
      query.createdAt = new Date(createdAt).toISOString();
    }

    if (createdAtEnd) {
      query.createdAtEnd = new Date(createdAtEnd).toISOString();
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

  const handleVerifiedDateRange = () => {
    setLastVerified('');
    setLastVerifiedStart('');
    setLastVerifiedEnd('');
    setIsVerifiedDateRange(!isVerifiedDateRange);
  };

  const handleUpdatedDateRange = () => {
    setLastUpdated('');
    setLastUpdatedStart('');
    setLastUpdatedEnd('');
    setIsUpdatedDateRange(!isUpdatedDateRange);
  };

  const handleCreatedDateRange = () => {
    setCreatedAt('');
    setCreatedAtStart('');
    setCreatedAtEnd('');
    setIsCreatedDateRange(!isCreatedDateRange);
  };

  return (
    <form onSubmit={handleSearch}>
      <SectionTitle>Filter Organizations</SectionTitle>
      <Stack data-test-id="filter-organizations-box">
        <Text data-test-id="filter-name-label">Name:</Text>
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
        <Text data-test-id="filter-service-area-label" >Service Area Coverage:</Text>
        <Input
          data-test-id="filter-service-area-input"
          onChange={handleServiceAreaChange}
          variant="filled"
          placeholder="Search on a service area"
          value={serviceArea}
        />

        <Flex mt={[0, '2rem !important']}>
          <Box>
            <Text data-test-id="filter-last-verified-label">Last Verified:</Text>
          </Box>
          <Spacer/>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text  data-test-id="filter-use-date-range-label" fontSize="xs">Use Date Range</Text>
            <Switch
              data-test-id="filter-last-verified-switch"
              ml={2}
              size="sm"
              id="verified-range"
              onChange={handleVerifiedDateRange}
            />
          </Box>
        </Flex>
        {isVerifiedDateRange ? (
          <Flex alignItems="center" justifyContent="space-evenly">
            <Box mr={2}>
              <Text data-test-id="filter-start-date-label" fontSize="xs">Start Date:</Text>
              <DateFieldPicker
                data-test-id="filter-start-date-field-picker"
                id={lastVerifiedStart}
                maxDate={new Date()}
                onChange={setLastVerifiedStart}
                placeholderText={'Select start date'}
                popperPlacement={'bottom-end'}
                selected={lastVerifiedStart}
              />
            </Box>
            <Box>
              <Text data-test-id="filter-end-date-label" fontSize="xs">End Date:</Text>
              <DateFieldPicker
                data-test-id="filter-end-date-field-picker"
                id={lastVerifiedEnd}
                minDate={lastVerifiedStart}
                maxDate={new Date()}
                onChange={setLastVerifiedEnd}
                placeholderText="Select end date"
                popperPlacement={'bottom-end'}
                selected={lastVerifiedEnd}
              />
            </Box>
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontSize="xs" data-test-id="filter-last-verified-label">Last verified before:</Text>
            </Box>
            <Box>
              <DateFieldPicker
                data-test-id="filter-last-verified-picker"
                id={lastVerified}
                maxDate={new Date()}
                selected={lastVerified}
                onChange={setLastVerified}
                placeholderText={'Select a date'}
                popperPlacement={'bottom-end'}
              />
            </Box>
          </Flex>
        )}
        <Flex mt={[0, '2rem !important']}>
          <Box>
            <Text data-test-id="filter-last-updated-label">Last Updated:</Text>
          </Box>
          <Spacer />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text data-test-id="filter-use-date-range-label" fontSize="xs">Use Date Range</Text>
            <Switch
              data-test-id="filter-last-updated-switch"
              ml={2}
              size="sm"
              id="verified-range"
              onChange={handleUpdatedDateRange}
            />
          </Box>
        </Flex>
        {isUpdatedDateRange ? (
          <Flex alignItems="center" justifyContent="space-evenly">
            <Box mr={2}>
              <Text data-test-id="filter-start-date-label" fontSize="xs">Start Date:</Text>
              <DateFieldPicker
                data-test-id="filter-start-date-picker"
                id={lastUpdatedStart}
                maxDate={new Date()}
                onChange={setLastUpdatedStart}
                placeholderText={'Select start date'}
                popperPlacement={'bottom-end'}
                selected={lastUpdatedStart}
              />
            </Box>
            <Box>
              <Text data-test-id="filter-end-date-label" fontSize="xs">End Date:</Text>
              <DateFieldPicker
                data-test-id="filter-end-date-picker"
                id={lastUpdatedEnd}
                minDate={lastUpdatedStart}
                maxDate={new Date()}
                onChange={setLastUpdatedEnd}
                placeholderText="Select end date"
                popperPlacement={'bottom-end'}
                selected={lastUpdatedEnd}
              />
            </Box>
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontSize="xs" data-test-id="filter-last-updated-date-label">Last updated before:</Text>
            </Box>
            <Box>
              <DateFieldPicker
                data-test-id="filter-last-updated-picker"
                id={lastUpdated}
                maxDate={new Date()}
                selected={lastUpdated}
                onChange={setLastUpdated}
                placeholderText={'Select a date'}
                popperPlacement={'bottom-end'}
              />
            </Box>
          </Flex>
        )}
        <Flex mt={[0, '2rem !important']}>
          <Box>
            <Text data-test-id="filter-created-label">Created At:</Text>
          </Box>
          <Spacer />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text fontSize="xs" data-test-id="filter-date-range-label">Use Date Range</Text>
            <Switch
              data-test-id="filter-date-range-switch"
              ml={2}
              size="sm"
              id="verified-range"
              onChange={handleCreatedDateRange}
            />
          </Box>
        </Flex>
        {isCreatedDateRange ? (
          <Flex alignItems="center" justifyContent="space-evenly">
            <Box mr={2}>
              <Text fontSize="xs" data-test-id="filter-start-date-label">Start Date:</Text>
              <DateFieldPicker
                id={createdAtStart}
                maxDate={new Date()}
                onChange={setCreatedAtStart}
                placeholderText={'Select start date'}
                popperPlacement={'bottom-end'}
                selected={createdAtStart}
              />
            </Box>
            <Box>
              <Text fontSize="xs" data-test-id="filter-end-date-label">End Date:</Text>
              <DateFieldPicker
                id={createdAtEnd}
                minDate={createdAtStart}
                maxDate={new Date()}
                onChange={setCreatedAtEnd}
                placeholderText="Select end date"
                popperPlacement={'bottom-end'}
                selected={createdAtEnd}
              />
            </Box>
          </Flex>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontSize="xs" data-test-id="filter-created-before-label">Created before:</Text>
            </Box>
            <Box>
              <DateFieldPicker
                data-test-id="filter-created-before-picker"
                id={createdAt}
                maxDate={new Date()}
                selected={createdAt}
                onChange={setCreatedAt}
                placeholderText={'Select a date'}
                popperPlacement={'bottom-end'}
              />
            </Box>
          </Flex>
        )}

        <Text mt={[0, '2rem !important']} data-test-id="filter-publish-status-label">Publish Status:</Text>
        <Checkbox
          data-test-id="filter-publish-status-switch"
          isChecked={isPublished}
          onChange={handlePublishChange}
          type="checkbox"
        >
          Published
        </Checkbox>
        <Text data-test-id="filter-properties-label">Properties:</Text>
        <Select
          data-test-id="filter-drop-down-property"
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
        <Text data-test-id="filter-tags-label">Tags:</Text>
        <Select
          data-test-id="filter-drop-down-tags-country"
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
         data-test-id="filter-drop-down-tags"
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
            data-test-id="filter-button-search"
            display="inline-block"
            onClick={handleSearch}
            colorScheme="blue"
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
