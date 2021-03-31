import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { CoreElementKey, FilterChip, SimpleFilterTabProps } from '@dg3/types';
import { ExpertModeTab } from './ExpertModeTab/ExpertModeTab';
import {
  AddSimpleFilterFunctionType,
  SimpleModeTab,
} from './SimpleModeTab/SimpleModeTab';

const StyledContentFilterCreateDialog = styled.div`
  width: 308px;
  height: 376px;
  padding: ${(props) => props.theme.spacing.normal};
`;

interface Props {
  simpleFilter: React.ComponentType<SimpleFilterTabProps>;
  onSimpleFilterAdd: AddSimpleFilterFunctionType;
  coreElement: CoreElementKey;
  value?: FilterChip;
  expertMode: boolean;
  onModeChange: (expert: boolean) => void;
  onClose: () => void;
}

export const ContentFilterCreateDialog: React.FC<Props> = (props: Props) => {
  const {
    expertMode,
    onModeChange,
    value,
    onClose,
    coreElement,
    onSimpleFilterAdd,
    simpleFilter,
  } = props;
  const [filterChipValue, setFilterChipValue] = useState<FilterChip>(value);

  return (
    <StyledContentFilterCreateDialog className={'contentFilterCreateDialog'}>
      {expertMode ? (
        <ExpertModeTab
          value={filterChipValue}
          onTabChange={() => onModeChange(false)}
          onClose={onClose}
        />
      ) : (
        <SimpleModeTab
          filterTab={simpleFilter}
          coreEl={coreElement}
          value={filterChipValue}
          onFilterChipValueChange={setFilterChipValue}
          onTabChange={() => onModeChange(true)}
          onClose={onClose}
          onSimpleFilterAdd={onSimpleFilterAdd}
        />
      )}
    </StyledContentFilterCreateDialog>
  );
};
