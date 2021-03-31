import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { VGAImport } from './VGAImport';
import {
  HandleCreateType,
  HandleDeleteType,
  ProjectType,
} from './VGAImportTypes';
import {
  MockProjects,
  MockDirectories,
  mockCreate,
  mockDelete,
} from './VGAImportMockData';

storiesOf('VGA Import', module).add('VGA Import', () => {
  const [projects, setProjects] = useState<ProjectType[]>(MockProjects);

  const handleCreate: HandleCreateType = (newProject) => {
    mockCreate(newProject);
    const addProject: ProjectType = {
      name: newProject.newProjectName,
      ip: 'IP_address',
      importProgress: 'IMPORTING',
      log: [],
    };
    setProjects([...projects, addProject]);
  };

  const handleDelete: HandleDeleteType = (projectName) => {
    mockDelete(projectName);
    const newProjects: ProjectType[] = projects.filter(
      (item) => item.name !== projectName
    );
    setProjects(newProjects);
  };

  return (
    <VGAImport
      projects={projects}
      directories={MockDirectories}
      handleCreate={handleCreate}
      handleDelete={handleDelete}
    />
  );
});

storiesOf('VGA Import', module).add('VGA Import no projects', () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const handleCreate: HandleCreateType = (newProject) => {
    mockCreate(newProject);
    const addProject: ProjectType = {
      name: newProject.newProjectName,
      ip: 'IP_address',
      importProgress: 'IMPORTING',
      log: [],
    };
    setProjects([...projects, addProject]);
  };

  const handleDelete: HandleDeleteType = (projectName) => {
    mockDelete(projectName);
    const newProjects: ProjectType[] = projects.filter(
      (item) => item.name !== projectName
    );
    setProjects(newProjects);
  };

  return (
    <VGAImport
      projects={projects}
      directories={MockDirectories}
      handleCreate={handleCreate}
      handleDelete={handleDelete}
    />
  );
});

storiesOf('VGA Import', module).add('VGA Import no project logs', () => {
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      name: 'Project_01',
      ip: '192.168.1.1',
      importProgress: 'DONE',
      log: [],
    },
  ]);

  const handleCreate: HandleCreateType = (newProject) => {
    mockCreate(newProject);
    const addProject: ProjectType = {
      name: newProject.newProjectName,
      ip: 'IP_address',
      importProgress: 'IMPORTING',
      log: [],
    };
    setProjects([...projects, addProject]);
  };

  const handleDelete: HandleDeleteType = (projectName) => {
    mockDelete(projectName);
    const newProjects: ProjectType[] = projects.filter(
      (item) => item.name !== projectName
    );
    setProjects(newProjects);
  };

  return (
    <VGAImport
      projects={projects}
      directories={MockDirectories}
      handleCreate={handleCreate}
      handleDelete={handleDelete}
    />
  );
});

storiesOf('VGA Import', module).add('VGA Import no directories', () => {
  const [projects, setProjects] = useState<ProjectType[]>(MockProjects);

  const handleCreate: HandleCreateType = (newProject) => {
    mockCreate(newProject);
    const addProject: ProjectType = {
      name: newProject.newProjectName,
      ip: 'IP_address',
      importProgress: 'IMPORTING',
      log: [],
    };
    setProjects([...projects, addProject]);
  };

  const handleDelete: HandleDeleteType = (projectName) => {
    mockDelete(projectName);
    const newProjects: ProjectType[] = projects.filter(
      (item) => item.name !== projectName
    );
    setProjects(newProjects);
  };

  return (
    <VGAImport
      projects={projects}
      directories={[]}
      handleCreate={handleCreate}
      handleDelete={handleDelete}
    />
  );
});
