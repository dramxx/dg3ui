import React from 'react';
import styled from 'styled-components';
import { GraphContainer } from '@dg3/graph-visualization';

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GraphPage = () => {
  // @ts-ignore
  const container = <GraphContainer name={'test'} />;

  return <StyledHomePage>{container}</StyledHomePage>;
};

export default GraphPage;
