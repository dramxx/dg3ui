import * as React from 'react';

import {
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMilliseconds,
} from 'date-fns';

const formatConst = {
  d: 86400000,
  h: 3600000,
  min: 60000,
  sec: 1000,
  ms: 1,
};

type parsedValueType = {
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
};

const zeroDate = new Date(0);

const getFormattedResult = (
  value: number,
  key: string,
  digits: number = 2
): string => {
  const res = Number.parseFloat(value / formatConst[key] + '').toFixed(digits);
  return `${res}${key}`;
};

const fullParsed = (value: number, parsedValue: parsedValueType): void => {
  let currValue = new Date(value);

  parsedValue.d = differenceInDays(currValue, zeroDate);
  currValue = addDays(currValue, -parsedValue.d);
  parsedValue.h = differenceInHours(currValue, zeroDate);
  currValue = addHours(currValue, -parsedValue.h);
  parsedValue.m = differenceInMinutes(currValue, zeroDate);
  currValue = addMinutes(currValue, -parsedValue.m);
  parsedValue.s = differenceInSeconds(currValue, zeroDate);
  currValue = addSeconds(currValue, -parsedValue.s);
  parsedValue.ms = differenceInMilliseconds(currValue, zeroDate);
};

const getDefaultResult = (
  value: number,
  parsedValue: parsedValueType
): string => {
  let res = '';
  fullParsed(value, parsedValue);
  Object.keys(parsedValue).map(
    (key) => (res = `${res} ${parsedValue[key]}${key}`)
  );

  return res;
};

const getShortResult = (
  value: number,
  parsedValue: parsedValueType
): string => {
  let res = '';
  let firstValue = false;
  fullParsed(value, parsedValue);
  Object.keys(parsedValue).map((key) => {
    if (firstValue) {
      res = `${res} ${parsedValue[key]}${key}`;
    } else if (parsedValue[key] > 0) {
      res = `${res} ${parsedValue[key]}${key}`;
      firstValue = true;
    }
  });

  return res;
};

export const getFormattedDuration = (value: number, format: string): string => {
  let parsedValue = {
    d: -1,
    h: -1,
    m: -1,
    s: -1,
    ms: -1,
  };

  switch (format) {
    case 'long':
      return getDefaultResult(value, parsedValue);
    case 'short':
      return getShortResult(value, parsedValue);
    case 'days':
      return getFormattedResult(value, 'd');
    case 'hours':
      return getFormattedResult(value, 'h');
    case 'minutes':
      return getFormattedResult(value, 'min');
    case 'seconds':
      return getFormattedResult(value, 'sec', 3);
    case 'milliseconds':
      return getFormattedResult(value, 'ms', 0);
    default:
      return getDefaultResult(value, parsedValue);
  }
};
