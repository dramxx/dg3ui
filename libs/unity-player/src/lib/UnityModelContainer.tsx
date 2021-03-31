import * as React from 'react';
import styled from 'styled-components';
import Unity from 'react-unity-webgl';
import { UnityModelActionFooter } from './UnityModelActionFooter';
import { UnityContent } from 'react-unity-webgl/distribution/Exports';
import { forwardRef } from 'react';

const StyledUnityContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  unityContent: UnityContent;
}

export const UnityModelContainer = forwardRef<HTMLDivElement, Props>(
  (props, ref) => (
    <StyledUnityContainer ref={ref}>
      <UnityModelActionFooter
        onFullscreen={() => props.unityContent.setFullscreen(true)}
      />
      <Unity unityContent={props.unityContent} />
    </StyledUnityContainer>
  )
);
