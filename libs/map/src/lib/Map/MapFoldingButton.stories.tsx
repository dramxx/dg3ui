import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MapFoldingButton } from './MapFoldingButton';

storiesOf('Map/MapFoldingButton', module)
  .add('MapFoldingButton folded', () => (
    <MapFoldingButton folded={true} onFoldToggle={() => {}} />
  ))
  .add('MapFoldingButton unfolded', () => (
    <MapFoldingButton folded={false} onFoldToggle={() => {}} />
  ));
