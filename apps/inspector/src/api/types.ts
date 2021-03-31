// DIO Value

export interface DioValue {
  id: string;
  timestamp: string;
  value: {
    normalizedValue: unknown;
  };
}

export interface DioValuesQueryResponse {
  diosSet: {
    items: DioValue[];
  };
}

// DIO Value Type

export interface DioValueType {
  id: string;
  filterMatch: boolean;
  localization: {
    name: string;
    description: string;
  };
  color: string;
  parent: { id: string } | null;
  children: Array<{ id: string }>;
}

export interface DioValueTopic {
  id: string;
  localization: {
    name: string;
    description: string;
  };
  filterMatch: boolean;
  parent: { id: string } | null;
  children: Array<{ id: string }>;
  didsDirect: DioValueType[];
  color: string;
}

export interface DioValueTypesQueryResponse {
  topics: DioValueTopic[];
}

// Instance

export interface Instance {
  internalId: string;
}

export interface InstancesQueryResponse {
  instances: Instance[];
}

export interface InstanceRelationsQueryResponse {
  instances: Array<{
    internalId: string;
    edgeInstance: EdgeInstance[];
  }>;
}

export interface EdgeInstance {
  direction: 'IN' | 'OUT';
  type: string;
  existsFrom: string;
  existsTo: string;
  attributes: Array<unknown>;
  edgeEndPoint: EdgeEndpoint;
}

export interface EdgeEndpoint {
  coreElement: {
    id: string;
    localization: {
      name: string;
      description: string;
    };
  };
  id: {
    did: {
      id: string;
      localization: {
        name: string;
      };
    };
    value: string;
  };
}

// Instance Type

export interface InstanceType {
  id: string;
  localization: {
    name: string;
    description: string;
    abbreviation: string;
  };
  parent: { id: string } | null;
  children: Array<{ id: string }>;
  color: string;
}

export interface InstanceTypesQueryResponse {
  elements: InstanceType[];
}

export interface InstanceAttributesTab {
  instances: Array<{
    internalId: string;
    id: string;
    hlavni_druh: LocalizationReference;
    pod_druh: LocalizationReference;
    attributes: Array<{
      did: LocalizationReference;
      normalizedValue: unknown;
    }>;
  }>;
}

interface Localization {
  name: string;
  description?: string;
}

interface LocalizationReference {
  id: string;
  localization: Localization;
}

// Chart

export interface ChartQueryResponse {
  diosSet: {
    splitByTimestampInterval: ChartPoint[];
  };
}

export interface ChartPoint {
  from: string;
  to: string;
  set: {
    count: number;
  };
}

// Query Variables
export interface IdVar {
  id: string;
}

export interface IdArrVar {
  ids: [string];
}

// Misc

export enum ECalendarTime {
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
