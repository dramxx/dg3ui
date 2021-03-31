import * as React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { UnfoldLessIcon, UnfoldMoreIcon } from '@dg3/icons';

type Props = {
  folded: boolean;
  onFoldToggle: () => void;
};

const StyledMapFoldingButton = styled.div`
  height: 3rem;
  width: 3rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: ${(props) => props.theme.colors.grey2};
  }
`;

export const MapFoldingButton = (props: Props) => {
  const { onFoldToggle, folded } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledMapFoldingButton className="map_foldingBtn" onClick={onFoldToggle}>
      {folded ? (
        <UnfoldMoreIcon color={theme.colors.black}/>
      ) : (
        <UnfoldLessIcon color={theme.colors.black}/>
      )}
    </StyledMapFoldingButton>
  );
};
