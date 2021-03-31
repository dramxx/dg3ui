import React from 'react';
import styled from 'styled-components';
import { FolderIcon } from '@dg3/icons';

const StyledDirectoriesList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledDirectory = styled.li`
  height: 20px;
  display: flex;
  align-items: baseline;
  margin-bottom: 2px;
  :last-child {
    margin-bottom: 0;
  }
`;

const StyledInputCheckbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const StyledFolderIcon = styled(FolderIcon)`
  margin-right: 10px;
  cursor: pointer;
`;

type Props = {
  directories: string[];
  tickedDirectory: string;
  setTickedDirectory: (tickedDirectory: string) => void;
};

export const DirectoriesList: React.FC<Props> = (props: Props) => {
  const { directories, tickedDirectory, setTickedDirectory } = props;

  const handleDirectoryClick = (directory) => {
    tickedDirectory === directory
      ? setTickedDirectory('')
      : setTickedDirectory(directory);
  };

  return (
    <StyledDirectoriesList>
      {directories.length ? (
        directories.map((item) => (
          <StyledDirectory key={item}>
            <StyledInputCheckbox
              type={'checkbox'}
              checked={item === tickedDirectory}
              onChange={() => handleDirectoryClick(item)}
            />
            <StyledFolderIcon onClick={() => handleDirectoryClick(item)} />
            {item}
          </StyledDirectory>
        ))
      ) : (
        <StyledDirectory>{'no data'}</StyledDirectory>
      )}
    </StyledDirectoriesList>
  );
};
