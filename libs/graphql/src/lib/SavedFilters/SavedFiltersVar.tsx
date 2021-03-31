import { makeVar } from '@apollo/client';

import { SavedFilterType } from '@dg3/saved-filters-window';

export const savedFiltersVar = makeVar<Array<SavedFilterType>>([]);
