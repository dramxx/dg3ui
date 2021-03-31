import React from 'react';
import styled from 'styled-components';

const StyledLoadingBarBox = styled.div`
  width: 90%;
  height: 12px;
  border: 1px solid #707070;
  border-radius: 6px;
  margin-bottom: 7px;
`;

const StyledLoadingBar = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  height: 100%;
  border-radius: ${(props) => props.theme.radius.normal};
  background: ${(props) => props.theme.colors.primary2};
`;

const StyledLoadingBarText = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 11px;
  display: flex;
  justify-content: center;
`;

export const LoadingBar: React.FC = () => {
  return (
    <StyledLoadingBarBox>
      <StyledLoadingBar percentage={100}>
        <StyledLoadingBarText>{'loading...'}</StyledLoadingBarText>
      </StyledLoadingBar>
    </StyledLoadingBarBox>
  );
};
