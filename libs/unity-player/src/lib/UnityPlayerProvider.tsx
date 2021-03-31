import React, {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UnityContent } from 'react-unity-webgl/distribution/Exports';
import { useSingleSwitch } from '@dg3/utils';

import { UnityPlayerContextProvider } from './UnityPlayerContext';
import { usePlayerData } from './usePlayerData';
import { NodeSelectionHandler } from './types';
import { PlayerCache, Ref as PlayerCacheRef } from './PlayerCache';

const noop = () => {
  /* do nothing */
};

interface Props {
  children: ReactNode;
}

export const UnityPlayerProvider: FC<Props> = (props) => {
  const [loaded, setLoaded] = useSingleSwitch();
  const cache = useRef<PlayerCacheRef>(null);

  const onNodeSelected = useRef<NodeSelectionHandler>(noop);
  // initialize only once
  const [unityContent] = useState(() => {
    const unityContent = new UnityContent(
      'vga-demo/Build/VGA.json',
      'vga-demo/Build/UnityLoader.js'
    );
    unityContent.on('loaded', setLoaded);
    unityContent.on('SelectNode', (nodeId: string) => {
      onNodeSelected.current(nodeId);
    });
    return unityContent;
  });

  const setData = usePlayerData(unityContent, loaded);
  const mountPlayer = useCallback(
    (parent: HTMLElement) => cache.current!.mountPlayer(parent),
    []
  );

  const setSelectNodeHandler = useCallback(
    (handleNodeSelected: NodeSelectionHandler) => {
      onNodeSelected.current = handleNodeSelected;
    },
    []
  );

  const contextValue = useMemo(
    () => ({ mountPlayer, setData, setSelectNodeHandler }),
    [mountPlayer, setData, setSelectNodeHandler]
  );

  return (
    <Fragment>
      <UnityPlayerContextProvider value={contextValue}>
        {props.children}
      </UnityPlayerContextProvider>
      <PlayerCache unityContent={unityContent} ref={cache} />
    </Fragment>
  );
};
