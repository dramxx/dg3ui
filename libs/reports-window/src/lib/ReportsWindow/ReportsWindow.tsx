import { useReactiveVar } from '@apollo/client';
import { isEmpty } from 'ramda';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Popover } from '@dg3/components';
import { backdropVar, reportsVar } from '@dg3/graphql';
import { ReportsIcon } from '@dg3/icons';
import { AppTypesSortOrder } from '@dg3/types';
import { messages } from './messages';
import { SimpleTable } from './SimpleTable';

export type ReportMetaInfo = {
  id: string;
  name: string;
  author: string;
  description?: string;
  config?: string;
  module: string;
};

const StyledReportWindowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledReportsWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  max-height: calc(92vh - ${(props) => props.theme.sizes.topBarHeight});
  overflow: auto;
`;

interface Props {
  reportList?: Array<{ key: string; reports: ReportMetaInfo[] }>;
}

export const ReportsWindow: React.FC<Props> = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const backdrop = useReactiveVar(backdropVar);
  const reports = useReactiveVar(reportsVar);

  const handleToggle = () => {
    setShow(!show);
    backdropVar({ ...backdrop, show: !show });
  };

  const handleClose = () => {
    setShow(false);
    backdropVar({ ...backdrop, show: false });
  };

  const sortedList = reports.sort((a, b) => {
    return AppTypesSortOrder[a.key] - AppTypesSortOrder[b.key];
  });

  return (
    <StyledReportWindowWrapper>
      <Popover
        show={show}
        onToggle={handleToggle}
        placement={'bottom-end'}
        parent={<ReportsIcon width={'24px'} height={'24px'} active={show} />}
      >
        <StyledReportsWindow className={'reportsListWindow'}>
          {!isEmpty(sortedList) ? (
            sortedList.map((report) => (
              <SimpleTable
                key={report.key}
                category={report.key}
                reports={report.reports}
                onRedirect={handleClose}
              />
            ))
          ) : (
            <div>
              <FormattedMessage {...messages.emptyReports} />
            </div>
          )}
        </StyledReportsWindow>
      </Popover>
    </StyledReportWindowWrapper>
  );
};
