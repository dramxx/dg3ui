import * as React from 'react';
import styled from 'styled-components';

interface Props {
  percentages: number;
  color?: string;
  height?: number;
}

const StyledBar = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => (props.height ? props.height : 0.3)}rem;
  border-radius: 1.5px;
  background-color: ${(props) => props.theme.colors.grey2};
`;

const StyledPercentages = styled.span<Props>`
  height: 100%;
  width: ${(props) => props.percentages}%;
  border-radius: 1.5px;
  background-color: ${(props) =>
  props.color ? props.color : props.theme.colors.black};
`;

export const ProgressBar = (props: Props) => {
  return (
    <StyledBar {...props}>
      <StyledPercentages {...props} />
    </StyledBar>
  );
};
