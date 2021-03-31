import { END_POINT } from '@dg3/endpoints';
import { PublicKeycloakUser } from '@dg3/types';
import { CONTENT_TYPE, path as uriPath } from '@dg3/utils';
import { KeycloakUser } from '../../user/user';

const Keycloak = require('keycloak-connect');

export function getTokenFromRequest(req) {
  let token = '';

  try {
    token = JSON.parse(req.session['keycloak-token']).access_token;
  } catch (err) {
    console.error(err);
  }

  return token;
}

export const initKeycloack = (config) => {
  const kcconfig = {
    realm: process.env.KC_REALM,
    'auth-server-url': process.env.KC_URL,
    'ssl-required': 'external',
    resource: process.env.KC_RESOURCE,
    credentials: {
      secret: process.env.KC_SECRET,
    },
    'use-resource-role-mappings': true,
    'confidential-port': 0,
  };

  const keycloak = new Keycloak({ store: config.store }, kcconfig);

  console.log('initiazed kc connector', keycloak);

  keycloak.authenticated = (request) => {
    const tokenContent = request?.kauth?.grant?.id_token?.content;
    const rawToken = getTokenFromRequest(request);

    try {
      const user = {
        id: tokenContent.sub,
        name: tokenContent.name,
        locale: tokenContent.locale,
        token: rawToken,
      };

      request.session.user = user;
    } catch (e) {
      console.error(
        'jirReporter parsing from id_token content failed. id_token.content:',
        tokenContent,
        e
      );
    }
  };

  keycloak.deauthenticated = (request) => {
    delete request.session.user;
  };

  keycloak.accessDenied = (request, response) => {
    response.status(403);
    response.type(CONTENT_TYPE.html);
    response.end(
      `Access denied, try <a href="${uriPath(
        END_POINT.logout.path
      )}">logout</a> and sing in again.`
    );
  };

  return keycloak;
};

// converse function for security reasons private user contains plenty of private attrs
export function createPublicUser(
  privateUser: KeycloakUser
): PublicKeycloakUser {
  return {
    name: privateUser.name,
    locale: privateUser.locale,
    token: privateUser.token,
  };
}

export function getPrivateUser(privateUser: KeycloakUser): KeycloakUser {
  if (!privateUser) return;

  return privateUser;
}
