import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BinIcon, EditIcon, InfoIcon } from '@dg3/icons';
import { FilterChip, CONTENT_FILTER_TYPE } from '@dg3/types';

type Props = {
  edited: boolean;
  value: FilterChip;
  onInfo: (event: React.MouseEvent, value: FilterChip) => void;
  onEdit: (event: React.MouseEvent, value: FilterChip) => void;
  onDelete: (event: React.MouseEvent, id: string, coreEl: string) => void;
};

const StyledChipWrapper = styled.div<{
  active: boolean;
  expert: boolean;
  inEdit: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border: ${(props) => (props.expert ? '2px' : '1px')} solid
    ${(props) => props.theme.colors.primary2};
  border-radius: ${(props) => props.theme.radius.big};
  background: ${(props) =>
    props.active
      ? props.theme.colors.primary1
      : props.inEdit
      ? props.theme.colors.grey1
      : props.theme.colors.white};
  padding: 0 ${(props) => props.theme.spacing.small};
  min-height: 24px;
  max-height: 24px;
  max-width: 120px;
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
  min-width: 74px;
  max-width: 120px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 100%;
  overflow: hidden;
  vertical-align: middle;
  text-align: center;
`;

const StyledButtons = styled.div<{ active: boolean; width: number }>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 74px;
  width: ${(props) => (props.width ? props.width + 'px' : 'inherit')};
  max-width: ${(props) => (props.width ? props.width + 'px' : 'inherit')};
`;

export const Chip: React.FC<Props> = (props: Props): JSX.Element => {
  const chipLabelRef = useRef();
  const { edited, value, onDelete, onInfo, onEdit } = props;
  const [inEdit, setInEdit] = useState(edited);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setInEdit(edited);
  }, [edited]);

  const labelWidth =
    // @ts-ignore
    chipLabelRef && chipLabelRef.current && chipLabelRef.current.offsetWidth;

  const handleClick = (e) => {
    // block clicks outside of buttons
    e.stopPropagation();
  };

  const handleDelete = (e) => {
    setHover(false);
    onDelete(e, value.id, value.coreEl);
  };

  const handleEdit = (e) => {
    setHover(false);
    setInEdit(true);
    onEdit(e, value);
  };

  const handleInfo = (e) => {
    setHover(false);
    onInfo(e, value);
  };

  return (
    <StyledChipWrapper
      className="chip_wrapper"
      active={hover}
      inEdit={inEdit}
      expert={value.type === CONTENT_FILTER_TYPE.EXPERT}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <StyledChipLabel ref={chipLabelRef} active={hover}>
        {value.label}
      </StyledChipLabel>
      <StyledButtons active={hover} width={labelWidth} onClick={handleClick}>
        <InfoIcon onClick={handleInfo} />
        <EditIcon onClick={handleEdit} />
        <BinIcon onClick={handleDelete} />
      </StyledButtons>
    </StyledChipWrapper>
  );
};
