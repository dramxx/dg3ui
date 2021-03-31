import { useReactiveVar } from '@apollo/client';
import { isEmpty, isNil } from 'ramda';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { reportsVar } from '@dg3/graphql';
import { OverviewPageType, PageConfig } from '@dg3/types';
import { getAppModuleFromUrl } from '@dg3/utils';
import { ModuleTabMenu } from '../moduleMenu/ModuleTabMenu';

const StyledContent = styled.div`
  height: 100%;
`;

const StyledNoData = styled.div`
  padding: ${(props) => props.theme.spacing.normal};
`;

interface Props {
  overviews?: Array<OverviewPageType>;
}

export const ModulePage: React.FC<Props> = (props) => {
  const { overviews = [] } = props;
  const { pathname } = useLocation();
  const module = getAppModuleFromUrl(pathname);
  const allReports = useReactiveVar(reportsVar);

  const moduleReports = allReports.filter((report) => report.key === module)[0];

  const { pageId } = useParams();

  const activeItemId = pageId ?? '';

  const reports: Array<PageConfig> = !isNil(moduleReports)
    ? moduleReports.reports.map((report) => {
        return { ...report, type: 'REPORT' };
      })
    : [];

  const tabsItems: Array<PageConfig> = reports.concat(overviews);

  return (
    <StyledContent>
      {isEmpty(tabsItems) ? (
        <StyledNoData>No reports available</StyledNoData>
      ) : (
        <ModuleTabMenu menuItems={tabsItems} activeItemId={activeItemId} />
      )}
    </StyledContent>
  );
};
