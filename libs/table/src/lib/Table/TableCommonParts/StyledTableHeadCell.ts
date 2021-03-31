import styled from 'styled-components';

interface Props {
  width: number;
}

export const StyledTableHeadCell = styled.th<Props>`
  background-color: ${(props) => props.theme.colors.grey1};
  padding: 0 ${(props) => props.theme.spacing.small};
  border: 1px solid ${(props) => props.theme.colors.grey2};
  text-align: left;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  width: ${(props) => props.width}px;
  max-width: ${(props) => props.width}px;
  vertical-align: middle;
`;
