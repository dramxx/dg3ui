import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import * as React from 'react';

import { ErrorLabel, LoadingSpinner } from '@dg3/components';
import { GqlTableConfig } from '@dg3/schema';
import { VisualisationTable } from '@dg3/table';
import { ColumnConf } from '@dg3/types';
import { convertGraphqlIntoChartData } from '@dg3/utils';

interface Props {
  id: string;
  config: GqlTableConfig;
}

export const NtlDetailTable: React.FC<Props> = (props: Props) => {
  const { id, config } = props;

  const { data, loading, error } = useQuery(gql(config.query), {
    variables: {
      id: id,
    },
    // investigate how to use cache for large filters
    fetchPolicy: 'no-cache',
  });

  if (error) return <ErrorLabel>{error.message}</ErrorLabel>;
  if (loading) return <LoadingSpinner />;

  const detailData = convertGraphqlIntoChartData('TableWidget', config, data);

  const columnsConf = config.widgetConfig as Array<ColumnConf>;

  return (
    <VisualisationTable
      data={detailData}
      dataLength={detailData.length}
      columnsConf={columnsConf}
      rowsInTable={5}
      showExport={false}
      allowSelect={false}
      allowRowSelect={false}
      allowFilter={false}
    />
  );
};
