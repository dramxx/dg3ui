import { isNil } from 'ramda';
import React from 'react';
import styled from 'styled-components';

import { ProjectLogType } from '../VGAImportTypes';

const StyledProjectLog = styled.pre<ProjectLogType>`
  color: ${(props) =>
    props.level === 'ERROR'
      ? props.theme.colors.red
      : props.level === 'WARN'
      ? '#ff6f00'
      : 'initial'};
`;

type ProjectLogProps = { name: string; logs: ProjectLogType[] | null };

export const ProjectLog = (props: ProjectLogProps) => {
  return (
    <React.Fragment>
      {!isNil(props.logs) &&
        props.logs.map((item) => (
          <StyledProjectLog {...item}>
            {props.name}: {JSON.stringify(item)}
          </StyledProjectLog>
        ))}
    </React.Fragment>
  );
};
