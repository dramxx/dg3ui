import * as React from 'react';
import styled from 'styled-components';

import { Dropdown, includeActiveItemsInDropdownItems } from '@dg3/components';
import { ConditionsDropdownItems } from './ConditionsDropdownItems';

interface Props {
  active: string;
  onValueChange: (id: string) => void;
  width: string;
}

const StyledConditionInput = styled.div<{ dropdownWidth: string }>`
  z-index: ${(props) => props.theme.zIndex.minor};
  margin-top: -1.6rem;
  margin-left: -${(props) => props.theme.spacing.small};
  width: ${(props) => props.dropdownWidth};
`;

const findActiveItem = (active) => {
  return ConditionsDropdownItems.find((item) => item.id === active);
};

export const ConditionsDropdown: React.FC<Props> = (props: Props) => {
  const { active, onValueChange, width } = props;

  const activeCondition = findActiveItem(active);

  return (
    <StyledConditionInput dropdownWidth={width}>
      <Dropdown
        width={width}
        items={includeActiveItemsInDropdownItems(
          ConditionsDropdownItems,
          activeCondition
        )}
        label={activeCondition.label}
        onValueChange={(id) => onValueChange(id)}
      />
    </StyledConditionInput>
  );
};
