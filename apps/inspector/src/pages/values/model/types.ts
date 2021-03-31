export interface MinimapZoom {
  start: number;
  end: number;
}

export interface MinimapPointer {
  from: number;
  to: number;
}

export interface ValuesAttributesQueryInterface {
  diosSetById: {
    items: Array<{
      id: string;
      startIndexing: string;
      timestamp: string;
      did: {
        id: string;
        localization: {
          name: string;
        };
      };
      tags: Array<{
        key: string;
        value: string[];
      }>;
      taskExecution: ValuesAttributesTaskType | null;
      taskExecutionNode: ValuesAttributesTaskType | null;
      validity: {
        isDuplicity: boolean;
        isInvalid: boolean;
      };
      value: {
        certainity: string;
        normalizedType: string;
        normalizedValue: string;
        raw: string;
      };
    }>;
  };
}

interface ValuesAttributesTaskType {
  id: string;
}

export enum EDetailTab {
  Attributes = 'Attributes',
  Author = 'Author',
  Mediator = 'Mediator',
  Object = 'Object',
}

export interface TabProps {
  dioValueId: string;
}

export interface InstanceIdFromValueId {
  diosSetById: {
    items: Array<{
      object: {
        internalId: string;
      };
    }>;
  };
}

export interface MediatorDetails {
  diosSetById: {
    items: Array<{
      id: string;
      mediators: MediatorIds[];
    }>;
  };
}

export interface MediatorIds {
  internalId: string;
}
