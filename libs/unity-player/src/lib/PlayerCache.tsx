import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { UnityContent } from 'react-unity-webgl/distribution/Exports';
import styled from 'styled-components';
import { useSingleSwitch } from '@dg3/utils';
import { UnityModelContainer } from './UnityModelContainer';
import { MountPlayer } from './types';

const StyledPlayerCache = styled.div`
  display: none;
`;

interface Props {
  unityContent: UnityContent;
}

export interface Ref {
  mountPlayer: MountPlayer;
}

export const PlayerCache = forwardRef<Ref, Props>((props, ref) => {
  const [initialized, initialize] = useSingleSwitch();
  const cacheElement = useRef<HTMLDivElement>(null);
  const playerElement = useRef<Node | null>();
  const playerParent = useRef<HTMLElement | null>(null);

  const releasePlayer = useCallback(() => {
    // sometimes, releasePlayer gets called before initialization is complete
    if (playerElement.current) {
      cacheElement.current!.appendChild(playerElement.current);
    }
    playerParent.current = null;
    props.unityContent.send('Controller', 'Pause');
  }, []);

  const movePlayer = useCallback(() => {
    playerElement.current = cacheElement.current!.firstChild;
    playerParent.current!.appendChild(playerElement.current!);
  }, []);

  const mountPlayer = useCallback(
    (parent: HTMLElement) => {
      if (playerParent.current) {
        throw new Error('Trying to mount second instance of Unity Player.');
      } else {
        playerParent.current = parent;
      }
      if (initialized) {
        movePlayer();
      } else {
        initialize();
      }
      return releasePlayer;
    },
    [movePlayer, initialized]
  );

  useEffect(() => {
    // sometimes, mountPlayer is called after component is initialized, but before hook
    if (initialized && !playerElement.current) {
      movePlayer();
    }
  }, [initialized]);

  // forward ref to parent
  useImperativeHandle(ref, () => ({ mountPlayer }), [mountPlayer]);

  return (
    <StyledPlayerCache ref={cacheElement}>
      {initialized && <UnityModelContainer unityContent={props.unityContent} />}
    </StyledPlayerCache>
  );
});
