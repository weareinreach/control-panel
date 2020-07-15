import _reduce from 'lodash/reduce';
import _set from 'lodash/set';

const initialValueDict = {
  checkbox: false,
  password: '',
  text: '',
};

/**
 * Generate the slug of an item from its name
 * @param  {String} name
 * @return {String} slug
 */
export const generateSlug = (name) =>
  name?.split(' ')?.join('-')?.toLowerCase() || '';

/**
 * Clean the properties and convert all values to string
 * @param  {Object} properties
 * @return {Object} Cleaned object with string values
 */
export const cleanProperties = (properties) => {
  return _reduce(
    properties,
    (result, value, key) => {
      const valueType = typeof value;

      switch (valueType) {
        case 'string':
          break;
        case 'object':
          break;
        case 'boolean':
        case 'number':
          value = value.toString();
          break;
        default:
          value = '';
      }

      if (value && value !== 'false') {
        result[key] = value;
      }

      return result;
    },
    {}
  );
};

/**
 * Loop through the tabs and their nested objects and set values to true
 * @param  {Object} tags
 * @return {Object} Cleaned object
 */
export const cleanTags = (tags) => {
  const nestedReduce = (tagObject) => {
    return _reduce(
      tagObject,
      (result, value, key) => {
        if (typeof value === 'object') {
          result[key] = nestedReduce(value);
        } else if (value === true || value === 'true') {
          result[key] = 'true';
        }

        return result;
      },
      {}
    );
  };

  return nestedReduce(tags);
};

/**
 * Format Organization for submission
 * @param  {Object} organizationInput
 * @return {Object} Formatted input
 */
export const formatOrgInput = (orgInput) => {
  if (orgInput.properties) {
    orgInput.properties = cleanProperties(orgInput.properties);
  }

  if (!orgInput.slug) {
    orgInput.slug = generateSlug(orgInput.name);
  }

  return orgInput;
};

/**
 * Format Service for submission
 * @param  {Object} serviceInput
 * @return {Object} Formatted input
 */
export const formatServiceInput = (serviceInput) => {
  if (serviceInput.properties) {
    serviceInput.properties = cleanProperties(serviceInput.properties);
  }

  if (serviceInput.tags) {
    serviceInput.tags = cleanTags(serviceInput.tags);
  }

  // TODO: Temporarily comment out is_published functionality for services
  serviceInput.is_published = true;

  if (!serviceInput.slug) {
    serviceInput.slug = generateSlug(serviceInput.name);
  }

  // We have to manuallly set since services are sub documents
  serviceInput.updated_at = Date.now();

  return serviceInput;
};

/**
 * For simpler forms this creates the initial values and form inputs
 * @param  {Object} form The form  config
 * @return {Object} The initial values and a list of input configs
 */
export const buildForm = (form = {}) => {
  const {fields = [], initialValues = {}} = form;

  return _reduce(
    fields,
    (values, {key, ...inputInfo}) => {
      values.initialValues[key] = initialValues[key];

      // Apply the defaut if we still don't have a value
      if (
        typeof values.initialValues[key] === 'undefined' &&
        typeof initialValueDict?.[inputInfo?.type] !== 'undefined'
      ) {
        values.initialValues[key] = initialValueDict?.[inputInfo?.type];
      }

      values.fields.push({key, ...inputInfo});

      return values;
    },
    {initialValues, fields: []}
  );
};

/**
 * Convert tags that might be an {} of arrays to {} of objects
 */
export const formatTags = (tags) => {
  return _reduce(
    tags,
    (result, tags, country) => {
      if (Array.isArray(tags)) {
        tags.forEach((tag) => {
          _set(result, `${country}.${tag}`, true);
        });
      } else {
        result[country] = tags;
      }

      return result;
    },
    {}
  );
};
