import React from 'react';
import styled from 'styled-components';

import { DropdownType } from './Dropdown';

interface Props {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  onClick: (id: string) => void;
  type: DropdownType;
}

const StyledDropdownItem = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${(props) =>
    props.active ? props.theme.colors.grey2 : props.theme.colors.white};
  color: ${(props) =>
    props.active ? props.theme.colors.primary2 : props.theme.colors.black};

  :hover {
    background-color: ${(props) =>
      props.active ? props.theme.colors.grey2 : props.theme.colors.grey1};
    color: ${(props) => props.theme.colors.primary2};
    > div > span > svg {
      fill: ${(props) => props.theme.colors.primary2};
      stroke: ${(props) => props.theme.colors.primary2};
    }
  }
  font-size: ${(props) => {
    switch (props.type) {
      case 'primary':
        return props.theme.fontSize.normal;
      case 'secondary':
        return props.theme.fontSize.small;
    }
  }};
`;

const StyledItemRow = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const StyledTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.span`
  display: flex;
  padding-right: 1.5rem;
`;

export const DropdownItem = (props: Props) => {
  const { id, label, icon, onClick } = props;

  const handleClick = () => {
    onClick(id);
  };

  return (
    <React.Fragment>
      <StyledDropdownItem
        className="dropdownItem"
        {...props}
        onClick={handleClick}
      >
        <StyledItemRow className="itemRow">
          {icon && <StyledIcon>{icon}</StyledIcon>}
          <StyledTitle>{label}</StyledTitle>
        </StyledItemRow>
      </StyledDropdownItem>
    </React.Fragment>
  );
};
