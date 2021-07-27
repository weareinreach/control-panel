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
import {format, compareAsc} from 'date-fns';

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
  const [lastVerifiedEnd, setLastVerifiedEnd] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [lastUpdatedEnd, setLastUpdatedEnd] = useState('');
  const [createdAt, setCreatedAt] = useState('');
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
      lastUpdated,
      createdAt,
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

  // Date field validators
  const isDateInFuture = (date) => {
    if (!date) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return !(date > today);
  };

  const isDateOlderThan = (date1, date2) => {
    if (!date1 || !date2) {
      return false;
    }
    return !(date2 <= date1);
  };

  const handleChangeRaw = (date) => {
    date.currentTarget.value = format(this.props.input.value, 'MM/dd/yyyy');
    console.log(date);
  };

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
        <Flex mt={[0, '2rem !important']}>
          <Box>
            <Text>Verified Date:</Text>
          </Box>
          <Spacer />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text fontSize="xs">Use Date Range</Text>
            <Switch
              ml={2}
              size="sm"
              id="verified-range"
              onChange={setIsVerifiedDateRange}
            />
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Box fontSize="xs">
            {isVerifiedDateRange ? 'Start Date:' : 'Verified Before:'}
          </Box>
          <Box>
            <DateFieldPicker
              id={lastVerified}
              selected={lastVerified}
              onChange={setLastVerified}
              onChangeRaw={(e) => handleChangeRaw(e)}
              placeholderText={
                isVerifiedDateRange
                  ? 'Select start date'
                  : 'Select verified date'
              }
            />
          </Box>
        </Flex>
        {isVerifiedDateRange && (
          <Flex alignItems="center" justifyContent="space-between">
            <Box fontSize="xs">End Date:</Box>
            <Box>
              <DateFieldPicker
                id={lastVerifiedEnd}
                selected={lastVerifiedEnd}
                onChange={setLastVerifiedEnd}
                placeholderText="Select end date"
              />
            </Box>
          </Flex>
        )}
        <Flex mt={[0, '2rem !important']}>
          <Box>
            <Text>Updated Date:</Text>
          </Box>
          <Spacer />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text fontSize="xs">Use Date Range</Text>
            <Switch
              ml={2}
              size="sm"
              id="updated-range"
              onChange={setIsUpdatedDateRange}
            />
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Box fontSize="xs">
            {isUpdatedDateRange ? 'Start Date:' : 'Updated Before:'}
          </Box>
          <Box>
            <DateFieldPicker
              selected={lastUpdated}
              onChange={setLastUpdated}
              placeholderText={
                isUpdatedDateRange ? 'Select start date' : 'Select updated date'
              }
            />
          </Box>
        </Flex>
        {isUpdatedDateRange && (
          <Flex alignItems="center" justifyContent="space-between">
            <Box fontSize="xs">End Date:</Box>
            <Box>
              <DateFieldPicker
                selected={lastUpdatedEnd}
                onChange={setLastUpdatedEnd}
                placeholderText="Select end date"
              />
            </Box>
          </Flex>
        )}
        <Flex mt={[0, '2rem !important']}>
          <Box>
            <Text>Created Date:</Text>
          </Box>
          <Spacer />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Text fontSize="xs">Use Date Range</Text>
            <Switch
              ml={2}
              size="sm"
              id="created-range"
              onChange={setIsCreatedDateRange}
            />
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Box fontSize="xs">
            {isCreatedDateRange ? 'Start Date:' : 'Created Before:'}
          </Box>
          <Box>
            <DateFieldPicker
              selected={createdAt}
              onChange={setCreatedAt}
              placeholderText={
                isCreatedDateRange ? 'Select start date' : 'Select created date'
              }
            />
          </Box>
        </Flex>
        {isCreatedDateRange && (
          <Flex alignItems="center" justifyContent="space-between">
            <Box fontSize="xs">End Date:</Box>
            <Box>
              <DateFieldPicker
                selected={createdAtEnd}
                onChange={setCreatedAtEnd}
                placeholderText="Select end date"
              />
            </Box>
          </Flex>
        )}
        <br />
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
