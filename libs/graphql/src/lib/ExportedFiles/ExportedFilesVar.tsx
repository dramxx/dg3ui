import { makeVar } from '@apollo/client';

import { ExportedFileType } from '@dg3/exported-files-window';

export const exportedFilesVar = makeVar<Array<ExportedFileType>>([]);
