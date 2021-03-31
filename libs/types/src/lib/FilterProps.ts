import { SimpleFilter } from './ContentFilter';
import { CoreElementKey } from './CoreElements';

export type FilterConditions<T> = {
  EQUAL: T;
  NOT_EQUAL: T;
  // LESS: T;
  // LESS_OR_EQUAL: T;
  // GREATER: T;
  // GREATER_OR_EQUAL: T;
};

export const FILTER_CONDITIONS_SIGN: FilterConditions<string> = {
  EQUAL: '=',
  NOT_EQUAL: '≠',
  // LESS: '<',
  // LESS_OR_EQUAL: '<=',
  // GREATER: '>',
  // GREATER_OR_EQUAL: '>=',
};

export const FILTER_CONDITIONS_KEYS: FilterConditions<string> = {
  EQUAL: 'EQUAL',
  NOT_EQUAL: 'NOT_EQUAL',
  // LESS: 'LESS',
  // LESS_OR_EQUAL: 'LESS_OR_EQUAL',
  // GREATER: 'GREATER',
  // GREATER_OR_EQUAL: 'GREATER_OR_EQUAL',
};

export const FilterConditionsStrings: FilterConditions<string> = {
  EQUAL: 'equal',
  NOT_EQUAL: 'notEqual',
  // LESS: 'less',
  // LESS_OR_EQUAL: 'lessOrEqual',
  // GREATER: 'greater',
  // GREATER_OR_EQUAL: 'greaterOrEqual',
};

export type SimpleFilterDefinition = {
  [key: string]: {
    id: string;
    attrs: Array<{ id: string }>;
  };
};

export type SimpleFilterTabProps = {
  coreElement: CoreElementKey;
  value?: SimpleFilter;
  onValueChange: (value: object) => void;
};

export const FILTER_TYPE_INDICATORS = [
  'place',
  'device',
  'task',
  'info',
  'time',
] as const;

export type FilterTypeIndicatorKeys = typeof FILTER_TYPE_INDICATORS[number];
