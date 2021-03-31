import { DetailConfig } from '@dg3/schema';
import { INSTALLED_DEVICES_CONFIG } from './InstalledDevicesConfig';
import { PLACE_ATTRIBUTES } from './PlaceAttributesConfig';
import { PLACE_CARDS } from './PlaceCards';

export const PLACE_DETAIL: DetailConfig = {
  id: 'place.detail',
  version: '1.0',
  widgets: [PLACE_CARDS, INSTALLED_DEVICES_CONFIG, PLACE_ATTRIBUTES],
};
