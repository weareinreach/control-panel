// Dev/Staging config is the base
const base = {
  apiDomain: 'https://catalog-server-api-staging.herokuapp.com',
  apiBasePath: '/asylum_connect/api/v1.0'
};

const local = {
  apiDomain: 'http://127.0.0.1:5000'
};

const prod = {
  apiDomain: 'https://catalog-server-api.herokuapp.com'
};

const env = process.env.REACT_APP_APP_ENV;

export default {
  ...base,
  ...(env === 'local' ? local : {}),
  ...(env === 'prod' ? prod : {})
};
