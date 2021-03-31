import {
  DioValue,
  DioValueTypesQueryResponse,
  DioValuesQueryResponse,
  GET_DIO_VALUE_TYPES,
  GET_FULL_DIOS_OVERVIEW,
} from '@api';
import { useLazyQuery } from '@apollo/client';
import Detail from '@components/detail';
import Layout from '@components/layout';
import { OverviewFetchPageSize } from '@model/constants';
import * as SharedStore from '@store/shared';
import React from 'react';

import { AttributesTab, AuthorTab, MediatorTab, ObjectTab } from './components/detail';
import Filter from './components/filter';
import Overview from './components/overview';
import ValueTypeSearch from './components/value-type-search';
import { EDetailTab, Store as ValuesStore } from './model';

export default function Values() {
  const Actions = ValuesStore.useActions();
  const selectedTypes = ValuesStore.useSelector((state) => state.selectedTypes);
  const overviewPage = ValuesStore.useSelector((state) => state.overviewPage);
  const dateRange = SharedStore.useSelector((state) => state.dateRange);

  const [detailId, setDetailId] = React.useState<string>();

  const [getDioValueTypes, typesQuery] = useLazyQuery<DioValueTypesQueryResponse>(GET_DIO_VALUE_TYPES);
  const [getDioValues, valuesQuery] = useLazyQuery<DioValuesQueryResponse>(GET_FULL_DIOS_OVERVIEW);

  React.useEffect(() => {
    loadTypes('');
    loadValues();
  }, []);

  const loadTypes = (query: string) => {
    getDioValueTypes({ variables: { query } });
  };

  const loadValues = () => {
    getDioValues({
      variables: {
        start: dateRange.start,
        end: dateRange.end,
        size: OverviewFetchPageSize,
        offset: OverviewFetchPageSize * overviewPage,
        types: selectedTypes.map((x) => x.id),
      },
    });
  };

  const loadMoreValues = () => {
    const newOverviewPage = overviewPage + 1;
    Actions.setOverviewPage(overviewPage);
    valuesQuery.fetchMore({
      variables: {
        start: dateRange.start,
        end: dateRange.end,
        size: OverviewFetchPageSize,
        offset: OverviewFetchPageSize * newOverviewPage,
        types: selectedTypes.map((x) => x.id),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        } else {
          return {
            ...prev,
            diosSet: {
              ...prev.diosSet,
              items: [...prev.diosSet.items, ...fetchMoreResult.diosSet.items],
            },
          };
        }
      },
    });
  };

  const toggleDetail = (value: DioValue) => {
    setDetailId(detailId === value.id ? undefined : value.id);
  };

  return (
    <Layout
      isLoading={false}
      injectedFilter={<div>Injected Filter</div>}
      typeSearch={
        <ValueTypeSearch
          topics={typesQuery.data?.topics || []}
          selectedTypes={selectedTypes}
          onSearch={loadTypes}
          onChange={Actions.setSelectedTypes}
        />
      }
      filter={<Filter onRefresh={loadValues} />}
      overview={
        <Overview
          isLoading={valuesQuery.loading}
          data={valuesQuery.data?.diosSet.items || []}
          onLoadMore={loadMoreValues}
          onRowClick={toggleDetail}
        />
      }
      detail={
        detailId !== undefined && (
          <Detail defaultTab={EDetailTab.Attributes}>
            <Detail.Tab id={EDetailTab.Attributes} label={'Attributes'}>
              <AttributesTab dioValueId={detailId} />
            </Detail.Tab>
            <Detail.Tab id={EDetailTab.Author} label={'Author'}>
              <AuthorTab dioValueId={detailId} />
            </Detail.Tab>
            <Detail.Tab id={EDetailTab.Mediator} label={'Mediator'}>
              <MediatorTab dioValueId={detailId} />
            </Detail.Tab>
            <Detail.Tab id={EDetailTab.Object} label={'Object'}>
              <ObjectTab dioValueId={detailId} />
            </Detail.Tab>
          </Detail>
        )
      }
    />
  );
}
