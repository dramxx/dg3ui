import * as React from 'react';
import { Column } from 'react-table';

interface Props {
  column: Column;
}

export const SimpleTableHeadCell: React.FC<Props> = (props: Props) => {
  return props.column.render('Header');
};
