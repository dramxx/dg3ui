import { DetailConfig } from '@dg3/schema';
import { DEVICE_ATTRIBUTES } from './DeviceAttributesConfig';
import { DEVICE_CARDS } from './DeviceCards';
import { DEVICE_CONSUMPTION_POINT_ATTRIBUTES_CONFIG } from './DeviceConsumptionPointAttributesConfig';
import { DEVICE_LOCATION_ATTRIBUTES_CONFIG } from './DeviceLocationAttributesConfig';
import { DEVICE_LOCATION_HISTORY_CONFIG } from './DeviceLocationHistoryConfig';
import { MATERIAL_ATTRIBUTES } from './MaterialAttributesConfig';

export const DEVICE_DETAIL: DetailConfig = {
  id: 'device.detail',
  version: '1.0',
  widgets: [
    DEVICE_CARDS,
    DEVICE_LOCATION_HISTORY_CONFIG,
    DEVICE_ATTRIBUTES,
    MATERIAL_ATTRIBUTES,
    DEVICE_LOCATION_ATTRIBUTES_CONFIG,
    DEVICE_CONSUMPTION_POINT_ATTRIBUTES_CONFIG,
  ],
};
