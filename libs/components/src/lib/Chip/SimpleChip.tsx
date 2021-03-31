import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { BinIcon } from '@dg3/icons';

const StyledChipWrapper = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.primary2};
  border-radius: ${(props) => props.theme.radius.big};
  background: ${(props) =>
    props.active ? props.theme.colors.primary1 : props.theme.colors.white};
  padding: 0 ${(props) => props.theme.spacing.small};
  min-height: 24px;
  max-height: 24px;
  cursor: pointer;
  z-index: ${(props) => props.theme.zIndex.minor};

  svg {
    :hover {
      fill: ${(props) => props.theme.colors.grey3};
    }
  }
`;

const StyledChipLabel = styled.div<{ active: boolean }>`
  font-size: ${(props) => props.theme.fontSize.normal};
  color: ${(props) => props.theme.colors.black};
  display: ${(props) => (props.active ? 'none' : 'block')};
  justify-content: center;
  max-width: 18ch;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 100%;
  overflow: hidden;
`;

const StyledButtons = styled.div<{ active: boolean; width: number }>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width + 'px' : 'inherit')};
  max-width: ${(props) => (props.width ? props.width + 'px' : 'inherit')};
`;

type Props = {
  id: string;
  label: React.ReactNode;
  onDelete: (event: React.MouseEvent, id: string) => void;
};

export const SimpleChip: React.FC<Props> = (props): JSX.Element => {
  const chipLabelRef = useRef();
  const { id, label, onDelete } = props;
  const [hover, setHover] = useState(false);

  const width =
    // @ts-ignore
    chipLabelRef && chipLabelRef.current && chipLabelRef.current.offsetWidth;

  return (
    <StyledChipWrapper
      className="simpleChip"
      active={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StyledChipLabel ref={chipLabelRef} active={hover}>
        {label}
      </StyledChipLabel>
      <StyledButtons active={hover} width={width}>
        <BinIcon onClick={(e) => onDelete(e, id)} />
      </StyledButtons>
    </StyledChipWrapper>
  );
};
