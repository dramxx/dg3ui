describe('ConvertObjectToSingleQuotedString', () => {
  it('ConvertObjectToSingleQuotedString empty object', () => {
    expect([]).toEqual([]);
  });

  it('ConvertObjectToSingleQuotedString filled array', () => {
    expect(['TEST', 'SYSTEM']).toEqual(['TEST', 'SYSTEM']);
  });
});
