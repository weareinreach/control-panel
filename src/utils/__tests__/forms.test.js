import {generateSlug} from '../forms';

describe('generateSlug', () => {
  it('should default to empty', () => {
    const result = generateSlug();
    const resultTwo = generateSlug('');

    expect(result).toEqual('');
    expect(resultTwo).toEqual('');
  });

  it('should generate the slug', () => {
    const result = generateSlug('hello world');
    const resultTwo = generateSlug('foo');

    expect(result).toEqual('hello-world');
    expect(resultTwo).toEqual('foo');
  });
});
