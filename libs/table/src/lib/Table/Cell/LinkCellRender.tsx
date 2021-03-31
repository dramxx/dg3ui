import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { renderValue } from './DefaultCellRender';
import { TableCellContent } from './TableCellContent';

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.link};
`;

export const LinkCellRender = ({ cell }) => {
  const history = useHistory();
  const baseOverviewUrl = history.location.pathname.split('/detail/')[0];

  const cellValue = cell.row.original[cell.column.id];

  return (
    <TableCellContent tooltip={renderValue(cell)}>
      <StyledLink to={`${baseOverviewUrl}/detail/${cellValue.intId}`}>
        {cellValue.value}
      </StyledLink>
    </TableCellContent>
  );
};
