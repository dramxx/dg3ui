import { ClickAwayListener, Popper } from '@material-ui/core';
import { endOfDay, isEqual, startOfDay } from 'date-fns';
import React, { FC, useRef, useState } from 'react';
import { FormattedDate } from 'react-intl';
import styled from 'styled-components';

import { TimeFilterPreset } from '@dg3/types';
import { CustomIntervalDialog } from './CustomIntervalDialog';
import { ShiftButton } from './ShiftButton';
import { shiftIntervalBack, shiftIntervalForward } from './shiftTimeInterval';
import { TimeFilterDropdown } from './TimeFilterDropdown';
import { TimeFilterPresets } from './TimeFilterPresets';

export const getEndOfToday = () => endOfDay(new Date());
const roundInterval = (interval: Interval) => ({
  start: startOfDay(interval.start),
  end: endOfDay(interval.end),
});

const shiftIntervalForwardWithStop = (interval: Interval) =>
  shiftIntervalForward(interval, getEndOfToday());

const StyledTimeFilter = styled.div`
  width: 274px;
  height: ${(props) => props.theme.sizes.filterHeight};
  display: flex;
  margin-top: ${(props) => props.theme.spacing.small};
`;

export const StyledDateDisplay = styled.div`
  position: relative;
  flex: 1 0 auto;
  font-size: ${(props) => props.theme.fontSize.normal};
  padding: ${(props) => props.theme.spacing.small};
  text-align: center;

  border-style: solid;
  border-width: 1px 0;
  border-color: ${(props) => props.theme.colors.grey2};
  cursor: pointer;
`;
interface StyledDropdownWrapper {
  leftMargin?: number;
}

export const StyledDropdownWrapper = styled.div<StyledDropdownWrapper>`
  position: absolute;
  left: ${(props) => `${props.leftMargin}px` || props.theme.spacing.small};
  top: -2px;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.colors.white};
`;

const StyledDialogWrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing.small};
  border: 1px solid ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
`;

interface Props {
  value: Interval;
  preset: TimeFilterPreset;
  onChange: (value: Interval, preset: TimeFilterPreset) => void;
}

export const TimeFilterComponent: FC<Props> = (props) => {
  const [dialogDisplayed, setDialogDisplayed] = useState(false);
  const ref = useRef(null);

  type ShiftFn = (i: Interval) => Interval;
  const shift = (shiftFn: ShiftFn) => () =>
    props.onChange(roundInterval(shiftFn(props.value)), props.preset);

  const onDropdownSelect = (preset: TimeFilterPreset) => {
    if (preset) {
      props.onChange(TimeFilterPresets[preset].create(getEndOfToday()), preset);
    } else {
      setDialogDisplayed(true);
    }
  };

  return (
    <>
      <StyledTimeFilter ref={ref}>
        <ShiftButton direction="left" onClick={shift(shiftIntervalBack)} />
        <StyledDateDisplay>
          <StyledDropdownWrapper>
            <TimeFilterDropdown
              onPresetSelect={onDropdownSelect}
              preset={props.preset}
            />
          </StyledDropdownWrapper>
          <div onClick={() => setDialogDisplayed(true)}>
            <FormattedDate value={props.value.start} /> &ndash;{' '}
            <FormattedDate value={props.value.end} />
          </div>
        </StyledDateDisplay>
        <ShiftButton
          direction="right"
          onClick={shift(shiftIntervalForwardWithStop)}
          disabled={isEqual(getEndOfToday(), props.value.end)}
        />
      </StyledTimeFilter>
      <Popper open={dialogDisplayed} anchorEl={ref.current} placement="bottom">
        <ClickAwayListener onClickAway={() => setDialogDisplayed(false)}>
          <StyledDialogWrapper>
            <CustomIntervalDialog
              initialInterval={props.value}
              onSubmit={(interval) => {
                setDialogDisplayed(false);
                props.onChange(interval, null);
              }}
            />
          </StyledDialogWrapper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
