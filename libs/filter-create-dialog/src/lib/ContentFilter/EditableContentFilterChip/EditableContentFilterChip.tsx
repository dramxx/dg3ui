import { useReactiveVar } from '@apollo/client';
import Popover from '@material-ui/core/Popover';
import React, { useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { contentFilterVar } from '@dg3/graphql';
import { BinIcon, EditIcon } from '@dg3/icons';
import {
  CONTENT_FILTER_TYPE,
  FilterChip,
  SimpleFilterTabProps,
} from '@dg3/types';
import { ContentFilterCreateDialog } from '../ContentFilterCreateDialog';
import { AddSimpleFilterFunctionType } from '../SimpleModeTab/SimpleModeTab';
import { EditableContentFilterChipLabel } from './EditableContentFilterChipLabel';

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
      fill: ${(props) => props.theme.colors.grey2};
    }
  }
`;

const StyledButtons = styled.div<{ active: boolean; width: number }>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-width: 74px;
  width: ${(props) => (props.width ? props.width + 'px' : 'inherit')};
  max-width: ${(props) => (props.width ? props.width + 'px' : 'inherit')};
`;

type Props = {
  value: FilterChip;
  simpleFilter: React.ComponentType<SimpleFilterTabProps>;
  onSimpleFilterAdd: AddSimpleFilterFunctionType;
};

export const EditableContentFilterChip: React.FC<Props> = (
  props: Props
): JSX.Element => {
  const chipLabelRef = useRef();
  const chipWrapperRef = useRef();
  const contentFilter = useReactiveVar(contentFilterVar);
  const themeContext = useContext(ThemeContext);
  const { value, simpleFilter, onSimpleFilterAdd } = props;
  const [expertMode, setExpertMode] = useState<boolean>(
    value.type === CONTENT_FILTER_TYPE.EXPERT
  );
  const [hover, setHover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    setHover(false);
    setAnchorEl(null);
    contentFilterVar({
      chips: contentFilter.chips.filter((chip) => chip.id !== value.id),
    });
  };

  // @ts-ignore
  const labelWidth = chipLabelRef?.current?.offsetWidth;

  const blockClick = (e: React.MouseEvent) => {
    // block clicks outside of buttons
    e.stopPropagation();
  };

  const handleOnModeChange = (expert: boolean) => {
    setExpertMode(expert);
  };

  const handleEdit = () => {
    setHover(false);
    setExpertMode(value.type === 'EXPERT');
    setAnchorEl(chipWrapperRef);
  };

  const handleClose = () => {
    setAnchorEl(null);
    value.type !== CONTENT_FILTER_TYPE.EXPERT && setExpertMode(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? value.id : undefined;

  return (
    <StyledChipWrapper
      id={value.id}
      ref={chipWrapperRef}
      className="chip_wrapper"
      active={hover}
      inEdit={open}
      expert={value.type === CONTENT_FILTER_TYPE.EXPERT}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <EditableContentFilterChipLabel
        ref={chipLabelRef}
        label={value.label}
        active={hover}
      />
      <StyledButtons active={hover} width={labelWidth} onClick={blockClick}>
        <EditIcon onClick={handleEdit} color={themeContext.colors.white} />
        {/* TODO merge MUI popover component with ours?? investigate behaviour*/}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl?.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          style={{
            zIndex: themeContext.zIndex.modalContent,
            marginTop: '0.5rem',
          }}
        >
          <ContentFilterCreateDialog
            simpleFilter={simpleFilter}
            coreElement={value.coreEl}
            value={value}
            expertMode={expertMode}
            onModeChange={handleOnModeChange}
            onClose={handleClose}
            onSimpleFilterAdd={onSimpleFilterAdd}
          />
        </Popover>
        <BinIcon onClick={handleDelete} color={themeContext.colors.white} />
      </StyledButtons>
    </StyledChipWrapper>
  );
};
