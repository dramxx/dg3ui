import React, { FC, memo, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const DIAMETER = 170;
const STROKE = 4;
const SIZE = DIAMETER + STROKE;
const DELAY = 300;
const ROTATION_DURATION_IN_SECONDS = 2;

const fadeIn = keyframes`
  from {
    visibility: hidden;
  }
  to {
    visibility: visible;
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  visibility: hidden;
  animation: ${fadeIn} 0s;
  animation-fill-mode: forwards;
  animation-delay: ${DELAY}ms;
`;

const StyledSpinner = styled.svg`
  animation: rotation ${ROTATION_DURATION_IN_SECONDS}s infinite linear;
  width: 100%;
  height: 100%;
  max-width: ${SIZE}px;
  max-height: ${SIZE}px;
`;

const StyledCircle = styled.circle`
  stroke-width: ${STROKE}px;
  fill: transparent;
  stroke: ${(props) => props.theme.colors.grey3};
`;

const StyledArc = styled.path`
  stroke-width: ${STROKE}px;
  fill: transparent;
  stroke: ${(props) => props.theme.colors.primary2};
`;

const PATH = `
  M ${SIZE / 2} ${STROKE / 2}
  a ${DIAMETER / 2} ${DIAMETER / 2} 0 0 1 ${0.866 * (DIAMETER / 2)} ${
  DIAMETER / 4
}`;

export const LoadingSpinner: FC = memo(() => {
  const [start] = useState(() => Math.random());
  return (
    <StyledWrapper>
      <StyledSpinner
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ animationDelay: `${-ROTATION_DURATION_IN_SECONDS * start}s` }}
      >
        <StyledCircle cx={SIZE / 2} cy={SIZE / 2} r={DIAMETER / 2} />
        <StyledArc d={PATH} />
      </StyledSpinner>
    </StyledWrapper>
  );
});
