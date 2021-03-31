import { isEmpty } from 'ramda';
import React from 'react';
import styled from 'styled-components';

import { Log } from './Log/Log';
import { AddProjectButton } from './ProjectButtons/AddProjectButton/AddProjectButton';
import { ProjectButton } from './ProjectButtons/ProjectButton/ProjectButton';
import {
  HandleCreateType,
  HandleDeleteType,
  ProjectType,
} from './VGAImportTypes';

const StyledVGAWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
`;

const StyledVGAImport = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  padding: 40px 40px 20px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

type Props = {
  directories: string[];
  projects: ProjectType[];
  handleCreate: HandleCreateType;
  handleDelete: HandleDeleteType;
};

export const VGAImport: React.FC<Props> = (props: Props) => {
  const { handleCreate, handleDelete, directories, projects } = props;

  return (
    <StyledVGAWrapper>
      <StyledVGAImport>
        {projects.map((item) => (
          <ProjectButton
            key={item.name}
            {...item}
            handleDelete={handleDelete}
          />
        ))}
        <AddProjectButton
          directories={directories}
          projects={projects}
          handleCreate={handleCreate}
        />
      </StyledVGAImport>
      {!isEmpty(projects) && <Log projects={projects} />}
    </StyledVGAWrapper>
  );
};
