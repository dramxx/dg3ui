import React from 'react';
import styled from 'styled-components';

import { FilledLeftArrowIcon, FilledRightArrowIcon } from '@dg3/icons';
import { IconProps } from '@dg3/types';

export interface CollapseButtonProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const StyledCollapseButton = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  :hover {
    cursor: pointer;
  }
`;

const StyledBorder = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.grey3};
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  transform: rotate(-45deg);
  background: transparent;
`;

const StyledArrow = styled.span`
  display: flex;
  align-items: center;
  transform: translateX(5px);
  & svg {
    fill: ${(props) => props.theme.colors.grey3};
  }
  ${StyledCollapseButton}:hover & svg {
    fill: ${(props) => props.theme.colors.primary2};
  }
`;

const Icon: React.FC<IconProps & { collapsed: boolean }> = (
  props: IconProps & { collapsed: boolean }
) => {
  const { collapsed, ...rest } = props;
  return (
    <StyledArrow>
      {collapsed ? (
        <FilledRightArrowIcon {...rest} />
      ) : (
        <FilledLeftArrowIcon {...rest} />
      )}
    </StyledArrow>
  );
};

export const CollapseButton = (props: CollapseButtonProps) => {
  const { collapsed, onCollapse } = props;

  return (
    <StyledCollapseButton
      onClick={() => {
        onCollapse(!collapsed);
      }}
    >
      <StyledBorder />
      <Icon collapsed={collapsed} />
    </StyledCollapseButton>
  );
};
