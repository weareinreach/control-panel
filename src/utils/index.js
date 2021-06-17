import _reduce from 'lodash/reduce';

import config from './config';

export const CATALOG_API_URL = `${config.apiDomain}${config.apiBasePath}`;
export const COOKIE_LOGIN = 'ac-cookie';
export const USER_TYPE_ADMIN_DM = 'adminDataManager';
export const USER_TYPE_DM = 'dataManager';
export const USER_TYPE_LAWYER = 'lawyer';
export const USER_TYPE_PROVIDER = 'provider';
export const USER_TYPE_SEEKER = 'seeker';

export const getSchedule = (start, end) => {
  if (start || end) {
    return `${start || 'N/A'} - ${end || 'N/A'}`;
  }

  return '';
};

export const scheduleHeaders = [
  {key: 'name', label: 'Name'},
  {
    key: 'monday',
    label: 'Monday',
    getValue: (row) => getSchedule(row.monday_start, row.monday_end),
  },
  {
    key: 'tuesday',
    label: 'Tuesday',
    getValue: (row) => getSchedule(row.tuesday_start, row.tuesday_end),
  },
  {
    key: 'wednesday',
    label: 'Wednesday',
    getValue: (row) => getSchedule(row.wednesday_start, row.wednesday_end),
  },
  {
    key: 'thursday',
    label: 'Thursday',
    getValue: (row) => getSchedule(row.thursday_start, row.thursday_end),
  },
  {
    key: 'friday',
    label: 'Friday',
    getValue: (row) => getSchedule(row.friday_start, row.friday_end),
  },
  {
    key: 'saturday',
    label: 'Saturday',
    getValue: (row) => getSchedule(row.saturday_start, row.saturday_end),
  },
  {
    key: 'sunday',
    label: 'Sunday',
    getValue: (row) => getSchedule(row.sunday_start, row.sunday_end),
  },
  {
    key: 'timezone',
    label: 'Timezone',
    type: 'select',
    placeholder: 'Select a timezone',
    options: [
      {label: 'AKST', value: 'AKST'},
      {label: 'AST', value: 'AST'},
      {label: 'CST', value: 'CST'},
      {label: 'EST', value: 'EST'},
      {label: 'HST', value: 'HST'},
      {label: 'MDT', value: 'MDT'},
      {label: 'MST', value: 'MST'},
      {label: 'NST', value: 'NST'},
      {label: 'PDT', value: 'PDT'},
      {label: 'PST', value: 'PST'},
    ],
  },
  {key: 'note', label: 'Note', type: 'textarea'},
];

export const getOrgQueryUrls = (query) => {
  const {
    name,
    page,
    pending,
    properties,
    serviceArea,
    tags,
    tagLocale,
    verified,
    lastVerified,
    lastVerifiedEnd,
    lastUpdated,
    lastUpdatedEnd,
  } = query;
  let queryParam = '?';

  if (name) {
    queryParam += `&name=${name}`;
  }

  if (page) {
    queryParam += `&page=${page}`;
  }

  if (pending) {
    queryParam += '&pending=true';
  }

  if (verified) {
    queryParam += '&verified=true';
  }

  if (lastVerified) {
    queryParam += `&lastVerified=${lastVerified}`;
  }

  if (lastVerifiedEnd) {
    queryParam += `&lastVerifiedEnd=${lastVerifiedEnd}`;
  }

  if (lastUpdated) {
    queryParam += `&lastUpdated=${lastUpdated}`;
  }

  if (lastUpdatedEnd) {
    queryParam += `&lastUpdatedEnd=${lastUpdatedEnd}`;
  }

  if (serviceArea) {
    queryParam += `&serviceArea=${serviceArea}`;
  }

  if (properties && Object.keys(properties).length > 0) {
    const propString = _reduce(
      properties,
      (result, value, key) => {
        if (key && value) {
          result += `${key}=${value},`;
        }

        return result;
      },
      ''
    );

    if (propString) {
      queryParam += `&properties=${propString}`;
    }
  }

  if (tagLocale && tags?.length > 0) {
    queryParam += `&tagLocale=${tagLocale}&tags=${tags.join(',')}`;
  }

  return {
    organizations: `/organizations${queryParam === '?' ? '' : queryParam}`,
    count: `/organizations/count${queryParam === '?' ? '' : queryParam}`,
  };
};

export const getServiceQueryUrls = (query) => {
  const {serviceArea, verified} = query;
  let queryParam = '?';

  if (verified) {
    queryParam += '&verified=true';
  }

  if (serviceArea) {
    queryParam += `&serviceArea=${serviceArea}`;
  }

  return {
    count: `/services/count${queryParam === '?' ? '' : queryParam}`,
  };
};

// TODO: add to utils and test
export const getUserQueryUrls = (query) => {
  const {page, type} = query;
  let queryParam = '?';

  if (page) {
    queryParam += `&page=${page}`;
  }

  if (type) {
    queryParam += `&type=${type}`;
  }

  return {
    users: `/users${queryParam === '?' ? '' : queryParam}`,
    count: `/users/count${queryParam === '?' ? '' : queryParam}`,
  };
};
