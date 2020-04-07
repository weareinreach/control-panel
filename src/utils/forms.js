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
        case 'boolean':
        case 'number':
          value.toString();
          break;
        default:
          value = '';
      }

      result[key] = value;

      return result;
    },
    {}
  );
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
  return _reduce(
    form,
    (values, {initialValue, ...inputInfo}, key) => {
      values.initialValues[key] = initialValue;

      // Apply the defaut if we still don't have a value
      if (
        typeof values.initialValues[key] === 'undefined' &&
        typeof initialValueDict?.[inputInfo?.type] !== 'undefined'
      ) {
        values.initialValues[key] = initialValueDict?.[inputInfo?.type];
      }

      values.inputs.push({...inputInfo, key});

      return values;
    },
    {initialValues: {}, inputs: []}
  );
};

export const getOrgInitialValues = (initialValues) => {
  return {
    alert_message: initialValues?.alert_message || '',
    description: initialValues?.description || '',
    emails: initialValues?.emails || [],
    is_published: initialValues?.is_published || false,
    locations: initialValues?.locations || [],
    name: initialValues?.name || '',
    phones: initialValues?.phones || [],
    properties: initialValues?.properties || {},
    schedules: initialValues?.schedules || [],
    slug: initialValues?.slug || '',
    website: initialValues?.website || '',
  };
};

export const getServiceInitialValues = (initialValues) => {
  let tags = {};

  if (initialValues?.tags) {
    tags = _reduce(
      initialValues?.tags,
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
  }

  return {
    access_instructions: initialValues?.access_instructions || [],
    description: initialValues?.description || '',
    email_id: initialValues?.email_id || '',
    is_published: initialValues?.is_published || false,
    location_id: initialValues?.location_id || '',
    name: initialValues?.name || '',
    phone_id: initialValues?.phone_id || '',
    properties: initialValues?.properties || {},
    schedule_id: initialValues?.schedule_id || '',
    services: initialValues?.services || [],
    slug: initialValues?.slug || '',
    tags,
  };
};
