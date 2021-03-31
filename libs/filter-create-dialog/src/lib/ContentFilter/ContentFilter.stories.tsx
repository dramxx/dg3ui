import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CoreElementKey, SimpleFilter, SimpleFilterTabProps } from '@dg3/types';
import { ContentFilter } from './ContentFilter';

const MockSimpleFilter: React.FC<SimpleFilterTabProps> = (props) => {
  return <div>Mock simple filter</div>;
};

const mockOnAddFilter = (
  value: SimpleFilter,
  coreEl: CoreElementKey,
  id?: string
) => {
  return;
};

storiesOf('FilterCreatorDialog', module).add('FilterCreatorDialog', () => (
  <ContentFilter
    coreElement={'DEVICE'}
    simpleFilter={MockSimpleFilter}
    onSimpleFilterAdd={mockOnAddFilter}
  />
));
