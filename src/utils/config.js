// Dev config is the base
const base = {
  apiDomain: 'https://catalog-server-api-staging.herokuapp.com',
  apiBasePath: '/asylum_connect/api/v1.0'
};

const prod = {
  apiDomain: 'https://catalog-server-api.herokuapp.com'
};

const env = process.env.APP_ENV;

export default {...base, ...(env === 'prod' ? prod : {})};
