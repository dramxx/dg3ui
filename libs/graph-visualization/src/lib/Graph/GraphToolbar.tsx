import { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams/';
import React from 'react';
import styled from 'styled-components';

import { PrimaryButton } from '@dg3/components';

const StyledToolbar = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.colors.black};
`;

const StyledButton = styled(PrimaryButton)`
  margin-right: 1rem;
`;

interface PropsType {
  model: DiagramModel;
  engine: DiagramEngine;
  onAutoDistribute: () => void;
  onNodeCreate: (dgType: string) => void;
}

export const GraphToolbar = (props: PropsType) => {
  const { model, engine } = props;

  const handleZoomToFit = () => {
    engine.zoomToFit();
  };

  const handleZoomOut = () => {
    const zoomIn = model.getZoomLevel() - 5;

    model.setZoomLevel(zoomIn > 1 ? zoomIn : 1);
    engine.repaintCanvas();
  };

  const handleZoomIn = () => {
    model.setZoomLevel(model.getZoomLevel() + 5);
    engine.repaintCanvas();
  };

  return (
    <StyledToolbar>
      <StyledButton onClick={handleZoomIn}>{'Zoom In'}</StyledButton>
      <StyledButton onClick={handleZoomOut}>{'Zoom Out'}</StyledButton>
      <StyledButton onClick={handleZoomToFit}>{'Zoom to fit'}</StyledButton>
      <StyledButton onClick={props.onAutoDistribute}>
        {'Auto distribute'}
      </StyledButton>
      {/*<StyledButton onClick={() => props.onNodeCreate('place')}>*/}
      {/*  {'Create Place'}*/}
      {/*</StyledButton>*/}
      {/*<StyledButton onClick={() => props.onNodeCreate('device')}>*/}
      {/*  {'Create Device'}*/}
      {/*</StyledButton>*/}
    </StyledToolbar>
  );
};
