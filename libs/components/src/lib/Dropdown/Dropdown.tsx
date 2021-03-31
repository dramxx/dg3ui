import React, { useState } from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';
import { Popover } from '../Popover/Popover';
import { DropdownButton } from './DropdownButton';
import { DropdownItem } from './DropdownItem';

export type DropdownMenuItem = {
  id: string;
  label: React.ReactNode;
  Icon?: React.ComponentType<IconProps>;
  active: boolean;
};

export type DropdownType = 'primary' | 'secondary';

interface Props {
  width?: string;
  items: Array<DropdownMenuItem>;
  label: React.ReactNode;
  onValueChange: (id: string) => void;
  type?: DropdownType;
}

const StyledPopover = styled(Popover)`
  border: 0.1rem solid ${(props) => props.theme.colors.grey2};
  border-radius: 0.5rem;
  padding: 0.1rem;
  box-shadow: ${(props) => props.theme.shadows.shadow3};
  background-color: ${(props) => props.theme.colors.white};
`;

export const Dropdown = (props: Props) => {
  const { width, label, items, onValueChange } = props;
  const [show, setShow] = useState(false);

  const handleValueChange = (event, id) => {
    onValueChange(id);
    setShow(false);
  };

  return (
    <React.Fragment>
      <StyledPopover
        show={show}
        onToggle={setShow}
        placement={'bottom-start'}
        parent={
          <DropdownButton
            width={width}
            isPopoverOpen={show}
            label={label}
            onClick={setShow}
            type={props.type}
          />
        }
      >
        {items.map((item) => (
          <DropdownItem
            key={item.id}
            id={item.id}
            active={item.active}
            icon={
              item.Icon && (
                <item.Icon
                  active={item.active}
                  width={'15px'}
                  height={'15px'}
                />
              )
            }
            label={item.label}
            onClick={(event) => handleValueChange(event, item.id)}
            type={props.type}
          />
        ))}
      </StyledPopover>
    </React.Fragment>
  );
};

Dropdown.defaultProps = {
  type: 'primary',
};
