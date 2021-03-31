import { UnityContent } from 'react-unity-webgl/distribution/Exports';
import { useCallback, useEffect, useRef } from 'react';
import { SetData } from './types';
import { VgaDynamicData, VgaStaticData } from '@dg3/types';

export const usePlayerData = (
  unityContent: UnityContent,
  loaded: boolean
): SetData => {
  const animationData = useRef<VgaDynamicData | null>(null);
  const staticData = useRef<VgaStaticData | null>(null);
  useEffect(() => {
    unityContent.on('GetAnimationData', (interval: { y: number }) => {
      const finalData =
        interval.y < (animationData.current?.frames.length ?? 0)
          ? animationData.current
          : {};
      unityContent.send(
        'Controller',
        'SendAnimationData',
        JSON.stringify(finalData)
      );
    });
  }, []);

  const sendData = useCallback(() => {
    unityContent.send(
      'Controller',
      'SendStaticData',
      JSON.stringify(staticData.current)
    );
    unityContent.send('Controller', 'Pause');
  }, []);

  const setData = useCallback(
    (newStaticData: VgaStaticData, newAnimationData: VgaDynamicData) => {
      staticData.current = newStaticData;
      animationData.current = newAnimationData;
      if (loaded) {
        sendData();
      }
    },
    [loaded]
  );
  useEffect(() => {
    if (staticData.current) {
      sendData();
    }
  }, [loaded]);

  return setData;
};
