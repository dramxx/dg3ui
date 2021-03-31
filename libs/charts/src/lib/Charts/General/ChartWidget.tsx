import React, { useRef } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import { AdhocTaskDialog } from '@dg3/adhoc-task-dialog';
import { ExportButton } from '@dg3/components';
import { useNotification } from '@dg3/graphql';
import { ImportTemplateDialog } from '@dg3/import-template-dialog';
import { ChartWidgetProps } from '@dg3/types';
import { noop } from '@dg3/utils';
import { ChartTitle } from './ChartTitle';
import { ChartWidgetFooter } from './ChartWidgetFooter';
import { FilterInfo } from './FilterInfo';
import { messages } from './messages';

const ChartWrapper = styled.div<{ showBorder: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background: transparent linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: ${(props) => props.theme.shadows.shadow3};
  border-radius: ${(props) => props.theme.radius.normal};
`;

const StyledTopBar = styled.div<{
  enabledExport: boolean;
  justifyContent: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  padding: ${(props) => props.theme.spacing.small}
    ${(props) =>
      props.justifyContent === 'center' ? '18px' : props.theme.spacing.normal};
`;

const StyledEnd = styled.div`
  position: absolute;
  top: 1px;
  right: -3px;
  display: flex;
  align-items: center;
`;

const StyledActionBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled.div<{ enableMargin: boolean }>`
  min-width: fit-content;
  margin-right: ${(props) =>
    props.enableMargin ? props.theme.spacing.large : '0px'};
`;

const StyledChart = styled.div`
  flex: 1 1 0;
  padding: ${(props) => props.theme.spacing.small}
    ${(props) => props.theme.spacing.normal};
  overflow: hidden;
`;

const StyledNoData = styled.div`
  height: 100%;
  padding: 0 ${(props) => props.theme.spacing.normal};
`;

export const ChartWidget = (props: ChartWidgetProps) => {
  const {
    chart,
    enableAdhoc,
    enableImport,
    disableExport,
    includedFilters = [],
    justifyContent,
    noData,
    onExport,
    overviewModule,
    showBorder,
    showFooter,
    title,
    refetchQuery,
  } = props;

  const intl = useIntl();
  const notification = useNotification();
  const exportMessage = intl.formatMessage(messages.exportStarted);

  const chartRef = useRef<HTMLDivElement>();
  const fetchTimestamp = new Date();

  const handleChartExport = () => {
    notification.info(exportMessage);
    // @ts-ignore
    exportComponentAsPNG(chartRef, {
      fileName: title,
      html2CanvasOptions: {
        logging: false,
        onclone: (document) => {
          Array.from(
            // get chart wrapper by class name
            document.querySelectorAll(ChartWrapper.toString())
          ).forEach((node: HTMLElement) => {
            node.style.boxShadow = 'none';
          });
        },
      },
    });
  };

  return (
    <ChartWrapper ref={chartRef} onClick={noop} showBorder={showBorder}>
      <StyledTopBar enabledExport={!!onExport} justifyContent={justifyContent}>
        <StyledActionBlock>
          {title && (
            <StyledTitle enableMargin={enableImport || enableAdhoc}>
              <ChartTitle justifyContent={justifyContent} title={title} />
            </StyledTitle>
          )}
          {enableImport && <ImportTemplateDialog refetchQuery={refetchQuery} />}
          {enableAdhoc && <AdhocTaskDialog module={overviewModule} />}
        </StyledActionBlock>
        <StyledEnd>
          {!disableExport && (
            <ExportButton
              active={true}
              onClick={onExport ?? handleChartExport}
            />
          )}
          <FilterInfo active={false} includedFilters={includedFilters} />
        </StyledEnd>
      </StyledTopBar>
      {noData ? (
        <StyledNoData>
          <FormattedMessage {...messages.noData} />
        </StyledNoData>
      ) : (
        <StyledChart>{chart}</StyledChart>
      )}
      {showFooter && <ChartWidgetFooter time={fetchTimestamp} />}
    </ChartWrapper>
  );
};
