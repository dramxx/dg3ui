import axios from 'axios';
import { isEmpty } from 'ramda';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import { LocalizedIsoDate } from '@dg3/components';
import { EXPRESS_SERVER_URL } from '@dg3/endpoints';
import { ExportedFileType } from '@dg3/exported-files-window';
import { useNotification } from '@dg3/graphql';
import { messages } from './messages';

const StyledExportedFiles = styled.div`
  min-width: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  line-height: 25px;
  min-width: 100%;
  width: 100%;
  table-layout: fixed;
`;

const StyledFilterName = styled.span`
  font-size: ${(props) => props.theme.fontSize.small};
`;

const StyledLink = styled.span`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.link};
`;

const StyledRow = styled.tr`
  background-color: ${(props) => props.theme.colors.white};
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.grey2};
  }
  :first-child > td {
    :first-child {
      border-top-left-radius: ${(props) => props.theme.radius.small};
    }
    :last-child {
      border-top-right-radius: ${(props) => props.theme.radius.small};
    }
  }
  :last-child > * {
    :first-child {
      border-bottom-left-radius: ${(props) => props.theme.radius.small};
    }
    :last-child {
      border-bottom-right-radius: ${(props) => props.theme.radius.small};
    }
  }
  :hover {
    background: ${(props) => props.theme.colors.grey1};
    ${StyledFilterName} {
      font-size: calc(${(props) => props.theme.fontSize.small} + 1px);
    }
  }
`;

const StyledCell = styled.td`
  padding: 0 ${(props) => props.theme.spacing.normal};
  > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing.small};
  }
  :nth-child(1) {
    cursor: pointer;
  }
  :nth-child(2) {
    width: 160px;
  }
  :nth-child(3) {
    width: 250px;
  }
`;

const StyledMessage = styled.div`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.normal}`};
`;

type Props = {
  exportedFiles: Array<ExportedFileType>;
  handleClose: () => void;
};

export const ExportedFilesSimpleTable: React.FC<Props> = (props: Props) => {
  const { exportedFiles, handleClose } = props;
  const notification = useNotification();
  const intl = useIntl();

  const handleDownload = (response, filename) => {
    const blob = new Blob([response.data]);
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', blobUrl);
    link.setAttribute('download', `${filename}.zip`);
    if (document && document.body) {
      document.body.appendChild(link);
      link.click();
    }
    link.remove();
    URL.revokeObjectURL(blobUrl);
  };

  const handleClick = (file: ExportedFileType) => {
    axios({
      method: 'GET',
      url: `${EXPRESS_SERVER_URL}/psql/getExportedFileById`,
      params: {
        fileId: file.id,
      },
      responseType: 'blob',
    })
      .then((response) => {
        handleDownload(response, file.filename);
      })
      .catch((err) => {
        notification.error(
          intl.formatMessage(messages.errorFileDownload),
          err.toString()
        );
      });
    handleClose();
  };

  return (
    <StyledExportedFiles>
      <StyledTable>
        <tbody>
          {exportedFiles.map((file) => (
            <StyledRow key={file.id}>
              <StyledCell onClick={() => handleClick(file)}>
                <StyledFilterName>
                  <StyledLink>{file.filename}</StyledLink>
                </StyledFilterName>
              </StyledCell>
              <StyledCell>
                <StyledFilterName>
                  <LocalizedIsoDate isoString={file.created_at} />
                </StyledFilterName>
              </StyledCell>
              {/*<StyledCell>*/}
              {/*  <StyledFilterName>{file.task_id}</StyledFilterName>*/}
              {/*</StyledCell>*/}
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
      {isEmpty(exportedFiles) && (
        <StyledMessage>
          <FormattedMessage {...messages.noExportedFiles} />
        </StyledMessage>
      )}
    </StyledExportedFiles>
  );
};
