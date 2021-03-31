import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { FilledLeftArrowIcon, FilledRightArrowIcon } from '@dg3/icons';
import { IconProps } from '@dg3/types';

type Direction = 'left' | 'right';

const getIcon = (direction: Direction): FC<IconProps> => {
  switch (direction) {
    case 'left':
      return FilledLeftArrowIcon;
    case 'right':
      return FilledRightArrowIcon;
  }
};

const StyledShiftButton = styled.div<{
  direction: Direction;
  disabled: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;

  border-style: solid;
  border-width: 1px;
  border-color: ${(props) =>
    !props.disabled ? props.theme.colors.primary2 : props.theme.colors.grey2};
  ${(props) => {
    switch (props.direction) {
      case 'left':
        return css`
          border-bottom-left-radius: ${props.theme.radius.small};
          border-top-left-radius: ${props.theme.radius.small};
        `;
      case 'right':
        return css`
          border-bottom-right-radius: ${props.theme.radius.small};
          border-top-right-radius: ${props.theme.radius.small};
        `;
    }
  }}
  ${(props) =>
    !props.disabled
      ? css`
          border-color: ${props.theme.colors.primary2};
          .icon {
            fill: ${props.theme.colors.primary2};
          }
          &:hover {
            background-color: ${props.theme.colors.primary2};
            .icon {
              fill: ${props.theme.colors.white};
            }
          }
        `
      : css`
          border-color: ${props.theme.colors.grey2};
          cursor: not-allowed;
        `}
`;

interface Props {
  direction: Direction;
  disabled?: boolean;
  onClick: () => void;
}

export const ShiftButton: FC<Props> = (props) => {
  const Icon = getIcon(props.direction);
  return (
    <StyledShiftButton
      direction={props.direction}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Icon className="icon" />
    </StyledShiftButton>
  );
};

ShiftButton.defaultProps = {
  disabled: false,
};
