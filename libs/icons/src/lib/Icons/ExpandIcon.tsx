import React from 'react';
import { UpArrowIcon } from './UpArrowIcon';
import { DownArrowIcon } from './DownArrowIcon';

interface Props {
  className?: string;
  expanded: boolean;
  active?: boolean;
  color?: string;
  width?: string;
  height?: string;
}

export const ExpandIcon: React.FC<Props> = (props: Props) => {
  return getExpandIcon(props);
};

const getExpandIcon = (props: Props) => {
  return props.expanded ? (
    <UpArrowIcon
      className="expandIcon"
      active={props.active}
      width={props.width}
      height={props.height}
      color={props.color}
    />
  ) : (
    <DownArrowIcon
      className="expandIcon"
      active={props.active}
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

ExpandIcon;
