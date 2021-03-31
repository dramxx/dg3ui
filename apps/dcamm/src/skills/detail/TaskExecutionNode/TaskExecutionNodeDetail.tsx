import { DetailConfig } from '@dg3/schema';
import { TASK_EXECUTION_NODE_CARDS } from './TaskExecutionNodeCards';

export const TASK_EXECUTION_NODE_DETAIL: DetailConfig = {
  id: 'taskExecution.detail',
  version: '1.0',
  widgets: [TASK_EXECUTION_NODE_CARDS],
};
