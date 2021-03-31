import { makeVar } from '@apollo/client';

import { DgTheme } from '@dg3/types';
import { defaultTheme } from '../../../../components/src/lib/Theme/defaultTheme';

export const themeVar = makeVar<DgTheme>(defaultTheme);
