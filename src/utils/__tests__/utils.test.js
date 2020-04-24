import {
  getOrgQueryUrls, getSchedule, getUserQueryUrls
} from '../index';

describe('getSchedule', () => {
  it('should combine the start and end', () => {
    const result = getSchedule('start', 'end')

    expect(result).toBe('start - end');
  });
});

describe('getOrgQueryUrls', () => {
  it('should default to no query param', () => {
    const { organizations, count } = getOrgQueryUrls({})

    expect(organizations).toBe('/organizations');
    expect(count).toBe('/organizations/count');
  });

  it('should apply params', () => {
    const { organizations, count } = getOrgQueryUrls({
      name: 'org',
      page: '10',
      pending: 'true',
      properties: 'hello=world,foo=bar',
      serviceArea: 'national',
      tags: ['foo', 'bar', 'baz'],
      tagLocale: 'united_states',
    })
    const query = '&name=org&page=10&pending=true&serviceArea=national&properties=1=e,2=l,3=l,4=o,5==,6=w,7=o,8=r,9=l,10=d,11=,,12=f,13=o,14=o,15==,16=b,17=a,18=r,&tagLocale=united_states&tags=foo,bar,baz';

    expect(organizations).toBe(`/organizations?${query}`);
    expect(count).toBe(`/organizations/count?${query}`);
  });
});


describe('getUserQueryUrls', () => {
  it('should default to no query param', () => {
    // page, type
    const { users, count } = getUserQueryUrls({})

    expect(users).toBe('/users');
    expect(count).toBe('/users/count');
  });

  it('should apply params', () => {
    const { users, count } = getUserQueryUrls({ page: '10', type: 'type' })
    const query = '&page=10&type=type';

    expect(users).toBe(`/users?${query}`);
    expect(count).toBe(`/users/count?${query}`);
  });
});