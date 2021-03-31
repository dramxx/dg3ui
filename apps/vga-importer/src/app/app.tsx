import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  VGAImport,
  ProjectType,
  HandleDeleteType,
  HandleCreateType,
  CreateType,
} from '../VGAImport';
import axios from 'axios';
import { defaultVGATheme } from '@dg3/components';
import { useInterval } from '@dg3/utils';
import { keycloak } from './keycloak';

const URL = process.env.VGA_SERVER_URL;

const StyledApp = styled.div``;

export const App = () => {
  const [folders, setFolders] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const handleCreate: HandleCreateType = (createProject: CreateType) => {
    axios
      .post(
        `${URL}/api/v1/import`,
        {
          sourceFolder: createProject.directoryName,
          name: createProject.newProjectName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + keycloak.token,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete: HandleDeleteType = (projectName: string) => {
    axios
      .post(
        `${URL}/api/v1/deleteProject`,
        {
          name: projectName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + keycloak.token,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const loadFolders: () => void = () =>
    axios
      .get(`${URL}/api/v1/folders`, {
        headers: {
          Authorization: 'Bearer ' + keycloak.token,
        },
      })
      .then((res) => {
        res.data && res.data.folders
          ? setFolders(res.data.folders)
          : setFolders([]);
      })
      .catch((err) => console.log(err));

  const loadProjects: () => void = () =>
    axios
      .get(`${URL}/api/v1/projects`, {
        headers: {
          Authorization: 'Bearer ' + keycloak.token,
        },
      })
      .then((res) => {
        res.data && res.data.projects
          ? setProjects(res.data.projects)
          : setProjects([]);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'login-required',
        promiseType: 'native',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (authenticated) {
          setAuthenticated(true);
        } else {
          console.log('not authenticated', authenticated);
        }
      })
      .catch(function(err) {
        console.log('kc init', err);
      });
    keycloak.onTokenExpired = () => {
      console.log('token expired');
      keycloak
        .updateToken(30)
        .then(() => console.log('token updated'))
        .catch((error) => console.log('updateToken error', error));
    };
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadFolders();
      loadProjects();
    }
  }, [authenticated]);

  useInterval(() => loadProjects(), 3000);

  return (
    <ThemeProvider theme={defaultVGATheme}>
      <StyledApp id={'root'}>
        {authenticated && (
          <VGAImport
            directories={folders}
            projects={projects}
            handleCreate={handleCreate}
            handleDelete={handleDelete}
          />
        )}
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
