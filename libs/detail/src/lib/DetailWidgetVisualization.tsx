import jq from 'jq-web';
import React, { FC } from 'react';

import { withErrorBoundary } from '@dg3/components';
import {
  AnyObject,
  DetailWidgetConfig,
  OutputDetailWidgetConfig,
  OutputDetailWidgetSchema,
} from '@dg3/schema';
import { convertGraphqlIntoChartData } from '@dg3/utils';
import { AttributeTableWidget } from './AttributeTableWidget';
import { CardWidget } from './CardWidget';
import { JsonWidget } from './JsonWidget';
import { TableWidget } from './TableWidget';

interface Props {
  data: object;
  config: DetailWidgetConfig;
  elementId: string;
}

const convertData = (data: object, config: DetailWidgetConfig) => {
  switch (config.language) {
    case 'jsonpath': {
      const convertedData = convertGraphqlIntoChartData(
        config.type === 'Json' ? 'JsonWidget' : 'TableWidget',
        config.gql,
        data
      );
      return {
        ...config,
        data: convertedData,
        gql: undefined,
        language: undefined,
      };
    }
    case 'jq': {
      const convertedData = AnyObject.check(
        jq.json(data, config.transformation)
      );
      return {
        id: config.id,
        type: config.type,
        title: config.title,
        ...config.config,
        ...convertedData,
      };
    }
  }
};

export const DetailWidgetVisualization: FC<Props> = withErrorBoundary(
  (props) => {
    const { data, config, elementId } = props;
    const convertedConfig: OutputDetailWidgetConfig = OutputDetailWidgetSchema.check(
      convertData(data, config)
    );

    switch (convertedConfig.type) {
      case 'Json':
        return <JsonWidget config={convertedConfig} />;
      case 'Table':
        return <TableWidget config={convertedConfig} />;
      case 'Cards':
        return <CardWidget config={convertedConfig} />;
      case 'Attributes':
        return (
          <AttributeTableWidget
            config={convertedConfig}
            elementId={elementId}
          />
        );
    }
  }
);
