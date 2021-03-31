import { makeVar } from '@apollo/client';
import { equals } from 'ramda';

import { DuplicateChipError, FilterChip } from '@dg3/types';
import { defaultContentFilterObject } from './DefaultContentFilterObject';

export type ContentFilter = {
  chips: Array<FilterChip>;
};

export const contentFilterVar = makeVar<ContentFilter>(
  defaultContentFilterObject
);

export const addNewChipIntoContentFilter = (
  condition,
  contentFilter
): ContentFilter => {
  // do not create duplicate Filter Chip
  if (
    contentFilter.chips.some((chip) =>
      equals(JSON.parse(chip.value), JSON.parse(condition.value))
    )
  ) {
    throw new DuplicateChipError();
  }
  return {
    chips: [
      ...contentFilter.chips.filter((chip) => chip.id !== condition.id),
      condition,
    ],
  };
};
