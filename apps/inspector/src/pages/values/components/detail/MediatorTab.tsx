import { IdVar, VALUES_DETAIL_MEDIATOR_TAB } from '@api';
import { useQuery } from '@apollo/client';
import { InstanceDetail } from '@pages/instances/components/detail';
import React, { useState } from 'react';

import { MediatorDetails, MediatorIds, TabProps } from '../../model';

const MediatorTab = (props: TabProps) => {
  const { dioValueId } = props;

  const [selectedMediatorId, setSelectedMediatorId] = useState<string | undefined>(undefined);

  const { data, loading, error } = useQuery<MediatorDetails, IdVar>(VALUES_DETAIL_MEDIATOR_TAB, {
    variables: { id: dioValueId },
  });

  if (loading) return <div>{'Loading...'}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const mediators: MediatorIds[] = data.diosSetById.items[0].mediators;

  return (
    <>
      <div>
        {mediators.map(({ internalId }: MediatorIds) => (
          <button key={internalId} id={internalId} onClick={() => setSelectedMediatorId(internalId)}>
            {internalId}
          </button>
        ))}
      </div>
      {selectedMediatorId && <InstanceDetail instanceId={selectedMediatorId} />}
    </>
  );
};

export default MediatorTab;
