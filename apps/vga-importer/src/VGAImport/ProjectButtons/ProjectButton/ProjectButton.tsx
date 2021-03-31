import React from 'react';
import styled from 'styled-components';
import { LoadingBar } from './LoadingBar';
import { DeleteCorner } from './DeleteCorner';
import { HandleDeleteType, ProjectType } from '../../VGAImportTypes';
import { ButtonCommon } from '../ButtonCommon';

const StyledProjectButton = styled(ButtonCommon)<{ isFinished: boolean }>`
  cursor: ${(props) => (props.isFinished ? 'pointer' : 'initial')};
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const StyledProjectInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledProjectName = styled.div<{ hasError: boolean }>`
  text-align: center;
  font-weight: lighter;
  margin-bottom: 7px;
  color: ${(props) => props.hasError && props.theme.colors.red};
`;

type ProjectButtonProps = ProjectType & {
  handleDelete: HandleDeleteType;
};

export const ProjectButton: React.FC<ProjectButtonProps> = (
  props: ProjectButtonProps
) => {
  const { importProgress, name, ip } = props;

  const handleClick = () => {
    importProgress === 'DONE' && console.log('take us to the project: ', ip);
  };

  return (
    <StyledProjectButton
      onClick={handleClick}
      isFinished={importProgress === 'DONE'}
    >
      <DeleteCorner name={name} handleDelete={props.handleDelete} />
      <StyledProjectInfo>
        <StyledProjectName hasError={importProgress === 'ERROR'}>
          {name}
        </StyledProjectName>
        {importProgress === 'IMPORTING' ? <LoadingBar /> : null}
      </StyledProjectInfo>
    </StyledProjectButton>
  );
};
