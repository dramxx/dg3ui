import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { EXPORTED_FILES_QUERY, exportedFilesVar } from '@dg3/graphql';

export const useLoadExportedFiles = () => {
  const { data, error } = useQuery(EXPORTED_FILES_QUERY);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (data?.exportedFiles) {
      exportedFilesVar(data?.exportedFiles);
    }
  }, [data]);
};
