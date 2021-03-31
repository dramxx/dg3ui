import { createPublicUser } from '../api/keycloack/keycloak';
import { PublicKeycloakUser } from '@dg3/types';

export type KeycloakUser = {
  id: string;
  name: string;
  locale: string;
  token: string;
};

const userDetails = (req, res) => {
  const user: PublicKeycloakUser = createPublicUser(req.session.user);

  res.json({ user: user });
};

module.exports = {
  userDetails,
};
