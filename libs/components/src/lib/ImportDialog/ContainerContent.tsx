import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ImportFileIcon } from '@dg3/icons';

const StyledList = styled.ul`
  list-style-type: none;
  padding: ${(props) => props.theme.spacing.normal} 0 0
    ${(props) => props.theme.spacing.normal};
  margin: 0;
`;

type Props = { isSelected: boolean; files: Array<File> };

export const ContainerContent: React.FC<Props> = (props: Props) => {
  const { isSelected, files } = props;
  const theme = useContext(ThemeContext);

  return isSelected ? (
    <StyledList>
      {files.map((file) => (
        <li key={file.name}>{file.name}</li>
      ))}
    </StyledList>
  ) : (
    <React.Fragment>
      <ImportFileIcon
        width={'170px'}
        height={'170px'}
        color={theme.colors.grey1}
      />
    </React.Fragment>
  );
};
