import config from './config';

export const CATALOG_API_URL = `${config.apiDomain}${config.apiBasePath}`;
export const COOKIE_LOGIN = 'ac-cookie';

const getSchedule = (start, end) => {
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
