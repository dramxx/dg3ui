import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import jq from 'jq-web';
import { includes, isEmpty, isNil } from 'ramda';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { OverviewWidget } from '@dg3/charts';
import { ErrorLabel, LoadingSpinner, withErrorBoundary } from '@dg3/components';
import {
  ExportQuery,
  addNewChipIntoContentFilter,
  contentFilterVar,
  messages as filterChipMessages,
  useFilter,
  useNotification,
} from '@dg3/graphql';
import { MappingObject, OverviewTableDataSchema } from '@dg3/schema';
import { OverviewTable } from '@dg3/table';
import {
  DefaultOrdering,
  DioOrderingType,
  DuplicateChipError,
  OrderingType,
  OverviewDataConfig,
  OverviewPageType,
  PaginationType,
  TableDataObject,
} from '@dg3/types';
import { convertGraphqlIntoChartData, exportTable } from '@dg3/utils';
import { DetailPage } from './DetailPage';
import { messages } from './messages';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
  padding: ${(props) => props.theme.spacing.big};
  border: ${(props) => props.theme.colors.primary2};
  width: 100%;
  height: 100%;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  justify-content: space-between;
`;

const StyledTable = styled.div<{ activeDetail: boolean }>`
  margin-right: calc(${(props) => props.theme.spacing.small} / 2);
  width: ${(props) => (props.activeDetail ? '50%' : '100%')};
  box-shadow: ${(props) => props.theme.shadows.shadow3};
`;

const StyledDetail = styled.div`
  margin-left: calc(${(props) => props.theme.spacing.small} / 2);
  border-radius: ${(props) => props.theme.radius.normal};
  padding: ${(props) => props.theme.spacing.small}
    ${(props) => props.theme.spacing.normal};
  width: 50%;
  background: transparent linear-gradient(270deg, #ffffff 0%, #f0f0f0 100%) 0 0
    no-repeat padding-box;
  box-shadow: ${(props) => props.theme.shadows.shadow3};
`;

interface Props {
  page: OverviewPageType;
}

const convertData = (
  data: object,
  config: OverviewDataConfig,
  filters: object
): TableDataObject[] => {
  let convertedData;
  switch (config.language) {
    case 'jq':
      // data has precedence (potential name conflicts)
      convertedData = jq.json({ ...filters, ...data }, config.transformation);
      break;
    case 'jsonpath':
      convertedData = convertGraphqlIntoChartData('TableWidget', config, data);
      break;
  }
  return OverviewTableDataSchema.check(convertedData);
};

const getDefaultOrdering = (
  defaultOrderingDefinition: DefaultOrdering
): OrderingType => {
  if (isNil(defaultOrderingDefinition)) {
    return [];
  }
  if (defaultOrderingDefinition.key === null) {
    return [
      {
        id: null,
        order: defaultOrderingDefinition.order,
      },
    ];
  }
  return [
    {
      attr: defaultOrderingDefinition.key,
      order: defaultOrderingDefinition.order,
    },
  ];
};

const getDioOrderingFromOrdering = (
  ordering: OrderingType
): DioOrderingType => {
  return isEmpty(ordering) || ordering[0].id === null
    ? undefined
    : {
        order: ordering[0].order,
        byField: ordering[0].attr,
      };
};

export const OverviewPage: React.FC<Props> = withErrorBoundary((props) => {
  const { page } = props;
  const { detailId } = useParams();
  const intl = useIntl();
  const detailActive = !!detailId;
  const notification = useNotification();
  const contentFilter = useReactiveVar(contentFilterVar);
  const exportMessage = intl.formatMessage(messages.exportStarted);

  const [pagination, setPagination] = useState<PaginationType>({
    size: 35,
    offset: 0,
  });

  const [ordering, setOrdering] = useState<OrderingType>(() =>
    getDefaultOrdering(page.overview.defaultOrdering)
  );
  const dioOrdering = getDioOrderingFromOrdering(ordering);
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);
  const [exporting, setExporting] = useState(false);

  const filterVariables = useFilter(page.includedFilters, () => {
    setPagination({
      size: pagination.size,
      offset: 0,
    });
  });

  const queryVariables = { ordering, dioOrdering, ...filterVariables };

  const { data, loading, error } = useQuery(gql(page.overview.query), {
    variables: {
      page: pagination,
      ...queryVariables,
    },
  });

  const tableData = useMemo(
    () => (data ? convertData(data, page.overview, filterVariables) : null),
    [data, page.overview, filterVariables]
  );

  if (error) return <ErrorLabel>{error.message}</ErrorLabel>;
  if (loading && !data) return <LoadingSpinner />;

  const handleColumnFilter = (columnId: string, value: MappingObject) => {
    if (!isNil(value.value) && page.onColumnFilter) {
      const condition = page.onColumnFilter(columnId, value, intl);

      try {
        contentFilterVar(addNewChipIntoContentFilter(condition, contentFilter));
      } catch (e) {
        if (e instanceof DuplicateChipError) {
          notification.warning(
            intl.formatMessage(filterChipMessages.filterExists)
          );
        } else {
          console.error(e);
        }
      }
    }
  };

  const handleExport = () => {
    if (!isEmpty(selectedRows)) {
      notification.info(exportMessage);
      exportTable(
        page.overview.columns,
        tableData.filter((row) => {
          const id = row.id as MappingObject;
          return includes(id.intId, selectedRows);
        }),
        page.tableName
      );
    } else if (!exporting) {
      setExporting(true);
      notification.info(exportMessage);
    }
  };
  const onExportCompleted = (data) => {
    const exportTableData = convertData(data, page.overview, filterVariables);

    exportTable(page.overview.columns, exportTableData, page.tableName);
    setExporting(false);
  };
  const onExportError = (error) => {
    setExporting(false);
    notification.error(error.toString());
  };

  const dataLength = data.set?.count ?? tableData.length;
  return (
    <StyledContent>
      <StyledBody>
        <StyledTable activeDetail={detailActive}>
          <OverviewWidget
            noData={isEmpty(tableData)}
            overview={
              <OverviewTable
                data={tableData}
                dataLength={dataLength}
                columnsConf={page.overview.columns}
                onColumnFilter={handleColumnFilter}
                pageOffset={pagination.offset}
                rowsInTable={pagination.size}
                changePagination={setPagination}
                ordering={ordering}
                changeOrdering={setOrdering}
                changeSelectedRows={setSelectedRows}
                detailActive={detailActive}
              />
            }
            enableDataSelection={false}
            onExport={handleExport}
            enableImport={page.enableImport}
            pageSize={pagination.size}
            changePageSize={(size) => setPagination({ ...pagination, size })}
            title={page.tableName}
            module={page.module}
            overviewModule={page.id}
            includeFilters={page.includedFilters}
          />
        </StyledTable>
        {detailActive && (
          <StyledDetail>
            <DetailPage
              id={detailId}
              detailProvider={page.detail}
              overviewModule={page.module}
              overviewId={page.id}
            />
          </StyledDetail>
        )}
        {exporting && (
          <ExportQuery
            query={gql(page.overview.query)}
            onCompleted={onExportCompleted}
            onError={onExportError}
            variables={{
              ...queryVariables,
              // limit total count to max 15000 during export
              page: {
                size: 15000,
                offset: 0,
              },
            }}
          />
        )}
      </StyledBody>
    </StyledContent>
  );
});
