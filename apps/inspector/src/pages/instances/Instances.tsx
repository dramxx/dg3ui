import { GET_INSTANCES, GET_INSTANCE_TYPES, Instance, InstanceTypesQueryResponse, InstancesQueryResponse } from '@api';
import { useLazyQuery } from '@apollo/client';
import Layout from '@components/layout';
import React from 'react';

import { InstanceDetail } from './components/detail';
import Filter from './components/filter';
import InstancesTypeSearch from './components/instances-type-search';
import Overview from './components/overview';
import { Store as InstancesStore } from './model';

export default function Instances() {
  const Actions = InstancesStore.useActions();
  const selectedTypes = InstancesStore.useSelector((state) => state.selectedTypes);
  const tableColumns = InstancesStore.useSelector((state) => state.tableColumns);

  const [detailId, setDetailId] = React.useState<string>();

  const [getInstanceTypes, typesQuery] = useLazyQuery<InstanceTypesQueryResponse>(GET_INSTANCE_TYPES);
  const [getInstances, instancesQuery] = useLazyQuery<InstancesQueryResponse>(GET_INSTANCES);

  React.useEffect(() => {
    loadTypes('');
    loadInstances();
  }, []);

  const loadTypes = (query: string) => {
    getInstanceTypes({ variables: { query } });
  };

  const loadInstances = () => {
    getInstances({
      variables: {
        types: selectedTypes.map((type) => ({ node: { kindId: type.id } })),
      },
    });
  };

  const toggleDetail = (instance: Instance) => {
    setDetailId(detailId === instance.internalId ? undefined : instance.internalId);
  };

  return (
    <Layout
      isLoading={false}
      injectedFilter={<div>Injected Filter</div>}
      typeSearch={
        <InstancesTypeSearch
          types={typesQuery.data?.elements || []}
          selectedTypes={selectedTypes}
          onSearch={loadTypes}
          onChange={Actions.setSelectedTypes}
        />
      }
      filter={<Filter onRefresh={loadInstances} />}
      overview={
        <Overview
          tableColumns={tableColumns}
          isLoading={instancesQuery.loading}
          data={instancesQuery.data?.instances || []}
          onRowClick={toggleDetail}
        />
      }
      detail={
        detailId !== undefined && <InstanceDetail instanceId={detailId} onColumnChange={Actions.setTableColumns} />
      }
    />
  );
}
