import React, { FC } from 'react';

import { DetailConfig } from '@dg3/schema';
import { DetailWidget } from './DetailWidget';

interface Props {
  config: DetailConfig;
  elementId: string;
}

export const DetailContent: FC<Props> = (props) => (
  <>
    {props.config.widgets.map((widget) => (
      <DetailWidget
        key={widget.id}
        config={widget}
        elementId={props.elementId}
      />
    ))}
  </>
);
