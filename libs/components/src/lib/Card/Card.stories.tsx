import React from 'react';
import { Card } from './Card';
import { storiesOf } from '@storybook/react';

storiesOf('Card', module).add('Card', () => (
  <Card label={'test label'} value={'12345'} width={'200px'} height={'77px'} />
));
