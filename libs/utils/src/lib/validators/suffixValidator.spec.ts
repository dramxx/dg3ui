import * as cut from './suffixValidator';

describe('suffix validator', () => {
  it('empty name', () => {
    expect(cut.suffixValidator('', '.template.json')).toBeFalsy();
  });
  it('valid suffix .template.json', () => {
    expect(
      cut.suffixValidator('test.template.json', '.template.json')
    ).toBeTruthy();
  });

  it('invalid suffix missing .json', () => {
    expect(cut.suffixValidator('test.template', '.template.json')).toBeFalsy();
  });
});
