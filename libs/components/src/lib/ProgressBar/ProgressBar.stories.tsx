import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

storiesOf('ProgressBar', module)
  .add('ProgressBar 0%', () => <ProgressBar percentages={0} />)
  .add('ProgressBar 67%', () => <ProgressBar percentages={67} />)
  .add('ProgressBar 100%', () => <ProgressBar percentages={100} />);
