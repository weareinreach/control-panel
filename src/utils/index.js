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
      { label: 'AKST', value: 'AKST' },
      { label: 'AST', value: 'AST' },
      { label: 'CDT', value: 'CDT' },
      { label: 'CST', value: 'CST' },
      { label: 'EDT', value: 'EDT' },
      { label: 'EST', value: 'EST' },
      { label: 'HST', value: 'HST' },
      { label: 'MDT', value: 'MDT' },
      { label: 'MST', value: 'MST' },
      { label: 'NST', value: 'NST' },
      { label: 'PDT', value: 'PDT' },
      { label: 'PST', value: 'PST' },
    ],
  },
  {key: 'note', label: 'Note', type: 'textarea'},
];

export const getOrgQueryUrls = (query) => {
  const {
    name,
    page,
    pending,
    pendingOwnership,
    properties,
    serviceArea,
    tags,
    tagLocale,
    verified,
    lastVerified,
    lastVerifiedStart,
    lastVerifiedEnd,
    lastUpdated,
    lastUpdatedStart,
    lastUpdatedEnd,
    createdAt,
    createdAtStart,
    createdAtEnd,
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

  if (pendingOwnership) {
    queryParam += '&pendingOwnership=true';
  }

  if (verified) {
    queryParam += '&verified=true';
  }

  /*** lastVerified date values ***/
  if (lastVerified) {
    queryParam += `&lastVerified=${lastVerified}`;
  }

  //if lastVerifiedStart date is specified, make sure lastVerifiedEnd date is also specified, if not, set it to the start date
  if (lastVerifiedStart) {
    queryParam += `&lastVerifiedStart=${lastVerifiedStart}`;

    if (lastVerifiedEnd) {
    queryParam += `&lastVerifiedEnd=${lastVerifiedEnd}`;
    }else{
      queryParam += `&lastVerifiedEnd=${lastVerifiedStart}`;
    }
  }

  //if lastVerifiedEnd date is specified, make sure lastVerifiedStart date is also specified, if not, set it to the end date
  if (lastVerifiedEnd) {
    queryParam += `&lastVerifiedEnd=${lastVerifiedEnd}`;

    if (lastVerifiedStart) {
    queryParam += `&lastVerifiedStart=${lastVerifiedStart}`;
    }else{
      queryParam += `&lastVerifiedStart=${lastVerifiedEnd}`;
    }
  }

  /*** lastUpdated date values ***/
  if (lastUpdated) {
    queryParam += `&lastUpdated=${lastUpdated}`;
  }
  
  //if lastUpdatedStart date is specified, make sure lastUpdatedEnd date is also specified, if not, set it to the start date
  if (lastUpdatedStart) {
    queryParam += `&lastUpdatedStart=${lastUpdatedStart}`;
      if (lastUpdatedEnd) {
        queryParam += `&lastUpdatedEnd=${lastUpdatedEnd}`;
      }else{
        queryParam += `&lastUpdatedEnd=${lastUpdatedStart}`;
      }
  }

  //if lastUpdatedEnd date is specified, make sure lastUpdatedStart date is also specified, if not, set it to the end date
  if (lastUpdatedEnd) {
    queryParam += `&lastUpdatedEnd=${lastUpdatedEnd}`;
     if (lastUpdatedStart) {
        queryParam += `&lastUpdatedStart=${lastUpdatedStart}`;
     }else {
        queryParam += `&lastUpdatedStart=${lastUpdatedEnd}`;
     }
  }

  /*** createdAt date values ***/
  if (createdAt) {
    queryParam += `&createdAt=${createdAt}`;
  }

  //if createdAtStart date is specified, make sure createdAtEnd date is also specified, if not, set it to the start date
  if (createdAtStart) {
    queryParam += `&createdAtStart=${createdAtStart}`;
    if (createdAtEnd) {
      queryParam += `&createdAtEnd=${createdAtEnd}`;
    }else{
      queryParam += `&createdAtEnd=${createdAtStart}`
    }
  }

  //if createdAtEnd date is specified, make sure createdAtStart date is also specified, if not, set it to the end date
  if (createdAtEnd) {
    queryParam += `&createdAtEnd=${createdAtEnd}`;
    if (createdAtStart) {
      queryParam += `&createdAtStart=${createdAtStart}`;
    }else{
      queryParam += `&createdAtStart=${createdAtEnd}`;
    }
  }

  if (Array.isArray(serviceArea) && serviceArea.length > 0) {
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
