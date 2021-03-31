import { CoreElementKey } from './CoreElements';

export type SimpleFilterValue = {
  id: string;
  intId: string;
  name: string;
};

export type SimpleFilter = {
  entitySelection: string;
  attributeSelection: string;
  relationalOperator: string;
  values: Array<SimpleFilterValue>;
};

export const CONTENT_FILTER_TYPE = {
  SIMPLE: 'SIMPLE',
  EXPERT: 'EXPERT',
};

export type ContentFilterTypeKey = keyof typeof CONTENT_FILTER_TYPE;

export type FilterChip = {
  id: string;
  label: string;
  coreEl: CoreElementKey;
  type: ContentFilterTypeKey;
  value: string;
};
