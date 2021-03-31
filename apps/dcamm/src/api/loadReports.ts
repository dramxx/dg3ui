import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { REPORTS_QUERY, reportsVar } from '@dg3/graphql';
import { JsonReport, ModuleReports } from '@dg3/types';
import { REPORTS } from '../skills/reports';

let useLoadReportsInternal = () => {
  const { data, error } = useQuery(REPORTS_QUERY);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (data?.reportsList?.reports) {
      const reports: Array<ModuleReports> = Object.entries(
        data.reportsList.reports
      ).map(([key, reports]: [string, Array<JsonReport>]) => ({
        key,
        reports: reports.map((report) => ({
          ...report,
          id: String(report.id),
          config: JSON.stringify(report.config),
        })),
      }));

      reportsVar(reports);
    }
  }, [data]);
};

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REPORTS_DEV === 'true'
) {
  useLoadReportsInternal = () =>
    useEffect(() => {
      reportsVar(REPORTS);
    }, []);
}

export const useLoadReports = useLoadReportsInternal;
