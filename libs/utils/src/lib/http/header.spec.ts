import * as cut from './header';

describe('HTTP header utils', () => {
  it('headers', () => {
    expect(cut.headers({ a: 'aa' }, { b: 'bb' })).toEqual({
      a: 'aa',
      b: 'bb',
    });
  });

  it('lang', () => {
    expect(cut.lang('cs')).toEqual({
      'Accept-Language': 'cs',
    });
  });

  it('accept', () => {
    expect(cut.accept('json')).toEqual({
      Accept: 'application/json;charset=UTF-8',
    });
  });

  it('contentType', () => {
    expect(cut.contentType('json')).toEqual({
      'Content-Type': 'application/json;charset=UTF-8',
    });
  });
});
