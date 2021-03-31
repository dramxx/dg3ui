import { ColumnConf, TableDataObject } from '@dg3/types';

export const exportTable = (
  columnsConf: Array<ColumnConf>,
  data: Array<TableDataObject>,
  filename?: string
) => {
  const csvHeader = columnsConf.map((column) => column.Header).join(';');
  const csvRows = data
    .map((row) =>
      columnsConf.map((column) => row[column.accessor].value).join(';')
    )
    .join('\n');

  const blob = new Blob([csvHeader + '\n' + csvRows], {
    type: 'text/csv;charset=utf-8',
  });

  var blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', blobUrl);
  link.setAttribute('download', `${filename || 'tableExport'}.csv`);
  if (document && document.body) {
    document.body.appendChild(link);
    link.click();
  }
  link.remove();
  URL.revokeObjectURL(blobUrl);
};
