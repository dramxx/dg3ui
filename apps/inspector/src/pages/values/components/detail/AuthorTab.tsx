import { GET_INSTANCE_ID_FROM_VALUE_ID, IdArrVar } from '@api';
import { useQuery } from '@apollo/client';
import { InstanceDetail } from '@pages/instances/components/detail';
import React from 'react';

import { InstanceIdFromValueId, TabProps } from '../../model';

const AuthorTab = (props: TabProps) => {
  const { dioValueId } = props;

  const { data, loading, error } = useQuery<InstanceIdFromValueId, IdArrVar>(GET_INSTANCE_ID_FROM_VALUE_ID, {
    variables: { ids: [dioValueId] },
  });

  if (loading) return <div>{'Loading...'}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const internalId: string = data.diosSetById.items[0].object.internalId;

  return <InstanceDetail instanceId={internalId} />;
};

export default AuthorTab;
