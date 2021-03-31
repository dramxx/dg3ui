import styled from 'styled-components';

interface Props {
  height: number;
}

export const StyledChartStoryWrapper = styled.div<Props>`
  height: ${(props) => props.height}px;
`;
