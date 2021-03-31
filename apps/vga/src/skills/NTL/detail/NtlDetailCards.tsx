import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import * as React from 'react';
import styled from 'styled-components';

import { Card, ErrorLabel, LoadingSpinner } from '@dg3/components';
import { GqlCardsConfig } from '@dg3/types';
import { convertGraphqlIntoChartData, roundFloat } from '@dg3/utils';

const StyledCards = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

interface Props {
  id: string;
  config: GqlCardsConfig;
}

export const NtlDetailCards: React.FC<Props> = (props: Props) => {
  const { id, config } = props;
  const { data, loading, error } = useQuery(gql(config.query), {
    variables: {
      id: id,
    },
    fetchPolicy: 'no-cache',
  });

  if (error) return <ErrorLabel>{error.message}</ErrorLabel>;
  if (loading) return <LoadingSpinner />;

  const parsedData = convertGraphqlIntoChartData('DetailCards', config, data);

  return (
    <StyledCards>
      {config.labelConfig.map((item) => (
        <Card
          key={item.accessor}
          height={'77px'}
          width={'200px'}
          label={item.label}
          value={roundFloat(parsedData[item.accessor], 2)}
        />
      ))}
    </StyledCards>
  );
};
