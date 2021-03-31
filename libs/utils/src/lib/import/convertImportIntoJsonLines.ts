import { isEmpty } from 'ramda';

export const convertImportCsvIntoJsonLines = (csvContent: string): string => {
  const lines = csvContent.split(/[\r\n]+/).filter((line) => !isEmpty(line));

  const headers = lines[0].split(';');
  // remove header line from lines for next processing
  lines.shift();

  return lines.reduce((acc, line) => {
    const columns = line.split(';');
    const ID_COLUMNS_SIZE = 2;
    const lineObj = {
      id: { [`information:attribute.${columns[0]}`]: `${columns[1]}` },
    };

    headers.slice(ID_COLUMNS_SIZE).forEach((header, index) => {
      const prefix =
        header === 'ip_address'
          ? 'information:information_technology.network.interfaces.primary.'
          : 'information:attribute.';

      lineObj[`${prefix}${header}`] = columns[index + ID_COLUMNS_SIZE];
    });

    return acc + JSON.stringify(lineObj) + '\n';
  }, 'UPDATE_INSTANCE:\n');
};
