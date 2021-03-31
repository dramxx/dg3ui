import 'react-datepicker/dist/react-datepicker.css';

import { format, isAfter, isEqual } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { StyledDropdownWrapper, getEndOfToday } from '../../../../../libs/time-filter/src';
import { ShiftButton } from '../../../../../libs/time-filter/src/lib/ShiftButton';
import { shiftIntervalBack, shiftIntervalForward } from '../../../../../libs/time-filter/src/lib/shiftTimeInterval';
import { TimeFilterDropdown } from '../../../../../libs/time-filter/src/lib/TimeFilterDropdown';
import { TimeFilterPresets } from '../../../../../libs/time-filter/src/lib/TimeFilterPresets';
import { TimeFilterPreset } from '../../../../../libs/types/src/lib/TimeFilter';
import { DateTimeFormat } from '../../model/constants';
import DatetimeInput, { InputValidity } from '../datetime-input';
import { StyledTimePicker } from './styles';

export interface StyledDiv {
  isValid: boolean;
  alignText?: string;
}

type ShiftFn = (i: Interval) => Interval;
type ShiftFwdFn = (i: Interval, stop: Date) => Interval;

interface Props {
  range: Interval;
  preset: TimeFilterPreset;
  onChange: (value: Interval, preset: TimeFilterPreset) => void;
}

export default function TimePicker({ onChange, range, preset }: Props) {
  const [startDate, setStartDate] = useState<InputValidity>(() => {
    return {
      valid: true,
      value: format(range.start, DateTimeFormat),
    };
  });
  const [endDate, setEndDate] = useState<InputValidity>(() => {
    return {
      valid: true,
      value: format(range.end, DateTimeFormat),
    };
  });
  const [isRangeValid, setRangeValidity] = useState(true);

  useEffect(() => {
    if (range.start !== new Date(startDate.value) || range.end !== new Date(endDate.value)) {
      setStartDate({
        valid: true,
        value: format(range.start, DateTimeFormat),
      });
      setEndDate({
        valid: true,
        value: format(range.end, DateTimeFormat),
      });
    }
  }, [range]);

  const validateRange = (input: InputValidity, isStart: boolean) => {
    let start = new Date(startDate.value);
    let end = new Date(endDate.value);

    if (isStart) {
      start = new Date(input.value);
      setStartDate(input);
    } else {
      end = new Date(input.value);
      setEndDate(input);
    }
    const isValidRange = isAfter(end, start) && input.valid && startDate.valid && endDate.valid;
    setRangeValidity(isValidRange);

    if (isValidRange && input.valid && startDate.valid && endDate.valid) {
      onChange({ start, end }, preset);
    }
  };

  const shift = (shiftFn: ShiftFn) => () => {
    const changedDate = shiftFn({
      end: new Date(endDate.value),
      start: new Date(startDate.value),
    });

    if (isRangeValid) {
      onChange(changedDate, preset);
    }
  };

  const shiftFwd = (shiftFwdFn: ShiftFwdFn) => () => {
    const interval = {
      end: new Date(endDate.value),
      start: new Date(startDate.value),
    };
    const changedDate = shiftFwdFn(interval, getEndOfToday());
    if (isRangeValid) {
      onChange(changedDate, preset);
    }
  };

  const onDropdownSelect = (preset: TimeFilterPreset) => {
    onChange(TimeFilterPresets[preset].create(getEndOfToday()), preset);
  };

  return (
    <StyledTimePicker isValid={isRangeValid}>
      <ShiftButton direction="left" onClick={shift(shiftIntervalBack)} disabled={!isRangeValid} />
      <StyledDropdownWrapper leftMargin={16}>
        <TimeFilterDropdown onPresetSelect={onDropdownSelect} preset={preset} />
      </StyledDropdownWrapper>
      <DatetimeInput date={startDate.value} onChange={(value) => validateRange(value, true)} />
      <span>–</span>
      <DatetimeInput date={endDate.value} onChange={(value) => validateRange(value, false)} alignText="end" />
      <ShiftButton
        direction="right"
        onClick={shiftFwd(shiftIntervalForward)}
        disabled={isEqual(getEndOfToday(), new Date(endDate.value)) || !isRangeValid}
      />
    </StyledTimePicker>
  );
}
