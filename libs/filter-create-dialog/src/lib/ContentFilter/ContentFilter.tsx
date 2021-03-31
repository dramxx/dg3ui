import React, { useState } from 'react';
import styled from 'styled-components';

import { Popover } from '@dg3/components';
import { CoreElementKey, SimpleFilter, SimpleFilterTabProps } from '@dg3/types';
import { AddFilterButton } from './AddFilterButton';
import { ContentFilterChipArea } from './ContentFilterChipArea';
import { ContentFilterCreateDialog } from './ContentFilterCreateDialog';

const StyledContentFilter = styled.div<{ active: boolean }>`
  display: flex;
  align-items: flex-end;
  height: ${(props) => props.theme.sizes.filterHeight};
  border: 1px solid ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
  min-width: 100%;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  letter-spacing: 0;
  color: ${(props) =>
    props.active ? props.theme.colors.primary1 : props.theme.colors.grey3};
  padding-bottom: 2px;
  :hover {
    border-color: ${(props) => props.theme.colors.primary2};
  }
`;

type Props = {
  coreElement: CoreElementKey;
  simpleFilter: React.ComponentType<SimpleFilterTabProps>;
  onSimpleFilterAdd: (
    value: SimpleFilter,
    coreEl: CoreElementKey,
    id?: string
  ) => void;
};

export const ContentFilter: React.FC<Props> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const [expertMode, setExpertMode] = useState<boolean>(false);
  const { coreElement, simpleFilter, onSimpleFilterAdd } = props;

  const handleToggle = () => {
    setShow(!show);
  };

  const handleOnClose = () => {
    setShow(false);
  };

  const handleOnModeChange = (expert: boolean) => {
    setExpertMode(expert);
  };

  return (
    <Popover
      show={show}
      onToggle={handleToggle}
      placement={'bottom-start'}
      parent={
        <StyledContentFilter active={show}>
          <ContentFilterChipArea
            coreElement={coreElement}
            simpleFilter={simpleFilter}
            onSimpleFilterAdd={onSimpleFilterAdd}
          />
          <AddFilterButton />
        </StyledContentFilter>
      }
    >
      <ContentFilterCreateDialog
        simpleFilter={simpleFilter}
        coreElement={coreElement}
        expertMode={expertMode}
        onModeChange={handleOnModeChange}
        onClose={handleOnClose}
        onSimpleFilterAdd={onSimpleFilterAdd}
      />
    </Popover>
  );
};
