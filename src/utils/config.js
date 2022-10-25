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

const vercelProd = {
  apiDomain: 'https://inreach-api-v1.vercel.app',
  catalogUrl: 'https://inreach-v1.vercel.app',
};
const vercelPreview = {
  apiDomain: 'https://inreach-api-v1-git-dev-weareinreach.vercel.app',
  catalogUrl: 'https://inreach-v1-git-dev-weareinreach.vercel.app',
};

const env = process.env.REACT_APP_APP_ENV;
console.log(`Environment Selected: ${env}`);
const urlInfo = {
  ...base,
  ...(env === 'TEST' ? local : {}),
  ...(env === 'production' ? prod : {}),
  ...(process.env.REACT_APP_VERCEL_ENV === 'production' ? vercelProd : {}),
  ...(process.env.REACT_APP_VERCEL_ENV === 'preview' ? vercelPreview : {}),
};

export default urlInfo;
