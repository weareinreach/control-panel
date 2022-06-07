// Dev/Staging config is the base
const base = {
  apiDomain: 'https://inreach-api-staging.herokuapp.com',
  apiBasePath: '/v1',
  catalogUrl: 'https://inreach-catalog-staging.herokuapp.com',
};

const local = {
  apiDomain: 'http://localhost:8080',
  apiBasePath: '/v1',
};

const prod = {
  apiDomain: 'https://inreach-api.herokuapp.com',
  catalogUrl: 'https://inreach-catalog.herokuapp.com',
};

const env = process.env.REACT_APP_APP_ENV;
console.log( `Environment Selected: ${env}`)
export default {
  ...base,
  ...(env === 'TEST' ? local : {}),
  ...(env === 'production' ? prod : {}),
};
