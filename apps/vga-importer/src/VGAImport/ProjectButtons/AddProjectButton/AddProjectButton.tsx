import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { AddMenu } from './AddMenu';
import { PlusIcon } from '@dg3/icons';
import { Popover } from '@dg3/components';
import { AddProjectProps } from '../../VGAImportTypes';
import { ButtonCommon } from '../ButtonCommon';

const StyledPlusIcon = styled(PlusIcon)`
  transition-duration: 700ms;
`;

const StyledAddProjectButton = styled(ButtonCommon)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 300ms ease-out;

  :hover {
    transform: scale(1.05);

    ${StyledPlusIcon} {
      transform: scale(1.17);
    }
  }
`;

export const AddProjectButton: React.FC<AddProjectProps> = (
  props: AddProjectProps
) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeContext = useContext(ThemeContext);

  return (
    // wrapper to disable popover width inherit propagation
    <div>
      <Popover
        show={isOpen}
        onToggle={setIsOpen}
        parent={
          <StyledAddProjectButton>
            <StyledPlusIcon
              width={'70px'}
              height={'70px'}
              color={themeContext.colors.primary2}
            />
          </StyledAddProjectButton>
        }
        placement={'bottom-start'}
      >
        <AddMenu
          handleCreate={props.handleCreate}
          projects={props.projects}
          directories={props.directories}
          handleClose={setIsOpen}
        />
      </Popover>
    </div>
  );
};
