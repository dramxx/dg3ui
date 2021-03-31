import { useQuery } from '@apollo/client';
import { isEmpty } from 'ramda';
import React from 'react';
import styled from 'styled-components';

import { Dropdown, includeActiveItemsInDropdownItems } from '@dg3/components';
import {
  ConditionsDropdown,
  ConditionsDropdownItems,
  ValueInputArea,
} from '@dg3/filter-create-dialog';
import {
  SimpleFilter,
  SimpleFilterTabProps,
  SimpleFilterValue,
} from '@dg3/types';
import {
  getFilterEntitiesDropdownItems,
  getFilterEntityAttr,
} from './FilterDropdownItems';
import { GET_SIMPLE_FILTER_VALUE_HINTS } from './FilterHintsQuery';
import {
  FormattedHints,
  attributesWithHints,
  getFilterHintsList,
  getFormattedHints,
} from './getFilterHintsList';

const StyledInputArea = styled.div`
  padding: ${(props) => props.theme.spacing.small};
  background-color: ${(props) => props.theme.colors.grey1};
  width: 100%;
  height: 249px;

  & .dropdownButton {
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const StyledTopPart = styled.div`
  padding-bottom: ${(props) => props.theme.spacing.large};
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .dropdownButton {
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const DROPDOWN_WIDTH = '135px';

export const DcammSimpleFilterTab: React.FC<SimpleFilterTabProps> = (props) => {
  const { onValueChange, coreElement } = props;

  const value: SimpleFilter = props.value || {
    entitySelection: coreElement,
    attributeSelection: getFilterEntityAttr(coreElement, coreElement)[0].id,
    relationalOperator: ConditionsDropdownItems[0].id,
    values: [],
  };

  const entitiesDropdownItems = getFilterEntitiesDropdownItems(coreElement);

  const handleLeftValueChange = (id: string) => {
    const subAttrs = getFilterEntityAttr(coreElement, id);

    onValueChange({
      ...value,
      entitySelection: id,
      attributeSelection: subAttrs[0].id,
    });
  };

  const handleRightValueChange = (id: string) => {
    onValueChange({
      ...value,
      attributeSelection: id,
    });
  };

  const handleOperatorValueChange = (id: string) => {
    onValueChange({
      ...value,
      relationalOperator: id,
    });
  };

  const handleValuesChange = (values: Array<SimpleFilterValue>) => {
    onValueChange({
      ...value,
      values: values,
    });
  };

  const subAttrs = getFilterEntityAttr(coreElement, value.entitySelection);

  const activeEntityItem = entitiesDropdownItems.find(
    (item) => item.id === value.entitySelection
  );
  const activeAttributeItem = subAttrs.find(
    (item) => item.id === value.attributeSelection
  );

  const allHints = useQuery(GET_SIMPLE_FILTER_VALUE_HINTS).data;
  const formattedHints = allHints && getFormattedHints(allHints);

  const hintsList: Array<SimpleFilterValue> = getFilterHintsList(
    formattedHints as FormattedHints,
    coreElement,
    activeAttributeItem.id,
    attributesWithHints
  );

  const autocomplete: boolean =
    Object.values(attributesWithHints).includes(activeAttributeItem.id) &&
    !isEmpty(hintsList);

  return (
    <div>
      <StyledTopPart>
        <Dropdown
          width={DROPDOWN_WIDTH}
          items={includeActiveItemsInDropdownItems(
            entitiesDropdownItems,
            activeEntityItem
          )}
          label={activeEntityItem.label}
          onValueChange={handleLeftValueChange}
        />
        <Dropdown
          width={DROPDOWN_WIDTH}
          items={includeActiveItemsInDropdownItems(
            subAttrs,
            activeAttributeItem
          )}
          label={activeAttributeItem.label}
          onValueChange={handleRightValueChange}
        />
      </StyledTopPart>
      <StyledInputArea>
        <ConditionsDropdown
          width={DROPDOWN_WIDTH}
          active={value.relationalOperator}
          onValueChange={handleOperatorValueChange}
        />
        <ValueInputArea
          values={value.values}
          onValuesChange={handleValuesChange}
          hintsList={hintsList}
          autocomplete={autocomplete}
        />
      </StyledInputArea>
    </div>
  );
};
