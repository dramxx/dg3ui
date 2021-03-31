import 'react-day-picker/lib/style.css';

import { isAfter, max, min, toDate } from 'date-fns';
import React, { FC, useState } from 'react';
import DayPicker, { DayModifiers, NavbarElementProps } from 'react-day-picker';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { PrimaryButton } from '@dg3/components';
import { FilledLeftArrowIcon, FilledRightArrowIcon } from '@dg3/icons';
import { useDayLabels, useMonthLabels, useWeekStartsOn } from '@dg3/utils';
import { messages } from './messages';

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  position: absolute;
  font-size: ${(props) => props.theme.fontSize.normal};
  top: 1em;

  padding: 0 ${(props) => props.theme.spacing.small};
`;

const Navbar: FC<NavbarElementProps> = (props) => (
  <StyledNavbar className={props.className}>
    <FilledLeftArrowIcon
      onClick={() => props.onPreviousClick()}
      disabled={!props.showPreviousButton}
      active={props.showPreviousButton}
    />
    <FilledRightArrowIcon
      onClick={() => props.onNextClick()}
      disabled={!props.showNextButton}
      active={props.showNextButton}
    />
  </StyledNavbar>
);

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${(props) => props.theme.colors.grey1};
  padding: ${(props) => props.theme.spacing.small};
`;

const StyledDayPicker = styled(DayPicker)`
  .DayPicker-wrapper {
    outline: none;
  }

  .DayPicker-Caption > div {
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.normal};
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  .DayPicker-Day {
    border-radius: 0;
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.grey1};
    padding: 1px;
    font-size: ${(props) => props.theme.fontSize.small};

    outline: none;
  }

  .DayPicker-Day--outside {
    background: transparent;
  }

  .DayPicker-Day--weekend:not(.DayPicker-Day--outside) {
    background-color: ${(props) => props.theme.colors.grey2};
  }

  .DayPicker-Day--disabled {
    color: ${(props) => props.theme.colors.grey2};
  }

  .DayPicker-Day--disabled.DayPicker-Day--weekend {
    color: ${(props) => props.theme.colors.white};
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.primary1};
  }

  .DayPicker-Day.DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: ${(props) => props.theme.colors.primary2};
  }
`;

interface Props {
  initialInterval: Interval;
  onSubmit: (interval: Interval) => void;
}

/*
  props contain initial values only -- assumes dialog is destroyed between submits,
  otherwise, we have to solve the derived state problem
  (see https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)
 */
export const CustomIntervalDialog: FC<Props> = (props) => {
  const weekStartsOn = useWeekStartsOn();
  const dayLabels = useDayLabels();
  const dayLabelShort = useDayLabels('short');
  const monthLabels = useMonthLabels();

  const [startDate, setStartDate] = useState(
    toDate(props.initialInterval.start)
  );
  const [endDate, setEndDate] = useState(toDate(props.initialInterval.end));
  const [selecting, setSelecting] = useState(false);

  const onDaySelect = (day: Date, modifiers: DayModifiers) => {
    if (!modifiers.disabled) {
      if (!selecting) {
        setStartDate(day);
        setEndDate(day);
      }
      setSelecting(!selecting);
    }
  };
  const onDayHover = (day: Date) => {
    if (selecting) {
      setEndDate(day);
    }
  };
  const submit = () => {
    props.onSubmit({
      start: min([startDate, endDate]),
      end: max([startDate, endDate]),
    });
  };

  return (
    <StyledContainer>
      <StyledDayPicker
        numberOfMonths={2}
        onDayClick={onDaySelect}
        onDayMouseEnter={onDayHover}
        selectedDays={[startDate, { from: startDate, to: endDate }]}
        initialMonth={endDate}
        /* limit */
        disabledDays={(day: Date) => isAfter(day, new Date())}
        toMonth={new Date()}
        /* i18n */
        firstDayOfWeek={weekStartsOn}
        months={monthLabels}
        weekdaysLong={dayLabels}
        weekdaysShort={dayLabelShort}
        /* styling */
        showWeekDays={false}
        modifiers={{
          weekend: { daysOfWeek: [0, 6] },
        }}
        navbarElement={Navbar}
      />
      <PrimaryButton onClick={submit} disabled={selecting}>
        <FormattedMessage {...messages.submit} />
      </PrimaryButton>
    </StyledContainer>
  );
};
