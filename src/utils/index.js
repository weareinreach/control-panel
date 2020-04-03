import _reduce from 'lodash/reduce';

import config from './config';

export const CATALOG_API_URL = `${config.apiDomain}${config.apiBasePath}`;
export const COOKIE_LOGIN = 'ac-cookie';

const initialValueDict = {
  checkbox: false,
  password: '',
  text: '',
};

export const buildForm = (form = {}) => {
  return _reduce(
    form,
    (values, {initialValue, ...inputInfo}, key) => {
      values.initialValues[key] = initialValue || '';

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
