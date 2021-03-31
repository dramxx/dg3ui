import { makeVar } from '@apollo/client';

import { UserNotification } from '@dg3/types';

export const notificationsVar = makeVar<Array<UserNotification>>([]);
