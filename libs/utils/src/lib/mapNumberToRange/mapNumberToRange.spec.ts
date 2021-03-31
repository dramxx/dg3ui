import { mapNumberToRange } from './mapNumberToRange';

describe('mapNumberToRange', () => {
  it('mapNumberToRange 25 0-100 0-1000', () => {
    expect(mapNumberToRange(25, 0, 100, 0, 1000)).toEqual(250);
  });

  it('mapNumberToRange 0 0-100 0-1000', () => {
    expect(mapNumberToRange(0, 0, 100, 0, 1000)).toEqual(0);
  });

  it('mapNumberToRange 100 0-100 0-1000', () => {
    expect(mapNumberToRange(100, 0, 100, 0, 1000)).toEqual(1000);
  });

  it('mapNumberToRange 33 0-100 100-0', () => {
    expect(mapNumberToRange(33, 0, 100, 100, 0)).toEqual(67);
  });

  it('mapNumberToRange 42 0-100 -100-25', () => {
    expect(mapNumberToRange(42, 0, 100, -100, 25)).toEqual(-47.5);
  });
});
