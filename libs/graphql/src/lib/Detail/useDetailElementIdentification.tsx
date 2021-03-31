import { ApolloError } from '@apollo/client';
import { useQuery } from '@apollo/client';
import React from 'react';

import { GET_DETAIL_ELEMENT } from './GetDetailElement';

export type DetailElementInfo = {
  internalId: string;
  externalId: string;
  typeName: string;
  localization: {
    name: string;
  };
};

export type DetailElementInfoResponse = {
  error?: ApolloError;
  loading: boolean;
  element: DetailElementInfo;
};

export const useDetailElementIdentification = (
  id: string
): DetailElementInfoResponse => {
  const detailId = id.split(':');

  const element: DetailElementInfo = {
    // this id is used for unique object identification
    internalId: detailId[1],
    externalId: '',
    typeName: detailId[0],
    localization: {
      // localization fallback onto __typename
      name: detailId[0],
    },
  };

  const { data, loading, error } = useQuery(GET_DETAIL_ELEMENT, {
    variables: {
      intId: element.internalId,
    },
  });

  const DEFAULT_ELEMENT = { loading, error, element: null };

  if (loading || error) return DEFAULT_ELEMENT;

  switch (element.typeName) {
    case 'Instance':
      const coreElInstance = data.instances[0];
      return {
        ...DEFAULT_ELEMENT,
        element: {
          ...element,
          externalId: coreElInstance.id.value,
          typeName: coreElInstance.coreElement.id,
          localization: coreElInstance.coreElement.localization,
        },
      };
    case 'Dio':
      const dioInstance = data.set.items[0];
      return {
        ...DEFAULT_ELEMENT,
        element: {
          ...element,
          externalId: dioInstance.did.localization.name,
        },
      };
    case 'TaskExecution':
      const teInstance = data.taskExecutionsById[0];
      return {
        ...DEFAULT_ELEMENT,
        element: {
          ...element,
          localization: {
            name: 'Běh úlohy',
          },
          externalId: teInstance.template.localization.name,
        },
      };
    case 'TaskExecutionNode':
      const tExecNodeInstance = data.taskExecutionNodesById[0];
      return {
        ...DEFAULT_ELEMENT,
        element: {
          ...element,
          localization: {
            name: 'Běh úlohy',
          },
          externalId: tExecNodeInstance.template.localization.name,
        },
      };
    default:
      return DEFAULT_ELEMENT;
  }
};
