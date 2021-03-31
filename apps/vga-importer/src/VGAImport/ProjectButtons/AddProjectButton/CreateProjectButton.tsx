import React from 'react';
import styled, { css } from 'styled-components';
import { isEmpty } from 'ramda';
import { HandleCreateType, ProjectType } from '../../VGAImportTypes';

const StyledButtonText = styled.div``;
const StyledButton = styled.button`
  height: 24px;
  margin-left: 10px;
  padding: 0 12px;
  color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.small};
  box-shadow: ${(props) => props.theme.shadows.shadow5};

  ${(props) =>
    props.disabled
      ? css`
          cursor: not-allowed;
          background: ${(props) => props.theme.colors.grey2};
          opacity: 0.6;
        `
      : css`
          cursor: pointer;
          background: ${(props) => props.theme.colors.primary2};
          :hover {
            ${StyledButtonText} {
              transform: scale(1.07);
              transition-duration: 300ms;
            }
          }
          :active {
            box-shadow: none;
          }
        `}
`;

type Props = {
  projects: ProjectType[];
  newProjectName: string;
  tickedDirectory: string;
  handleCreate: HandleCreateType;
  handleClose: (isOpen: boolean) => void;
};

export const CreateProjectButton: React.FC<Props> = (props: Props) => {
  const {
    projects,
    newProjectName,
    tickedDirectory,
    handleCreate,
    handleClose,
  } = props;

  const isDisabled = isEmpty(newProjectName) || isEmpty(tickedDirectory) ||
    !!projects.find((item) => item.name === newProjectName);

  const handleCreateProject = () => {
    handleCreate({ newProjectName, directoryName: tickedDirectory });
    handleClose(false);
  };

  return (
    <StyledButton onClick={handleCreateProject} disabled={isDisabled}>
      <StyledButtonText>{'create'}</StyledButtonText>
    </StyledButton>
  );
};
