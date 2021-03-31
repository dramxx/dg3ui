import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Popover } from '@dg3/components';
import { InfoIcon } from '@dg3/icons';
import {
  FILTER_TYPE_INDICATORS,
  FilterTypeIndicatorKeys,
  MessageDescriptor,
} from '@dg3/types';
import { FilterIndicator } from './FilterIndicator';
import { messages } from './messages';

const getMessage = (indicator: FilterTypeIndicatorKeys): MessageDescriptor => {
  switch (indicator) {
    case 'place':
      return messages.includeFilterPlace;
    case 'device':
      return messages.includeFilterDevice;
    case 'task':
      return messages.includeFilterTask;
    case 'info':
      return messages.includeFilterInfo;
    case 'time':
      return messages.includeFilterTime;
  }
};

const StyledFilterInfo = styled.div<{ active: boolean }>`
  display: flex;
  cursor: pointer;

  :hover {
    svg > g > g {
      stroke: ${(props) => props.theme.colors.primary1};
    }

    svg > g > text {
      fill: ${(props) => props.theme.colors.primary1};
    }
  }
`;

const StyledFilterInfoBody = styled.div`
  padding: ${(props) => props.theme.spacing.small}
    ${(props) => props.theme.spacing.normal};
`;

const StyledTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const StyledIndicators = styled.div`
  span {
    margin: 0 ${(props) => props.theme.spacing.small};
  }
`;

interface Props {
  active: boolean;
  includedFilters: Array<FilterTypeIndicatorKeys>;
}

export const FilterInfo: React.FC<Props> = (props) => {
  const { active, includedFilters } = props;

  const [show, setShow] = useState(false);

  const handlePopoverToggle = () => {
    setShow(!show);
  };

  return (
    <StyledFilterInfo active={active}>
      <Popover
        show={show}
        onToggle={handlePopoverToggle}
        placement={'bottom-end'}
        parent={<InfoIcon active={show} />}
      >
        <StyledFilterInfoBody className={'filterInfo'}>
          <StyledTitle>
            <FormattedMessage {...messages.includeFilters} />:
          </StyledTitle>
          <StyledIndicators>
            {FILTER_TYPE_INDICATORS.map((key) => (
              <FilterIndicator
                key={key}
                active={includedFilters.includes(key)}
                msg={getMessage(key)}
              />
            ))}
          </StyledIndicators>
        </StyledFilterInfoBody>
      </Popover>
    </StyledFilterInfo>
  );
};
