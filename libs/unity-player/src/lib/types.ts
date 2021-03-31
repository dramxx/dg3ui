import { VgaDynamicData, VgaStaticData } from '@dg3/types';

export type SetData = (
  staticData: VgaStaticData,
  animationData: VgaDynamicData
) => void;
export type NodeSelectionHandler = (nodeId: string) => void;
export type ReleasePlayer = () => void;
export type MountPlayer = (parent: HTMLElement) => ReleasePlayer;
