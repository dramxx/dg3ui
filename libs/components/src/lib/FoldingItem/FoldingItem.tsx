import React, { useState } from 'react';
import styled from 'styled-components';
import { DownArrowIcon, UpArrowIcon } from '@dg3/icons';

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
}

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const FoldingHeaderTitle = styled.div`
  margin-left: 1rem;
  font-weight: bold;
`;

export const FoldingItem = (props: Props) => {
  const [folded, setFolded] = useState<boolean>(false);

  const handleFoldToggle = () => setFolded(!folded);

  return (
    <div>
      <StyledHeader onClick={handleFoldToggle}>
        {folded ? (
          <DownArrowIcon width={'10px'} height={'10px'} />
        ) : (
          <UpArrowIcon width={'10px'} height={'10px'} />
        )}
        <FoldingHeaderTitle>{props.title}</FoldingHeaderTitle>
      </StyledHeader>
      {folded ? null : props.children}
    </div>
  );
};
