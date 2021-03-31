import styled from 'styled-components';

interface Props {
  active: boolean;
  width: number;
}

export const StyledTableCell = styled.td<Props>`
  font-size: ${(props) => props.theme.fontSize.small};
  padding: 0 ${(props) => props.theme.spacing.small};
  border-left: 1px solid ${(props) => props.theme.colors.grey2};
  border-right: 1px solid ${(props) => props.theme.colors.grey2};
  width: ${(props) => props.width}px;
  max-width: ${(props) => props.width}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  height: 100%;

  &:first-of-type {
    border-left: transparent;
  }

  &:last-of-type {
    border-right: transparent;
  }

  :hover {
    background-color: ${(props) => props.active && props.theme.colors.grey1};
  }
`;
