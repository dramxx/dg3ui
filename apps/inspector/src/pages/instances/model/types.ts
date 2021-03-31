import { ColumnConfig } from '@model';

export enum EDetailTab {
  Attributes = 'Attributes',
  History = 'History',
  Relations = 'Relations',
  Statistics = 'Statistics',
  Templates = 'Templates',
}

export interface TabProps {
  instanceId: string;
  onColumnChange?: (columns: ColumnConfig[]) => void;
}

export interface InstanceTemplatesTabInterface {
  instances: Array<{
    templatesShouldSatisfy: AllTemplatesType[];
    templatesNotSatisfy: TemplateStatusType[];
    templatesSatisfy: TemplateStatusType[];
  }>;
}

export interface TemplateStatusType {
  id: string;
}

export interface AllTemplatesType {
  id: string;
  localization: {
    name: string;
    description: string;
  };
}
