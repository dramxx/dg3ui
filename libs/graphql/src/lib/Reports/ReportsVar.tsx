import { makeVar } from '@apollo/client';

import { ModuleReports } from '@dg3/types';

export const reportsVar = makeVar<Array<ModuleReports>>([]);
