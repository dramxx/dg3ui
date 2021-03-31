import React from 'react';
import styled from 'styled-components';
import { ReportPlayground } from '@dg3/report-playground';

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PlaygroundPage = () => {
  return (
    <StyledHomePage>
      <ReportPlayground />
    </StyledHomePage>
  );
};
