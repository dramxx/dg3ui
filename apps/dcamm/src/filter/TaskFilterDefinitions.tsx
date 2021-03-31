import { SimpleFilterDefinition } from '@dg3/types';

export const TASK_SIMPLE_FILTER: SimpleFilterDefinition = {
  TASK: {
    id: 'TASK',
    attrs: [
      {
        id: 'id',
      },
      // FIXME filter not yet implemented on BE
      /*{
        id: 'state',
      },*/
    ],
  },
};
