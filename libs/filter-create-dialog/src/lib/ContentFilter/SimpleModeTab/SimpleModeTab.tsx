import { isEmpty, isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  ContentFilterTypeKey,
  CoreElementKey,
  FilterChip,
  SimpleFilter,
  SimpleFilterTabProps,
} from '@dg3/types';
import { ContentFilterFooter } from '../ExpertModeTab/ContentFilterFooter';

const StyledSimpleTab = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export type AddSimpleFilterFunctionType = (
  value: SimpleFilter,
  coreEl: CoreElementKey,
  id: string
) => void;

interface Props {
  filterTab: React.ComponentType<SimpleFilterTabProps>;
  onSimpleFilterAdd: AddSimpleFilterFunctionType;
  coreEl: CoreElementKey;
  value: FilterChip;
  onFilterChipValueChange: (value: FilterChip) => void;
  onTabChange: () => void;
  onClose: () => void;
}

export const SimpleModeTab: React.FC<Props> = (props: Props) => {
  const {
    coreEl,
    filterTab: FilterTab,
    onSimpleFilterAdd,
    onTabChange,
    onFilterChipValueChange,
  } = props;
  const [value, setValue] = useState<SimpleFilter>();

  const SIMPLE_FILTER: ContentFilterTypeKey = 'SIMPLE';

  useEffect(() => {
    if (!isNil(props.value) && props.value.type === SIMPLE_FILTER) {
      setValue(JSON.parse(props.value.value));
    }
  }, [props.value]);

  const handleClick = () => {
    if (value) {
      props.onClose();
      onSimpleFilterAdd(value, coreEl, props?.value?.id);
    }
  };

  const handleValueChange = (value: SimpleFilter) => {
    setValue(value);
  };

  const handleTabChange = () => {
    if (!isNil(value)) {
      onFilterChipValueChange({
        ...props.value,
        coreEl: coreEl,
        value: JSON.stringify(value),
      });
    }
    onTabChange();
  };

  return (
    <StyledSimpleTab>
      <FilterTab
        coreElement={coreEl}
        value={value}
        onValueChange={handleValueChange}
      />
      <ContentFilterFooter
        disabledRoute={false}
        expertMode={false}
        edit={!isNil(props.value)}
        disabled={isNil(value) || isEmpty(value.values)}
        handleClick={handleClick}
        onTabChange={handleTabChange}
      />
    </StyledSimpleTab>
  );
};
