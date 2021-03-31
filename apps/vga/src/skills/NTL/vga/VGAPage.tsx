import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';

import { ErrorLabel, LoadingSpinner } from '@dg3/components';
import { VgaStaticData } from '@dg3/types';
import { UnityPlayer } from '@dg3/unity-player';
import {
  convertGraphqlIntoChartData,
  eachHourOfIntervalInUtc,
} from '@dg3/utils';
import { createVgaDynamicData } from './dataProcessing/createVgaDynamicData';
import { createVgaStaticData } from './dataProcessing/createVgaStaticData';
import { NTL_VGA_DYNAMIC } from './NtlVgaDynamic';
import { NTL_VGA_TOPOLOGY } from './NtlVgaTopology';

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

interface Props {
  id: string;
  from: Date;
  to: Date;
}

export const VGAPage: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const handleSelectNode = (nodeId) => {
    console.log('Selected node ID:', nodeId);
  };

  const from = props.from.toISOString();
  const to = props.to.toISOString();

  const { data, loading, error } = useQuery(gql(NTL_VGA_DYNAMIC.query), {
    variables: {
      id: id,
      from: from,
      to: to,
    },
    fetchPolicy: 'no-cache',
  });

  if (error) return <ErrorLabel>{error.message}</ErrorLabel>;
  if (loading) return <LoadingSpinner />;

  const graphData = convertGraphqlIntoChartData(
    'GraphChart',
    NTL_VGA_TOPOLOGY,
    data
  );

  const staticData = createVgaStaticData(graphData) as VgaStaticData;
  const hours = eachHourOfIntervalInUtc(from, to);
  const dynamicData = createVgaDynamicData(
    NTL_VGA_DYNAMIC,
    data,
    graphData,
    hours
  );

  return (
    <StyledContent>
      <UnityPlayer
        key={props.id}
        staticData={staticData}
        dynamicData={dynamicData}
        onSelectNode={handleSelectNode}
      />
    </StyledContent>
  );
};
