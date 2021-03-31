import { FilterChip } from '@dg3/types';
import * as cut from './convertContentFilter';

describe('convertContentFilter', () => {
  it('convertContentFilter empty', () => {
    expect(cut.getCoreElContentFilterByKey([])).toEqual({ AND: [] });
  });

  it('convertContentFilter one chip', () => {
    const chips: Array<FilterChip> = [
      {
        id: '1',
        coreEl: 'DEVICE',
        type: 'EXPERT',
        label: 'test',
        value: `{"node": {
                     "attributeValue": {
                        "did": "ckod",
                        "valueRegex": "100103"
                     }
                  }}`,
      },
    ];

    expect(cut.getCoreElContentFilterByKey(chips)).toEqual({
      AND: [
        {
          node: {
            attributeValue: {
              did: 'ckod',
              valueRegex: '100103',
            },
          },
        },
      ],
    });
  });

  it('convertContentFilter one chip not equal', () => {
    const chips: Array<FilterChip> = [
      {
        id: '_01dmo8che',
        label: 'druh = NP71E.1',
        coreEl: 'DEVICE',
        type: 'SIMPLE',
        value: `{
          "entitySelection":"DEVICE",
          "attributeSelection":"kind",
          "relationalOperator":"NOT_EQUAL",
          "values":[
            {"id":"device:device.ptb-2.NP71E1",
              "name":"NP71E.1"}
          ]
        }`,
      },
    ];
    expect(cut.getCoreElContentFilterByKey(chips)).toEqual({
      AND: [
        {
          NOT: {
            node: {
              kind: {
                id: ['device:device.ptb-2.NP71E1'],
              },
            },
          },
        },
      ],
    });
  });

  it('convertContentFilter two chips', () => {
    const chips: Array<FilterChip> = [
      {
        id: '1',
        coreEl: 'DEVICE',
        type: 'EXPERT',
        label: 'test',
        value: `{"node": {
                     "attributeValue": {
                        "did": "ckod",
                        "valueRegex": "100103"
                     }
                  }}`,
      },
      {
        id: '2',
        coreEl: 'DEVICE',
        type: 'EXPERT',
        label: 'test2',
        value: `{      "node": {
                   "kind": {
                      "id": "LZQJXC"
                    }
                }}`,
      },
    ];

    expect(cut.getCoreElContentFilterByKey(chips)).toEqual({
      AND: [
        {
          node: {
            attributeValue: {
              did: 'ckod',
              valueRegex: '100103',
            },
          },
        },
        {
          node: {
            kind: {
              id: 'LZQJXC',
            },
          },
        },
      ],
    });
  });
});
