import { EViewMode } from '@model';
import React, { FC } from 'react';

import { Dropdown, DropdownMenuItem } from '@dg3/components';
import { ManagementBarWrapper } from './styles';

const DropDownItems: DropdownMenuItem[] = [
  {
    id: EViewMode.TABLE,
    label: 'Table',
    active: true,
  },
  {
    id: EViewMode.COMPACT,
    label: 'Compact',
    active: true,
  },
  {
    id: EViewMode.JSON,
    label: 'JSON',
    active: true,
  },
];

interface ManagementBarProps {
  isLoading: boolean;
  results: number;
  viewMode: EViewMode;
  onViewChange: (mode: EViewMode) => void;
}

const TableManagementBar: FC<ManagementBarProps> = (props: ManagementBarProps) => {
  const { isLoading, results, viewMode, onViewChange } = props;

  return (
    <ManagementBarWrapper>
      <section>
        {isLoading && <strong>Loading...</strong>}
        {!isLoading && results === 0 && <strong>No records available...</strong>}
        {!isLoading && results > 0 && (
          <Dropdown
            items={DropDownItems}
            label={DropDownItems.find((x) => x.id === viewMode).label}
            onValueChange={(mode: EViewMode) => onViewChange(mode)}
          />
        )}
      </section>
    </ManagementBarWrapper>
  );
};

export default TableManagementBar;
