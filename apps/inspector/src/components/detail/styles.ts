import styled from 'styled-components';

export const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
  width: 99%;
  overflow: auto;
`;

export const StyledTabButton = styled.button<{ isActive: boolean }>`
  background: ${(props) => (props.isActive ? 'lightblue' : 'whitesmoke')};
`;
