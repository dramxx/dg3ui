import * as React from 'react';
import { Graph } from './Graph';
import { storiesOf } from '@storybook/react';
import { MockGraphData } from './MockGraphData';

storiesOf('Graph', module).add('Graph', () => (
  <Graph data={MockGraphData} height={800} width={800} />
));
