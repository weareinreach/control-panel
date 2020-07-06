// Dev/Staging config is the base
const base = {
  apiDomain: 'http://localhost:8080',
  apiBasePath: '/v1',
  catalogUrl: 'http://localhost:8080',
};

const local = {
  apiDomain: 'http://localhost:8080',
};

const prod = {
  // apiDomain: 'https://asylum-connect-api.herokuapp.com',
  // catalogUrl: 'https://asylum-connect-catalog.herokuapp.com',
};

const env = process.env.REACT_APP_APP_ENV;

export default {
  ...base,
  ...(env === 'local' ? local : {}),
  ...(env === 'production' ? prod : {}),
};
