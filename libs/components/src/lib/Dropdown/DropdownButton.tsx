import React from 'react';
import styled from 'styled-components';
import { FilledDownArrowIcon, FilledUpArrowIcon } from '@dg3/icons';
import { DropdownType } from './Dropdown';

export interface Props {
  width?: string;
  isPopoverOpen: boolean;
  label: React.ReactNode;
  onClick: (e) => void;
  type: DropdownType;
}

const StyledDropdownButton = styled.div<Props>`
  border: 1px solid ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
  color: ${(props) => props.theme.colors.black};
  padding-left: ${(props) => props.theme.spacing.small};
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: ${(props) => {
    switch (props.type) {
      case 'primary':
        return '24px';
      case 'secondary':
        return '20px';
    }
  }};
`;

const StyledDropdownlabel = styled.div<Props>`
  font-size: ${(props) => {
    switch (props.type) {
      case 'primary':
        return props.theme.fontSize.normal;
      case 'secondary':
        return props.theme.fontSize.small;
    }
  }};
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledDropdownIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.spacing.small};
`;

export const DropdownButton = (props: Props) => {
  const { isPopoverOpen, label } = props;

  return (
    <React.Fragment>
      <StyledDropdownButton className="dropdownButton" {...props}>
        <StyledDropdownlabel className="dropdownlabel" {...props}>
          {label}
        </StyledDropdownlabel>
        <StyledDropdownIcon className="dropdownIcon">
          {isPopoverOpen ? (
            <FilledUpArrowIcon width={'16px'} height={'10px'} active={true} />
          ) : (
            <FilledDownArrowIcon width={'16px'} height={'10px'} active={true} />
          )}
        </StyledDropdownIcon>
      </StyledDropdownButton>
    </React.Fragment>
  );
};
