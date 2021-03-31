import * as cut from './convertImportIntoJsonLines';

describe('convertImportCsvIntoJsonLines', () => {
  const csvContent =
    'idDid;ckod;device_lifecycle_phase;device_maintenance_status\nckod;9085520000030052;device_deactivated;test\nckod;9045030015393095;device_deactivated;test\nckod;9025030015352806;device_deactivated;test\nckod;9085520000010005;device_deactivated;test\nckod;9055010003936462;device_deactivated;test';

  it('validCsv', () => {
    expect(cut.convertImportCsvIntoJsonLines(csvContent)).toBe(
      'UPDATE_INSTANCE:\n' +
        '{"id":{"information:attribute.ckod":"9085520000030052"},"information:attribute.device_lifecycle_phase":"device_deactivated","information:attribute.device_maintenance_status":"test"}\n' +
        '{"id":{"information:attribute.ckod":"9045030015393095"},"information:attribute.device_lifecycle_phase":"device_deactivated","information:attribute.device_maintenance_status":"test"}\n' +
        '{"id":{"information:attribute.ckod":"9025030015352806"},"information:attribute.device_lifecycle_phase":"device_deactivated","information:attribute.device_maintenance_status":"test"}\n' +
        '{"id":{"information:attribute.ckod":"9085520000010005"},"information:attribute.device_lifecycle_phase":"device_deactivated","information:attribute.device_maintenance_status":"test"}\n' +
        '{"id":{"information:attribute.ckod":"9055010003936462"},"information:attribute.device_lifecycle_phase":"device_deactivated","information:attribute.device_maintenance_status":"test"}\n'
    );
  });
});
