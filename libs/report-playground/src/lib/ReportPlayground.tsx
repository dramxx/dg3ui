import React, { useState } from 'react';
import styled from 'styled-components';

import { Dropdown, includeActiveItemsInDropdownItems } from '@dg3/components';
import { Report } from '@dg3/report';
import { ReportConfig } from '@dg3/schema';
import { ReportEditor } from './ReportEditor';
import { barChartReport } from './reports/BarChartReport';
import { graphChartReport } from './reports/GraphChartReport';
import { kpiChartReport } from './reports/KpiChartReport';
import { lineChartReport } from './reports/LineChartReport';
import { pieChartReport } from './reports/PieChartReport';
import { scatterPlotReport } from './reports/ScatterPlotReport';
import { sunburstChartReport } from './reports/SunburstChartReport';
import { tableWidgetReport } from './reports/TableWidgetReport';

const StyledReportPlayground = styled.div`
  height: 100%;
  display: flex;
  flex: 1 1 auto;
`;

const StyledEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50vw;
`;

const StyledSelectionWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

type PlaygroundReport = {
  id: string;
  label: string;
  active: boolean;
  report: ReportConfig;
};

const exampleReports: { [key: string]: PlaygroundReport } = {
  GraphChart: {
    id: 'GraphChart',
    label: 'GraphChart',
    active: false,
    report: graphChartReport,
  },
  BarChart: {
    id: 'BarChart',
    label: 'BarChart',
    active: false,
    report: barChartReport,
  },
  KpiChart: {
    id: 'KpiChart',
    label: 'KpiChart',
    active: false,
    report: kpiChartReport,
  },
  LineChart: {
    id: 'LineChart',
    label: 'LineChart',
    active: false,
    report: lineChartReport,
  },
  PieChart: {
    id: 'PieChart',
    label: 'PieChart',
    active: false,
    report: pieChartReport,
  },
  TableWidget: {
    id: 'TableWidget',
    label: 'TableWidget',
    active: false,
    report: tableWidgetReport,
  },
  ScatterPlot: {
    id: 'ScatterPlot',
    label: 'ScatterPlot',
    active: false,
    report: scatterPlotReport,
  },
  SunburstChart: {
    id: 'SunburstChart',
    label: 'SunburstChart',
    active: false,
    report: sunburstChartReport,
  },
};

export const ReportPlayground: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<PlaygroundReport>(
    exampleReports.KpiChart
  );
  const [report, setReport] = useState<ReportConfig>(selectedExample.report);
  const [rendered, setRendered] = useState<ReportConfig>(undefined);

  const items = includeActiveItemsInDropdownItems(
    Object.keys(exampleReports).map((key) => {
      return { ...exampleReports[key] };
    }),
    selectedExample
  );

  return (
    <StyledReportPlayground>
      <StyledEditorWrapper>
        <StyledSelectionWrapper>
          <Dropdown
            items={items}
            label={selectedExample.label}
            onValueChange={(id) => {
              setSelectedExample(exampleReports[id]);
              setReport(exampleReports[id].report);
            }}
          />
        </StyledSelectionWrapper>
        <ReportEditor report={report} onChange={setRendered} />
      </StyledEditorWrapper>
      {rendered && <Report config={rendered} />}
    </StyledReportPlayground>
  );
};
