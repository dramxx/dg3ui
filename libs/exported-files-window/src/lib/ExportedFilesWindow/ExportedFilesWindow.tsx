import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Popover } from '@dg3/components';
import { backdropVar, exportedFilesVar } from '@dg3/graphql';
import { ExportedFilesIcon } from '@dg3/icons';
import { ExportedFilesSimpleTable } from './ExportedFilesSimpleTable';

const StyledExportedFilesWindowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledExportedFilesWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  max-height: calc(92vh - ${(props) => props.theme.sizes.topBarHeight});
  overflow: auto;
`;

export type ExportedFileType = {
  id: string;
  filename: string;
  created_at: string;
  task_id: string;
  filesize: number;
};

export const ExportedFilesWindow: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const backdrop = useReactiveVar(backdropVar);
  const exportedFiles: Array<ExportedFileType> =
    useReactiveVar(exportedFilesVar) ?? [];

  const handleToggle = () => {
    setShow(!show);
    backdropVar({ ...backdrop, show: !show });
  };

  const handleClose = () => {
    setShow(false);
    backdropVar({ ...backdrop, show: false });
  };

  return (
    <StyledExportedFilesWindowWrapper>
      <Popover
        show={show}
        onToggle={handleToggle}
        placement={'bottom-end'}
        parent={
          <ExportedFilesIcon width={'24px'} height={'24px'} active={show} />
        }
      >
        <StyledExportedFilesWindow>
          <ExportedFilesSimpleTable
            exportedFiles={exportedFiles}
            handleClose={handleClose}
          />
        </StyledExportedFilesWindow>
      </Popover>
    </StyledExportedFilesWindowWrapper>
  );
};
