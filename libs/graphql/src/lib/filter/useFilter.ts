import { useQuery, useReactiveVar } from '@apollo/client';
import jq from 'jq-web';
import { append, concat, equals, isEmpty, isNil } from 'ramda';
import { useRef } from 'react';

import {
  CORE_ELEMENT_KEYS,
  FilterChip,
  FilterTypeIndicatorKeys,
} from '@dg3/types';
import { contentFilterVar } from '../ContentFilter/ContentFilterVar';
import { getCoreElContentFilterByKey } from '../ContentFilter/convertContentFilter';
import { timeFilterVar } from '../TimeFilter/TimeFilterVar';
import { convertInstanceFilterToTask } from './convertInstanceFilterToTask';
import { convertPlaceFilterToDevice } from './convertPlaceFilterToDevice';
import { GET_INSTANCES_IDS } from './GetInstancesIds';

const usePrevious = <T>(initial: T, value: T) => {
  const prev = useRef(initial);
  if (!equals(prev.current, value)) {
    prev.current = value;
    return [value, true] as const;
  } else {
    return [prev.current, false] as const;
  }
};

const useInstancesIds = (filter: { AND: object[] }) => {
  const { data } = useQuery(GET_INSTANCES_IDS, {
    variables: {
      instancesSetFilter: filter,
    },
    skip: isNil(filter.AND) || isEmpty(filter.AND),
  });

  const internalIds = !isNil(data)
    ? // use empty string [""] to get zero results when instances filter returns zero results
      jq.json(
        data,
        '[ .instancesSet.items[].internalId ] | if length != 0 then . else [""] end'
      )
    : [];

  return usePrevious([], internalIds);
};

const useSingleFilter = (chips: FilterChip[], coreEl: string) => {
  const filter = getCoreElContentFilterByKey(
    chips.filter((item) => item.coreEl === coreEl)
  );
  return usePrevious(null, filter);
};

const useTimeFilter = () => {
  const timeFilter = useReactiveVar(timeFilterVar);
  const filter = {
    from: timeFilter.from,
    to: timeFilter.to,
  };

  return usePrevious({ from: undefined, to: undefined }, filter);
};

export const useFilter = (
  usedFilters: FilterTypeIndicatorKeys[],
  resetPagination: () => void
) => {
  const includesTime = usedFilters.includes('time');
  const includesInfo = usedFilters.includes('info');
  const includesPlace = usedFilters.includes('place');
  const includesDevice = usedFilters.includes('device');
  const includesTask = usedFilters.includes('task');

  const variables = useRef({});
  const contentFilter = useReactiveVar(contentFilterVar);

  const [deviceFilter, deviceFilterChanged] = useSingleFilter(
    contentFilter.chips,
    CORE_ELEMENT_KEYS.DEVICE
  );
  const [placeFilter, placeFilterChanged] = useSingleFilter(
    contentFilter.chips,
    CORE_ELEMENT_KEYS.PLACE
  );

  const [authorFilter, authorFilterChanged] = useInstancesIds(deviceFilter);
  const [objectFilter, objectFilterChanged] = useInstancesIds(placeFilter);

  const [infoFilter, infoFilterChanged] = useSingleFilter(
    contentFilter.chips,
    CORE_ELEMENT_KEYS.INFORMATION
  );
  const [taskFilter, taskFilterChanged] = useSingleFilter(
    contentFilter.chips,
    CORE_ELEMENT_KEYS.TASK
  );
  const [timeFilter, timeFilterChanged] = useTimeFilter();

  if (
    (includesTime && timeFilterChanged) ||
    (includesInfo && infoFilterChanged) ||
    (includesInfo && authorFilterChanged) ||
    (includesInfo && objectFilterChanged) ||
    (includesPlace && placeFilterChanged) ||
    (includesDevice && deviceFilterChanged) ||
    (includesTask && taskFilterChanged) ||
    (includesTask && authorFilterChanged) ||
    (includesTask && objectFilterChanged)
  ) {
    let convertedDeviceFilter = deviceFilter;
    let convertedInfoFilter = infoFilter;
    let convertedTaskFilter = taskFilter;
    if (!isEmpty(placeFilter.AND) && includesPlace && includesDevice) {
      // do not change original object, would result in infinite re-renders
      convertedDeviceFilter = {
        AND: concat(deviceFilter.AND, convertPlaceFilterToDevice(placeFilter)),
      };
    }

    if (includesInfo && includesDevice && !isEmpty(authorFilter)) {
      convertedInfoFilter = {
        AND: append(
          { authorFilter: { ids: authorFilter } },
          convertedInfoFilter.AND
        ),
      };
    }

    if (includesInfo && includesPlace && !isEmpty(objectFilter)) {
      convertedInfoFilter = {
        AND: append(
          { objectFilter: { ids: objectFilter } },
          convertedInfoFilter.AND
        ),
      };
    }

    if (includesTask && includesDevice && !isEmpty(authorFilter)) {
      convertedTaskFilter = {
        AND: append(
          convertInstanceFilterToTask(authorFilter, 'device'),
          taskFilter.AND
        ),
      };
    }

    if (includesTask && includesPlace && !isEmpty(objectFilter)) {
      convertedTaskFilter = {
        AND: append(
          convertInstanceFilterToTask(objectFilter, 'place'),
          taskFilter.AND
        ),
      };
    }

    variables.current = {
      time: includesTime ? { single: timeFilter } : undefined,
      informationSetFilter: includesInfo ? convertedInfoFilter : undefined,
      placesSetFilter: includesPlace ? placeFilter : undefined,
      devicesSetFilter: includesDevice ? convertedDeviceFilter : undefined,
      taskExecutionsFilter: includesTask ? convertedTaskFilter : undefined,
    };
    resetPagination();
  }

  return variables.current;
};
