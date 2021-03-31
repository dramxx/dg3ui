import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledLogoText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.grey3};
  line-height: 1;
`;

const StyledAppIdentity = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.grey1};
  stroke: ${(props) => props.theme.colors.grey1};
`;

interface Props {
  text: string;
}

export const AppLogo: FC<Props> = (props) => (
  <StyledLink to="/">
    <StyledAppIdentity>
      <StyledLogoText>{props.text}</StyledLogoText>
    </StyledAppIdentity>
  </StyledLink>
);
