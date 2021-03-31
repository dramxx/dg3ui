import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useUnityPlayerContext } from './UnityPlayerContext';
import { NodeSelectionHandler } from './types';
import { VgaDynamicData, VgaStaticData } from '@dg3/types';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {
  staticData: VgaStaticData;
  dynamicData: VgaDynamicData;
  onSelectNode: NodeSelectionHandler;
}

export const UnityPlayer: FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    mountPlayer,
    setData,
    setSelectNodeHandler,
  } = useUnityPlayerContext();

  useEffect(() => mountPlayer(containerRef.current!), []);

  useEffect(() => {
    setData(props.staticData, props.dynamicData);
  }, [props.staticData, props.dynamicData]);

  useEffect(() => {
    // TODO props change handlers should be consolidated in the future
    setSelectNodeHandler(props.onSelectNode);
  }, [props.onSelectNode]);

  return <StyledContainer ref={containerRef} />;
};
