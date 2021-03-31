import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface ModuleTabMenuLinkProps {
  active: boolean;
}

const LinkWrapper: FC<LinkProps & ModuleTabMenuLinkProps> = (props) => {
  // filtering out the "active" prop so that it does not get applied to html element (causes error in console)
  const { active, ...rest } = props;
  return <Link {...rest} />;
};

export const ModuleTabMenuLink = styled(LinkWrapper)<ModuleTabMenuLinkProps>`
  height: 100%;
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSize.big};
  pointer-events: ${(props) => (props.active ? 'none' : 'auto')};
`;
