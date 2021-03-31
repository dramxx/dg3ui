import * as cut from './kind';

describe('kindAttribute', () => {
  it('kindAttribute valid', () => {
    expect(cut.kindAttribute('model', ['ZCF120ABtFs2'])).toEqual({
      node: {
        kind: {
          attributeValue: {
            did: 'model',
            valueRegex: 'ZCF120ABtFs2',
          },
        },
      },
    });
  });

  it('kindAttribute valid, more values', () => {
    expect(
      cut.kindAttribute('model', ['ZCF120ABtFs2', 'ZCF120ABtFs3'])
    ).toEqual({
      node: {
        kind: {
          attributeValue: {
            did: 'model',
            valueExact: ['ZCF120ABtFs2', 'ZCF120ABtFs3'],
          },
        },
      },
    });
  });
});
