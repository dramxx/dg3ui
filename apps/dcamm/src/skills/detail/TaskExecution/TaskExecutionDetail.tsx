import { DetailConfig } from '@dg3/schema';
import { TASK_EXECUTION_CARDS } from './TaskExecutionCards';
import { TASK_EXECUTION_SAP_INTEGRATION } from './TaskExecutionSAPIntegrationConfig';

export const TASK_EXECUTION_DETAIL: DetailConfig = {
  id: 'taskExecution.detail',
  version: '1.0',
  widgets: [
    TASK_EXECUTION_CARDS,
    TASK_EXECUTION_SAP_INTEGRATION,
  ],
};
