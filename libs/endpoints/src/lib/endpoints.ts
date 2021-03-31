export const END_POINT = {
  db: {
    path: ['psql'],
  },
  catalog: {
    path: ['catalog'],
  },
  catalogImport: {
    path: ['catalog', 'import'],
  },
  exportedFiles: {
    path: ['psql', 'exportedFiles'],
  },
  getExportedFileById: {
    path: ['psql', 'getExportedFileById'],
  },
  inventory: {
    path: ['inventory'],
  },
  inventoryLoad: {
    path: ['inventory', 'load'],
  },
  importReports: {
    path: ['psql', 'importReports'],
  },
  createSavedFilter: {
    path: ['psql', 'createSavedFilter'],
  },
  deleteSavedFilter: {
    path: ['psql', 'deleteSavedFilter'],
  },
  executionsStart: {
    path: ['executions', 'start'],
  },
  tcExecutionsStart: {
    path: ['tc', 'executions', 'start'],
  },
  tcPlanPause: { path: ['plans', 'pause'] },
  tcPlanResume: { path: ['plans', 'resume'] },
  logout: {
    path: ['logout'],
  },
  savedFilters: {
    path: ['psql', 'savedFilters'],
  },
  taskController: {
    path: ['tc'],
  },
  reqTaskExecution: {
    path: ['tc', 'reqTaskExecution'],
  },
  taskPlanEdit: {
    path: ['tc', 'plans', 'edit'],
  },
  reports: {
    path: ['psql', 'reports'],
  },
  userDetail: {
    path: ['userDetail'],
  },
};
