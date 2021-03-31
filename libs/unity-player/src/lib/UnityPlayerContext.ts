import { createContext, useContext } from 'react';
import { MountPlayer, NodeSelectionHandler, SetData } from './types';

interface UnityPlayerContext {
  mountPlayer: MountPlayer;
  setData: SetData;
  setSelectNodeHandler: (handler: NodeSelectionHandler) => void;
}

const unityPlayerContext = createContext<UnityPlayerContext | null>(null);

export const useUnityPlayerContext = (): UnityPlayerContext => {
  const context = useContext(unityPlayerContext);
  if (context) {
    return context;
  } else {
    throw new Error(
      'Trying to use unity player outside of Unity Player provider.'
    );
  }
};

export const UnityPlayerContextProvider = unityPlayerContext.Provider;
