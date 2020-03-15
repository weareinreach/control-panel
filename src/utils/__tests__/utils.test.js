import {getAPIUrl} from '../index';

describe('getAPIUrl', () => {
  it('should return the api url', () => {
    const result = getAPIUrl();

    expect(result).toMatchSnapshot();
  });
});
