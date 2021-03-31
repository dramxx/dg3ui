export type ProjectLogType = {
  level: 'ERROR' | 'WARN' | 'INFO';
  message: string;
};

export type ProjectType = {
  name: string;
  ip: string;
  importProgress: 'ERROR' | 'DONE' | 'IMPORTING';
  log: ProjectLogType[] | null;
};

export type CreateType = {
  newProjectName: string;
  directoryName: string;
};

export type HandleCreateType = (newProject: CreateType) => void;

export type HandleDeleteType = (projectName: string) => void;

export type AddProjectProps = {
  directories: string[];
  projects: ProjectType[];
  handleCreate: HandleCreateType;
};
