import { isJsonPathValue } from './isJsonPathValue';

describe('isJsonPathValue', () => {
  it('empty value', () => {
    expect(isJsonPathValue('')).toEqual(false);
  });

  it('undefined value', () => {
    expect(isJsonPathValue(undefined)).toEqual(false);
  });

  it('string value', () => {
    expect(isJsonPathValue('id')).toEqual(false);
  });

  it('jsonPath value', () => {
    expect(isJsonPathValue('$.places[*]')).toEqual(true);
  });
});
