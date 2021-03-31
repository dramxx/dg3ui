import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { AppMenuItemProps, isActiveType } from '@dg3/types';

type PropsType = AppMenuItemProps &
  isActiveType & {
    onActiveChange: (id: string) => void;
    isCollapsed: boolean;
  };

const StyledLink = styled(Link)<{ disabled: boolean }>`
  text-decoration: none;
  pointer-events: ${(props) => props.disabled && 'none'};
  font-size: ${(props) => props.theme.fontSize.large};
`;

const StyledMenuItem = styled.div<isActiveType & { disabled: boolean }>`
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-left: solid 5px transparent;

  ${(props) =>
    props.isActive
      ? css`
          background: transparent
            linear-gradient(
              90deg,
              ${props.theme.colors.white} 0%,
              ${props.theme.colors.grey2} 100%
            )
            0% 0% no-repeat padding-box;
          border-left: solid 5px ${props.theme.colors.primary2};
        `
      : css`
          :hover {
            background: transparent
              linear-gradient(
                90deg,
                ${props.theme.colors.white} 0%,
                ${props.theme.colors.grey1} 100%
              )
              0% 0% no-repeat padding-box;
            border-left: solid 5px ${props.theme.colors.grey3};
          }
        `}
`;

const StyledIcon = styled.div`
  margin: 0 10px;
`;

const StyledTitle = styled.div<isActiveType & { disabled: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary2 : props.theme.colors.black};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  font-size: ${(props) => props.theme.fontSize.large};
  color: ${(props) => props.disabled && props.theme.colors.grey2};
`;

export const AppMenuItem = (props: PropsType) => {
  const Icon = props.icon;
  return (
    <StyledLink to={props.path} disabled={props.disabled}>
      <StyledMenuItem
        isActive={props.isActive}
        disabled={props.disabled}
        onClick={() => {
          !props.disabled && props.onActiveChange(props.id);
        }}
      >
        <StyledIcon>
          <Icon height={'20px'} width={'20px'} active={props.isActive} />
        </StyledIcon>
        {!props.isCollapsed && (
          <StyledTitle isActive={props.isActive} disabled={props.disabled}>
            {props.title}
          </StyledTitle>
        )}
      </StyledMenuItem>
    </StyledLink>
  );
};
