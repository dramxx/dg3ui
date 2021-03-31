import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { SAVED_FILTERS_QUERY, savedFiltersVar } from '@dg3/graphql';

export const useLoadSavedFilters = () => {
  const { data, error } = useQuery(SAVED_FILTERS_QUERY);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (data?.savedFiltersList?.savedFilters) {
      savedFiltersVar(data?.savedFiltersList?.savedFilters);
    }
  }, [data]);
};
