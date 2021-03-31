export type CoreElements<T> = {
  PLACE: T;
  DEVICE: T;
  TASK: T;
  INFORMATION: T;
};

export const CORE_ELEMENT_KEYS = {
  PLACE: 'PLACE',
  DEVICE: 'DEVICE',
  TASK: 'TASK',
  INFORMATION: 'INFORMATION',
};

export const CORE_ELEMENT_FILTER_NAME = {
  PLACE: 'placeFilter',
  DEVICE: 'deviceFilter',
  TASK: 'taskFilter',
  INFORMATION: 'informationFilter',
};

export type CoreElementKey = keyof typeof CORE_ELEMENT_KEYS;
