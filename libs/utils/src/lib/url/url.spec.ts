import * as cut from './url';

describe('HTTP header utils', () => {
  it('path', () => {
    expect(cut.path(['a', 'b', 'c'])).toBe('/a/b/c');
  });

  it('path removes multiple slashes', () => {
    expect(cut.path(['/a//', '/b', '/c'])).toBe('/a/b/c');
  });

  it('query', () => {
    const params = {
      a: '1',
      b: '2',
    };

    expect(cut.query(params)).toBe('?a=1&b=2');
  });

  it('url', () => {
    const result = cut.url('https', 'seznam.cz', '80', ['search', 'a'], {
      phrase: 'abc',
      page: '1',
    });

    expect(result).toBe('https://seznam.cz:80/search/a?phrase=abc&page=1');
  });

  it('url empty segments', () => {
    const result = cut.url('https', 'seznam.cz', '80', [], {
      phrase: 'abc',
      page: '1',
    });

    expect(result).toBe('https://seznam.cz:80/?phrase=abc&page=1');
  });
});
