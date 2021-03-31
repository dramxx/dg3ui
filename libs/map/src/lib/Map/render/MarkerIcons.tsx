import classNames from 'classnames';
import { isNil } from 'ramda';
import * as React from 'react';

import { PUBLIC_PATH } from '@dg3/endpoints';
import { MarkerValue } from '@dg3/types';

const DEFAULT_MARKER_SIZE = 25;

export function circleIcon(
  value: MarkerValue,
  active: boolean,
  size: number = 25,
  color?: string,
  cluster: boolean = false
): string {
  const className = classNames({
    markerIcon: cluster == false,
    markerClusterIcon: cluster,
    active: active,
  });

  const colorModification = isNil(color) ? '' : `;background: ${color}`;

  const iconStyle =
    `position: relative;top: 50%;left:50%;transform: translate(-50%, -50%);border-radius: 50%; width:${size}px; height:${size}px` +
    colorModification;

  return `<img class='${className}' style='${iconStyle}' src='${PUBLIC_PATH}static/icons/circle.svg' >
    <span style='position: absolute;top: 50%;left:50%;transform: translate(-50%, -50%);color: white;'>
    ${value}
    </span></img>`;
}

// Cluster icon coloring by mark implementation is in branch 837-ca project meg-dg
export function clusterCircleIcon(
  value: MarkerValue,
  childrenCount: number,
  containsActivePoint: boolean
): string {
  return circleIcon(
    value,
    containsActivePoint,
    DEFAULT_MARKER_SIZE + 10,
    undefined,
    true
  );
}

export function markerCircleIcon(value: MarkerValue, active: boolean): string {
  return circleIcon(value, active);
}
