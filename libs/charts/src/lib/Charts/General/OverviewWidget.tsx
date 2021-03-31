import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ExportButton, PageSize } from '@dg3/components';
import { ExportDialog } from '@dg3/export-dialog';
import { ImportUnsapDialog } from '@dg3/import-unsap-dialog';
import { OverviewWidgetProps } from '@dg3/types';
import { ChartTitle } from './ChartTitle';
import { FilterInfo } from './FilterInfo';
import { messages } from './messages';

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background: transparent linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%) 0 0
    no-repeat padding-box;
  border-radius: ${(props) => props.theme.radius.normal};
  padding: 8px ${(props) => props.theme.spacing.large};
`;

const StyledTopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3px;
`;

const StyledEnd = styled.div`
  display: flex;
  flex-direction: row;
  // TODO: why labels are shrinked without min width specification
  min-width: 20rem;
  align-items: center;
  justify-content: flex-end;
`;

const StyledOverview = styled.div`
  height: 100%;
  padding: ${(props) => props.theme.spacing.small} 0;
  overflow: hidden;
`;

const StyledActionBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled.div`
  min-width: fit-content;
  margin-right: ${(props) => props.theme.spacing.large};
`;

const StyledNoData = styled.div`
  height: 100%;
  padding: ${(props) => props.theme.spacing.normal};
`;

export const OverviewWidget = (props: OverviewWidgetProps) => {
  const {
    overview,
    module,
    title,
    onExport,
    enableImport,
    noData,
    pageSize,
    changePageSize,
    includeFilters,
  } = props;

  // TODO: solve this differently
  const exportComponentByModule = (module: string) => {
    switch (module) {
      case 'DEVI':
      case 'PLAC':
      case 'LOAD':
      case 'PANE':
      case 'READ':
        return <ExportButton active={true} onClick={onExport} />;
      case 'MEAS':
      case 'MONI':
      case 'EVEN':
        return <ExportDialog module={module} onExport={onExport} />;
    }
  };

  return (
    <OverviewWrapper>
      <StyledTopBar>
        <StyledActionBlock>
          {title && (
            <StyledTitle>
              <ChartTitle title={title} />
            </StyledTitle>
          )}
          {enableImport && <ImportUnsapDialog />}
        </StyledActionBlock>
        <StyledEnd>
          <PageSize pageSize={pageSize} setPageSize={changePageSize} />
          {onExport && exportComponentByModule(module)}
          <FilterInfo active={false} includedFilters={includeFilters} />
        </StyledEnd>
      </StyledTopBar>
      {noData ? (
        <StyledNoData>
          <FormattedMessage {...messages.noData} />
        </StyledNoData>
      ) : (
        <StyledOverview>{overview}</StyledOverview>
      )}
    </OverviewWrapper>
  );
};
