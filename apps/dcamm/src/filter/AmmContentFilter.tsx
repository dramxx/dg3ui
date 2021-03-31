import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import { ContentFilter } from '@dg3/filter-create-dialog';
import {
  addNewChipIntoContentFilter,
  contentFilterVar,
  messages as filterChipMessages,
  useNotification,
} from '@dg3/graphql';
import {
  CORE_ELEMENT_KEYS,
  CoreElementKey,
  DuplicateChipError,
  FilterChip,
  SimpleFilter,
} from '@dg3/types';
import { randomId } from '@dg3/utils';
import { createSimpleFilterChipLabel } from './createSimpleFilterChipLabel';
import { DcammSimpleFilterTab } from './DcammSimpleFilterTab';
import { messages } from './messages';

const StyledContentFilterBox = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: ${(props) => props.theme.sizes.filterBoxHeight};
  width: 100%;
`;

const StyledLabel = styled.div`
  height: 18px;
  width: fit-content;
  color: ${(props) => props.theme.colors.grey3};
  background-color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSize.small};
  z-index: 1;
  padding: 0 2px;
  position: relative;
  top: 6px;
  left: ${(props) => props.theme.spacing.normal};
`;

const StyledFilter = styled.div`
  padding-left: ${(props) => props.theme.spacing.normal};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${(props) => props.theme.spacing.normal};

  :hover {
    & ${StyledLabel} {
      color: ${(props) => props.theme.colors.primary2};
    }
  }
`;

export const AmmContentFilter: React.FC = () => {
  const notification = useNotification();
  const intl = useIntl();

  const contentFilter = useReactiveVar(contentFilterVar);

  const handleSimpleFilterAdd = (
    value: SimpleFilter,
    coreEl: CoreElementKey,
    id?: string
  ) => {
    const condition: FilterChip = {
      id: id || randomId(),
      label: createSimpleFilterChipLabel(value, intl),
      coreEl,
      type: 'SIMPLE',
      value: JSON.stringify(value),
    };

    try {
      contentFilterVar(addNewChipIntoContentFilter(condition, contentFilter));
    } catch (e) {
      if (e instanceof DuplicateChipError) {
        notification.warning(
          intl.formatMessage(filterChipMessages.filterExists)
        );
      } else {
        console.error(e);
      }
    }
  };

  return (
    <StyledContentFilterBox>
      {Object.keys(CORE_ELEMENT_KEYS).map((key) => (
        <StyledFilter key={key}>
          <StyledLabel>
            <FormattedMessage {...messages[key]} />
          </StyledLabel>
          <ContentFilter
            coreElement={key as CoreElementKey}
            simpleFilter={DcammSimpleFilterTab}
            onSimpleFilterAdd={handleSimpleFilterAdd}
          />
        </StyledFilter>
      ))}
    </StyledContentFilterBox>
  );
};
