import config from './config';

export const getAPIUrl = () => {
  return `${config.apiDomain}${config.apiBasePath}`;
};
