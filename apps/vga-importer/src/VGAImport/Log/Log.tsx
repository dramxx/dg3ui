import { isEmpty, isNil } from 'ramda';
import React from 'react';
import styled from 'styled-components';

import { ProjectType } from '../VGAImportTypes';
import { ProjectLog } from './ProjectLog';

type Props = { projects: ProjectType[] };

const StyledLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLog = styled.div`
  border-top: #6d6e71 1px solid;
`;

const StyledTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: bold;
`;

export const Log: React.FC<Props> = (props: Props) => {
  const logs = [];
  props.projects.forEach((project) => {
    if (isNil(project.log) || isEmpty(project.log)) return;
    logs.push({ name: project.name, log: project.log });
  });

  return (
    !isEmpty(logs) && (
      <StyledLogWrapper>
        <StyledTitle>Importer log</StyledTitle>
        <StyledLog>
          {logs.map((item) => (
            <ProjectLog key={item.name} name={item.name} logs={item.log} />
          ))}
        </StyledLog>
      </StyledLogWrapper>
    )
  );
};
