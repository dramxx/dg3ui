import { Instance } from '@api';
import { CompactView } from '@components/compact-view';
import { JsonView } from '@components/json-view';
import { TableManagementBar, VirtualizedTable } from '@components/table';
import { ColumnConfig, EViewMode } from '@model';
import React, { useState } from 'react';

import { StyledOverview } from './styles';

interface Props {
  isLoading: boolean;
  data: Instance[];
  tableColumns: ColumnConfig[];
  onLoadMore?: () => void;
  onRowClick: (instance: Instance) => void;
}

export default function Overview(props: Props) {
  const { isLoading, data, onLoadMore, onRowClick, tableColumns } = props;

  const [viewMode, setViewMode] = useState<EViewMode>(EViewMode.TABLE);

  return (
    <StyledOverview>
      <TableManagementBar isLoading={isLoading} results={data.length} viewMode={viewMode} onViewChange={setViewMode} />
      {!isLoading && (
        <>
          {viewMode === EViewMode.TABLE && (
            <VirtualizedTable
              data={data}
              initialColumns={tableColumns}
              onLoadMore={onLoadMore}
              onRowClick={onRowClick}
            />
          )}
          {viewMode === EViewMode.JSON && <JsonView data={data} />}
          {viewMode === EViewMode.COMPACT && <CompactView />}
        </>
      )}
    </StyledOverview>
  );
}
