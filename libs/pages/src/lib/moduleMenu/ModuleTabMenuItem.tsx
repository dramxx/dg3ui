import * as React from 'react';
import styled, { css } from 'styled-components';

// TODO: zahrnout velikosti do stylu nebo je to uz moc specific?
const StyledItem = styled.div<{
  active: boolean;
}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-width: 118px;
  height: 100%;
  padding: 0 ${(props) => props.theme.spacing.large};

  :hover {
      background: transparent linear-gradient(180deg, #eaeaea 0%, #ffffff 100%) 0%
    0% no-repeat padding-box;
    border-bottom: 5px solid ${(props) => props.theme.colors.grey2};
  }

  ${(props) =>
    props.active
      ? css`
          background: transparent
            linear-gradient(180deg, #eaeaea 0%, #ffffff 100%) 0% 0% no-repeat
            padding-box;
          color: ${props.theme.colors.primary2};
          border-bottom: 5px solid ${props.theme.colors.primary2};
        `
      : css`
          color: ${props.theme.colors.black};
          border-bottom: 5px solid transparent;
        `}}
`;

interface Props {
  active: boolean;
  name: string;
  id: string;
}

export const ModuleTabMenuItem: React.FC<Props> = ({ id, active, name }) => {
  return (
    <StyledItem key={id} active={active}>
      {name}
    </StyledItem>
  );
};
