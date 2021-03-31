import { INSTANCES_ATTRIBUTES_TAB_DETAILS, IdVar, InstanceAttributesTab } from '@api';
import { useQuery } from '@apollo/client';
import { InstanceLabels } from '@model';
import { TabProps } from '@pages/instances/model';
import React from 'react';

import ColumnManager from '../column-manager';

const AttributesTab = (props: TabProps) => {
  const { instanceId, onColumnChange } = props;

  const { data, error, loading } = useQuery<InstanceAttributesTab, IdVar>(INSTANCES_ATTRIBUTES_TAB_DETAILS, {
    variables: { id: instanceId },
  });

  if (loading) return <div>{'Loading...'}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const instances = data.instances[0];

  return (
    <section style={{ padding: '2rem' }}>
      <h3>Core Element: {instances.hlavni_druh.localization.name}</h3>

      <ColumnManager label={InstanceLabels.KIND} onColumnChange={onColumnChange}>
        <strong>Druh: </strong>
        {instances.pod_druh.localization.name}
      </ColumnManager>

      <div>
        <strong>Popis: </strong>
        {instances.pod_druh.localization.description}
      </div>

      <h3>Atributy: </h3>
      {instances.attributes.map((attribute, i) => (
        <div key={i}>
          <div>
            <strong>Id: </strong>
            {attribute.did.id}
          </div>
          <div>
            <strong>Name: </strong>
            {attribute.did.localization.name}
          </div>
          <div>
            <strong>Description: </strong>
            {attribute.did.localization.description}
          </div>
          <div>
            <strong>Value: </strong>
            {JSON.stringify(attribute.normalizedValue)}
          </div>
          <hr />
        </div>
      ))}
    </section>
  );
};

export default AttributesTab;
