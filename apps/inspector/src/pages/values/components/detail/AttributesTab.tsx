import { IdVar, VALUES_DETAIL_ATTRIBUTES_TAB } from '@api';
import { useQuery } from '@apollo/client';
import React from 'react';

import { TabProps, ValuesAttributesQueryInterface } from '../../model';

const AttributesTab = (props: TabProps) => {
  const { dioValueId } = props;

  const { data, loading, error } = useQuery<ValuesAttributesQueryInterface, IdVar>(VALUES_DETAIL_ATTRIBUTES_TAB, {
    variables: { id: dioValueId },
  });

  if (loading) return <div>{'Loading...'}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const attributesSet = data.diosSetById.items;

  return (
    <section style={{ padding: '2rem' }}>
      {attributesSet.map((row, i) => (
        <div key={i}>
          <p>
            <strong>Id: </strong>
            {row.did.id}
          </p>
          <p>
            <strong>Name: </strong>
            {row.did.localization.name}
          </p>
          <p>
            <strong>Start Indexing: </strong>
            {row.startIndexing}
          </p>
          <p>
            <strong>Timestamp: </strong>
            {row.timestamp}
          </p>
          <p>
            <strong>Tags: </strong>
            {row.tags.map((tag, i) => (
              <span key={i}>{tag.value.join()}</span>
            ))}
          </p>
          <p>
            <strong>Task Execution: </strong>
            {row?.taskExecution?.id}
          </p>
          <p>
            <strong>Task Execution Node: </strong>
            {row?.taskExecutionNode?.id}
          </p>
          <h3>Validity: </h3>
          <p>
            <strong>Is Duplicity: </strong>
            {row.validity.isDuplicity.toString()}
          </p>
          <p>
            <strong>Is Invalid: </strong>
            {row.validity.isInvalid.toString()}
          </p>
          <h3>Value: </h3>
          <p>
            <strong>Certainty: </strong>
            {row.value.certainity}
          </p>
          <p>
            <strong>Normalized Type: </strong>
            {row.value.normalizedType}
          </p>
          <>
            <strong>Normalized Value: </strong>
            <pre>{JSON.stringify(row.value.normalizedValue, null, 2)}</pre>
          </>
          <p>
            <strong>Raw: </strong>
            {row.value.raw}
          </p>
          <hr />
        </div>
      ))}
    </section>
  );
};

export default AttributesTab;
