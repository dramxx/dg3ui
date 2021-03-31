import * as cut from './includeActiveItemInDropdownItems';

const testItems = [
  {
    active: false,
    label: 'first',
    id: 'id1',
  },
  {
    active: false,
    label: 'second',
    id: 'id2',
  },
  {
    active: false,
    label: 'third',
    id: 'id3',
  },
];

describe('includeActiveItemInDropdownItems', () => {
  it('empty array', () => {
    expect(
      cut.includeActiveItemsInDropdownItems([], {
        active: false,
        label: 'label',
        id: 'id',
      })
    ).toEqual([]);
  });

  it('second to be active', () => {
    expect(
      cut.includeActiveItemsInDropdownItems(testItems, {
        active: false,
        label: 'second',
        id: 'id2',
      })
    ).toEqual([
      {
        active: false,
        label: 'first',
        id: 'id1',
      },
      {
        active: true,
        label: 'second',
        id: 'id2',
      },
      {
        active: false,
        label: 'third',
        id: 'id3',
      },
    ]);
  });

  it('none to be active', () => {
    expect(
      cut.includeActiveItemsInDropdownItems(testItems, {
        active: false,
        label: 'first',
        id: 'idXXX',
      })
    ).toEqual([
      {
        active: false,
        label: 'first',
        id: 'id1',
      },
      {
        active: false,
        label: 'second',
        id: 'id2',
      },
      {
        active: false,
        label: 'third',
        id: 'id3',
      },
    ]);
  });
});
