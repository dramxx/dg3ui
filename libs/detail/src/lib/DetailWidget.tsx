import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { LoadingSpinner } from '@dg3/components';
import { DetailWidgetConfig } from '@dg3/schema';
import { DetailWidgetVisualization } from './DetailWidgetVisualization';

const StyledWidget = styled.div`
  margin: ${(props) => props.theme.spacing.normal} 0;
`;

const StyledTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary2};
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

const StyledError = styled.div`
  color: ${(props) => props.theme.colors.red};
`;

interface Props {
  config: DetailWidgetConfig;
  elementId: string;
}

const getQuery = (config: DetailWidgetConfig): string => {
  switch (config.language) {
    case 'jq':
      return config.query;
    case 'jsonpath':
      return config.gql.query;
  }
};

export const DetailWidget: FC<Props> = (props) => {
  const { elementId, config } = props;
  const { locale } = useIntl();

  const { data, error, loading } = useQuery(gql(getQuery(config)), {
    variables: { elementId, language: locale },
  });

  return (
    <StyledWidget>
      {config.title && <StyledTitle>{config.title}</StyledTitle>}
      {error && <StyledError>Error: {error.message}</StyledError>}
      {loading && !data && <LoadingSpinner />}
      {data && (
        <DetailWidgetVisualization
          data={data}
          config={config}
          elementId={elementId}
        />
      )}
    </StyledWidget>
  );
};
