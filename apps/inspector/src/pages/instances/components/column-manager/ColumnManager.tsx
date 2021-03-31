import { ColumnConfig } from '@model';
import { TableColumns } from '@pages/instances/model/table-columns';
import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: unknown;
  label: string;
  onColumnChange: (columns: ColumnConfig[]) => void;
}

const PlusIcon = styled.div`
  padding-right: 5px;
`;

export default function ColumnManager(props: Props) {
  const { children, label, onColumnChange } = props;
  const [hoveredCol, setHoveredCol] = useState<string>('');

  const handleColumnAdd = (): void => {
    const updatedTableCols: ColumnConfig[] = [...TableColumns];
    updatedTableCols.forEach((column: ColumnConfig) => {
      if (column.label === hoveredCol && column.isActive === false) column.isActive = true;
    });
    onColumnChange(updatedTableCols);
  };

  return (
    <div
      id={label}
      onMouseEnter={(event: MouseEvent): void => {
        const target = event.target as HTMLDivElement;
        setHoveredCol(target.id);
      }}
      onMouseLeave={(): void => setHoveredCol('')}
    >
      <PlusIcon
        style={hoveredCol === label ? { display: 'inline-block' } : { display: 'none' }}
        onClick={() => handleColumnAdd()}
      >
        <span role="img" aria-label="plusIcon">
          ➕
        </span>
      </PlusIcon>
      {children}
    </div>
  );
}
