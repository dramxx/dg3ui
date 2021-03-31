import * as React from 'react';
import { FoldingItem } from './FoldingItem';
import { storiesOf } from '@storybook/react';

storiesOf('FoldingItem', module).add('FoldingItem', () => (
  <FoldingItem title="Folding item Title" children={<div>Test children</div>} />
));
