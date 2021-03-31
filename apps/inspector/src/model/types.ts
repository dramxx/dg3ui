export enum EScreen {
  Instances = 'Instances',
  Values = 'Values',
  Workflows = 'Workflows',
  GraphQL = 'GraphQL',
}

export interface TypeItem {
  id: string;
  label: string;
  color: string;
  parent: string;
  children: string[];
}

export interface ColumnConfig {
  key: string;
  label: string;
  isActive: boolean;
  format?: (value: unknown) => string | number;
  width?: number;
}

export enum EViewMode {
  TABLE = 'TABLE',
  COMPACT = 'COMPACT',
  JSON = 'JSON',
}

export enum InstanceLabels {
  TYPE = 'Type',
  VALUE = 'Value',
  KIND = 'Kind',
}
