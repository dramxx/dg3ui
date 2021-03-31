import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

const StyledPopoverChild = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: ${(props) => props.theme.spacing.small} 0;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.normal};
  border: 1px solid ${(props) => props.theme.colors.grey2};
  box-shadow: ${(props) => props.theme.shadows.shadow3};
`;

const StyledPopoverParent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: inherit;
`;

interface Props {
  show: boolean;
  onToggle: (show: boolean) => void;
  parent: React.ReactNode;
  children: React.ReactNode;
  placement?: PopperPlacementType;
  clickAwayDisabled?: boolean;
  onClickAway?: (event) => boolean;
}

export const Popover = (props: Props) => {
  const {
    parent,
    children,
    show,
    onToggle,
    placement,
    clickAwayDisabled,
    onClickAway,
  } = props;
  const themeContext = useContext(ThemeContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    onToggle(true);
  };
  const handleClose = (event) => {
    const hide = onClickAway ? onClickAway(event) : true;
    if (hide) {
      setAnchorEl(null);
      onToggle(false);
    }
  };
  const open = Boolean(anchorEl) && show;
  const id = open ? 'popper' : undefined;

  return (
    <React.Fragment>
      <StyledPopoverParent aria-describedby={id} onClick={handleOpen}>
        {parent}
      </StyledPopoverParent>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        style={{ zIndex: themeContext.zIndex.modalContent }}
      >
        {clickAwayDisabled ? (
          <StyledPopoverChild>{children}</StyledPopoverChild>
        ) : (
          <ClickAwayListener onClickAway={handleClose}>
            <StyledPopoverChild>{children}</StyledPopoverChild>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
};
