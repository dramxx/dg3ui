import React from 'react';
import styled from 'styled-components';

const StyledInputText = styled.input`
  height: 24px;
  min-width: 150px;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
  margin-bottom: 10px;
`;

type Props = {
  newProjectName: string;
  setNewProjectName: (newProjectName: string) => void;
};

export const CreateProjectInput: React.FC<Props> = (props: Props) => {
  const { newProjectName, setNewProjectName } = props;

  const handleTextChange = (event) => {
    setNewProjectName(event.target.value);
  };

  return (
    <React.Fragment>
      <div>{'create new project'}</div>
      <StyledInputText
        placeholder={'project name'}
        type={'text'}
        value={newProjectName}
        onChange={handleTextChange}
      />
    </React.Fragment>
  );
};
