import { makeVar } from '@apollo/client';

import { defaultUserObject } from './DefaultUserObject';
import { PublicKeycloakUser } from '@dg3/types';

export const userVar = makeVar<PublicKeycloakUser>(defaultUserObject);
