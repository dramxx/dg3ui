import React from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Dropdown, MenuItem } from '@dg3/components';
import { END_POINT, EXPRESS_SERVER_URL } from '@dg3/endpoints';
import { userVar } from '@dg3/graphql';
import { LogoutIcon } from '@dg3/icons';
import { LanguagesStrings, PublicKeycloakUser } from '@dg3/types';
import { path } from '@dg3/utils';

const StyledUserName = styled.div`
  font-weight: bold;
  padding-left: ${(props) => props.theme.spacing.normal};
  margin-bottom: ${(props) => props.theme.spacing.normal};
  padding-bottom: ${(props) => props.theme.spacing.normal};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey2};
`;

const StyledVersion = styled.div`
  padding-left: ${(props) => props.theme.spacing.normal};
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};
`;

interface Props {
  user: PublicKeycloakUser;
}

export const UserSettingsMenu: React.FC<Props> = (props: Props) => {
  const theme = React.useContext(ThemeContext);
  const { user } = props;
  // const [logout, { called, loading, data }] = useLazyQuery(LOGOUT);

  const languagesValues = Object.keys(LanguagesStrings).map((langKey) => {
    return {
      id: langKey,
      label: LanguagesStrings[langKey],
      active: user.locale === langKey,
    };
  });

  const handleValueChange = (id: string) => {
    userVar({ ...user, locale: id });
  };

  const LOGOUT_URL = `${EXPRESS_SERVER_URL}${path(END_POINT.logout.path)}`;

  return (
    // TODO menu items styling and separation
    <React.Fragment>
      <StyledUserName className={'userName'}>{user.name}</StyledUserName>
      <StyledVersion>Polygon 1.4.0</StyledVersion>
      <MenuItem
        active={false}
        label={'Language'}
        children={
          <Dropdown
            items={languagesValues}
            label={LanguagesStrings[user.locale]}
            onValueChange={handleValueChange}
          />
        }
      />
      <StyledLink href={LOGOUT_URL}>
        <MenuItem
          active={false}
          label={'Logout'}
          children={
            <LogoutIcon
              width={'20px'}
              height={'20px'}
              color={theme.colors.grey3}
            />
          }
        />
      </StyledLink>
    </React.Fragment>
  );
};
