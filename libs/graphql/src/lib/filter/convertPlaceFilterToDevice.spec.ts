import { INSTALLED_AT_TRAVERSAL } from '../Traversals/Traversals';
import * as cut from './convertPlaceFilterToDevice';

describe('convertPlaceFilterToDevice', () => {
  it('one chip', () => {
    const oneChipFilter = {
      AND: [
        {
          node: {
            attributeValue: {
              did: 'information:attribute.city1',
              valueRegex: 'Plzeň',
            },
          },
        },
      ],
    };

    const expectedResult = [
      {
        rels: {
          traversal: INSTALLED_AT_TRAVERSAL,
          toPlace: {
            node: {
              AND: [
                {
                  attributeValue: {
                    did: 'information:attribute.city1',
                    valueRegex: 'Plzeň',
                  },
                },
              ],
            },
          },
        },
      },
    ];

    expect(cut.convertPlaceFilterToDevice(oneChipFilter)).toEqual(
      expectedResult
    );
  });

  it('multiple chips', () => {
    const multipleChipFilter = {
      AND: [
        {
          node: {
            attributeValue: {
              did: 'information:attribute.city1',
              valueExact: ['Plzeň', 'Brno'],
            },
          },
        },
        {
          node: {
            kind: {
              id: 'place:place.secondary_substation',
            },
          },
        },
      ],
    };

    const expectedResult = [
      {
        rels: {
          traversal: INSTALLED_AT_TRAVERSAL,
          toPlace: {
            node: {
              AND: [
                {
                  attributeValue: {
                    did: 'information:attribute.city1',
                    valueExact: ['Plzeň', 'Brno'],
                  },
                },
                {
                  kind: {
                    id: 'place:place.secondary_substation',
                  },
                },
              ],
            },
          },
        },
      },
    ];

    expect(cut.convertPlaceFilterToDevice(multipleChipFilter)).toEqual(
      expectedResult
    );
  });
});
