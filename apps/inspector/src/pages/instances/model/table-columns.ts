import { ColumnConfig, InstanceLabels } from '@model';

export const TableColumns: ColumnConfig[] = [
  {
    key: 'id.did.id',
    label: InstanceLabels.TYPE,
    isActive: true,
  },
  {
    key: 'id.value',
    label: InstanceLabels.VALUE,
    isActive: true,
  },
  {
    key: 'kind.localization.name',
    label: InstanceLabels.KIND,
    isActive: false,
  },
];
