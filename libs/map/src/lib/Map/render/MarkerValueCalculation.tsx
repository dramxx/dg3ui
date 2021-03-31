import * as React from 'react';
import { Marker } from 'leaflet';
import { Point, MarkerValue } from '@dg3/types';

export function summation(values: Array<Marker>): MarkerValue {
  return values.reduce((acc, item) => acc + item.options.value, 0);
}

export function simpleValue(point: Point): MarkerValue {
  return point.value;
}
