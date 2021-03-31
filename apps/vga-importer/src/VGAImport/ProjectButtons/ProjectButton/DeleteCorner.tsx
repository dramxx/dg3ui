import React from 'react';
import styled from 'styled-components';
import { TrashIcon } from '@dg3/icons';
import { HandleDeleteType } from '../../VGAImportTypes';

const StyledDeleteCorner = styled.div`
  position: absolute;
  top: -60px;
  right: -60px;
  height: 107px;
  width: 107px;
  background: ${(props) => props.theme.colors.primary2};
  transform: rotate(45deg);
  cursor: pointer;
`;

const StyledTrashIcon = styled(TrashIcon)`
  transform: rotate(-45deg) translate(-23px, 85px);

  ${StyledDeleteCorner}:hover & {
    transform: rotate(-45deg) translate(-23px, 85px) scale(1.15);
    transition-duration: 400ms;
  }
`;

type Props = {
  name: string;
  handleDelete: HandleDeleteType;
};

export const DeleteCorner: React.FC<Props> = (props: Props) => {
  const { name, handleDelete } = props;
  const handleProjectDelete = (event: React.MouseEvent) => {
    handleDelete(name);
    event.stopPropagation();
  };

  return (
    <StyledDeleteCorner onClick={handleProjectDelete}>
      <StyledTrashIcon />
    </StyledDeleteCorner>
  );
};
