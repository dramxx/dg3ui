import React, { useState } from 'react';
import styled from 'styled-components';
import { CreateProjectInput } from './CreateProjectInput';
import { DirectoriesList } from './DirectoriesList';
import { CreateProjectButton } from './CreateProjectButton';
import { AddProjectProps } from '../../VGAImportTypes';

const StyledAddMenuContainer = styled.div`
  background: ${(props) => props.theme.colors.grey1};
  padding: 10px;
`;

const StyledAddMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 5px;
`;

type AddMenuProps = AddProjectProps & {
  handleClose: (isOpen: boolean) => void;
};

export const AddMenu: React.FC<AddMenuProps> = (props: AddMenuProps) => {
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [tickedDirectory, setTickedDirectory] = useState<string>('');

  return (
    <StyledAddMenuContainer>
      <CreateProjectInput
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
      />
      <div>{'connect a folder with the source data'}</div>
      <StyledAddMenu>
        <DirectoriesList
          directories={props.directories}
          tickedDirectory={tickedDirectory}
          setTickedDirectory={setTickedDirectory}
        />
        <CreateProjectButton
          projects={props.projects}
          tickedDirectory={tickedDirectory}
          newProjectName={newProjectName}
          handleCreate={props.handleCreate}
          handleClose={props.handleClose}
        />
      </StyledAddMenu>
    </StyledAddMenuContainer>
  );
};
