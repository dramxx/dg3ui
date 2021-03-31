import { makeVar } from '@apollo/client';

import { MapData } from '@dg3/types';
import { defaultMapObject } from './DefaultMapObject';

export const mapVar = makeVar<MapData>(defaultMapObject);
