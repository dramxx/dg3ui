import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { CustomIntervalDialog } from './CustomIntervalDialog';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
`;

export default {
  title: 'TimeFilter|CustomIntervalDialog',
  component: CustomIntervalDialog,
};

export const Default = () => {
  const [interval, setInterval] = useState<Interval>({
    start: subDays(new Date(), 3),
    end: new Date(),
  });

  return (
    <>
      <div>
        {format(interval.start, 'yyyy-MM-dd HH:mm')} &ndash;
        {format(interval.end, 'yyyy-MM-dd HH:mm')}
      </div>
      <hr />
      <StyledWrapper>
        <CustomIntervalDialog
          initialInterval={interval}
          onSubmit={setInterval}
        />
      </StyledWrapper>
    </>
  );
};
