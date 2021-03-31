import {
  CreateType,
  HandleCreateType,
  HandleDeleteType,
  ProjectType,
} from './VGAImportTypes';

export const MockDirectories: string[] = [
  'SAMPLE DATA',
  'seznam',
  'skupina v Břeclavi',
  'test 1',
  'test 2',
];

export const MockProjects: ProjectType[] = [
  {
    name: 'Project_01',
    ip: '192.168.1.1',
    importProgress: 'DONE',
    log: [],
  },
  {
    name: 'Project_02',
    ip: '192.168.1.2',
    importProgress: 'ERROR',
    log: [
      {
        level: 'ERROR',
        message: 'Invalid input data, Meter 1524 not found.',
      },
    ],
  },
  {
    name: 'Project_03',
    ip: '192.168.1.3',
    importProgress: 'IMPORTING',
    log: [],
  },
  {
    name: 'Project_04',
    ip: '192.168.1.4',
    importProgress: 'DONE',
    log: [],
  },
];

export const mockCreate: HandleCreateType = (newProject: CreateType) => {
  console.log(
    `Creating...\n\tProject: ${newProject.newProjectName}\n\tDirectory: ${newProject.directoryName}`
  );
};

export const mockDelete: HandleDeleteType = (projectName: string) => {
  console.log('delete project: ', projectName);
};
