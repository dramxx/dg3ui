import * as cut from './node';

describe('gql node entity properties get tests', () => {
  it('nodeKind valid', () => {
    expect(cut.nodeKind(['CXPSGCON200'])).toEqual({
      node: {
        kind: {
          id: ['CXPSGCON200'],
        },
      },
    });
  });

  it('nodeAttribute valid', () => {
    expect(cut.nodeAttribute('device_lifecycle_phase', ['v produkci'])).toEqual(
      {
        node: {
          attributeValue: {
            did: 'device_lifecycle_phase',
            valueRegex: 'v produkci',
          },
        },
      }
    );
  });

  it('nodeAttribute valid, more values', () => {
    expect(cut.nodeAttribute('device_lifecycle_phase', ['v produkci', 'na skladu'])).toEqual(
      {
        node: {
          attributeValue: {
            did: 'device_lifecycle_phase',
            valueExact: ['v produkci', 'na skladu'],
          },
        },
      }
    );
  });
});
