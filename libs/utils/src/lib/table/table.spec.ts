import { getCellValue } from '@dg3/utils';

describe('getCellValue for table', () => {
  it('null value', () => {
    expect(getCellValue({ value: null })).toBeNull();
  });
  it('empty string', () => {
    expect(getCellValue({ value: '' })).toEqual('');
  });
  it('array', () => {
    const array = [1, 2, 3];
    expect(getCellValue({ value: array })).toEqual(array);
  });
  it('string', () => {
    expect(getCellValue({ value: 'banana' })).toEqual('banana');
  });
  it('number', () => {
    expect(getCellValue({ value: 2.71 })).toEqual(2.71);
  });
  it('date', () => {
    const date = new Date();
    expect(getCellValue({ value: date })).toEqual(date);
  });
  it('complex value', () => {
    expect(getCellValue({ value: { value: '3+2i' } })).toEqual('3+2i');
  });
});
