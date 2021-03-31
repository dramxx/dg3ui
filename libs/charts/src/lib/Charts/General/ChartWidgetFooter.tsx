import * as React from 'react';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import styled from 'styled-components';

import { messages } from './messages';

const StyledWidgetFooter = styled.div`
  display: flex;
  align-items: center;
  min-height: ${(props) => props.theme.spacing.large};
  height: ${(props) => props.theme.spacing.large};
  border-top: 2px solid ${(props) => props.theme.colors.primary2};
  font-size: ${(props) => props.theme.fontSize.small};
  padding: 0 ${(props) => props.theme.spacing.normal};
  letter-spacing: 0px;
`;

interface Props {
  time: Date;
}

export const ChartWidgetFooter: React.FC<Props> = (props) => {
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  return (
    <StyledWidgetFooter>
      <FormattedMessage
        values={{
          date: <FormattedDate value={props.time} />,
          time: <FormattedTime {...timeOptions} value={props.time} />,
        }}
        {...messages.lastUpdate}
      />
    </StyledWidgetFooter>
  );
};
