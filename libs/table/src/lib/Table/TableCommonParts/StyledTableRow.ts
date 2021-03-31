import styled from 'styled-components';

export const StyledTableHeaderRow = styled.tr`
  width: 100%;
  max-width: 100%;
  display: table;
  table-layout: fixed;

  height: 23px;
  max-height: 23px;
`;

export const StyledTableRow = styled(StyledTableHeaderRow)`
  border: 1px solid ${(props) => props.theme.colors.grey2};
  cursor: pointer;
  opacity: 1;
  background-color: ${(props) => props.theme.colors.white};

  &:nth-child(2n) {
    background-color: ${(props) => props.theme.colors.grey1};
  }
`;
