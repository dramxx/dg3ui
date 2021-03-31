import { Popper } from '@material-ui/core';
import { isNil } from 'ramda';
import React, { FC, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';

import { EMPTY_VALUE } from '@dg3/types';

const StyledContent = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledTooltip = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  background: ${(props) => props.theme.colors.grey3};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.radius.small};
`;

interface Props {
  children: ReactNode;
  tooltip: ReactNode;
  className?: string;
}

export const TableCellContent: FC<Props> = (props) => {
  const { children, tooltip, className } = props;
  const content = useRef<HTMLDivElement>();
  const [showTooltip, setShowTooltip] = useState(false);
  const overflow = content.current
    ? content.current.clientWidth < content.current.scrollWidth
    : false;

  return (
    <>
      <StyledContent
        ref={content}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={className}
      >
        {children}
      </StyledContent>
      {!isNil(tooltip) && tooltip !== EMPTY_VALUE && (
        <Popper open={showTooltip && overflow} anchorEl={content.current}>
          <StyledTooltip>{tooltip}</StyledTooltip>
        </Popper>
      )}
    </>
  );
};
