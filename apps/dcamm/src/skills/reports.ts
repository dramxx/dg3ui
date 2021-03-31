import { ReportConfig } from '@dg3/schema';
import { ModuleReports } from '@dg3/types';
import { DcammSkillsKeys } from './DcammSkills';
import { deviOverviewReport } from './DEVI/reports/DeviOverviewReport';
import { deviSapActualisationReport } from './DEVI/reports/DeviSapActualisationReport';
import { deviStatisticsReport } from './DEVI/reports/DeviStatisticsReport';
import { deviTemplatesReport } from './DEVI/reports/DeviTemplatesReport';
import { evenOverviewReport } from './EVEN/reports/EvenLogEventReport';
import { loadOverviewReport } from './LOAD/reports/LoadOverviewReport';
import { LOAD_TASK_PLANS_REPORT } from './LOAD/reports/LoadTaskPlansReport';
import { loadValidityReport } from './LOAD/reports/LoadValidityReport';
import { measTechnicalValidationReport } from './MEAS/reports/MeasTechnicalValidationReport';
import { moniAccessibilityLatencyReport } from './MONI/reports/MoniAccessibilityLatencyReport';
import { moniOverviewReport } from './MONI/reports/MoniOverviewReport';
import { MONI_TASK_PLANS_REPORT } from './MONI/reports/MoniTaskPlansReport';
import { paneOverviewReport } from './PANE/reports/PaneOverviewReport';
import { placOverviewReport } from './PLAC/reports/PlacOverviewReport';
import { placSapActualisationReport } from './PLAC/reports/PlacSapActualisationReport';
import { placStatisticsReport } from './PLAC/reports/PlacStatisticsReport';
import { placTemplatesReport } from './PLAC/reports/PlacTemplatesReport';
import { readLP10OverviewReport } from './READ/reports/ReadLP10OverviewReport';
import { readLP15OverviewReport } from './READ/reports/ReadLP15OverviewReport';
import { readREGOverviewReport } from './READ/reports/ReadREGOverviewReport';
import { READ_TASK_PLANS_REPORT } from './READ/reports/ReadTaskPlansReport';

type ReportsType = {
  [key in DcammSkillsKeys]: ReportConfig[];
};
const PREREPORTS: ReportsType = {
  PANE: [paneOverviewReport],
  DEVI: [
    deviOverviewReport,
    deviStatisticsReport,
    deviSapActualisationReport,
    deviTemplatesReport,
  ],
  EVEN: [evenOverviewReport],
  PLAC: [
    placOverviewReport,
    placStatisticsReport,
    placSapActualisationReport,
    placTemplatesReport,
  ],
  LOAD: [loadOverviewReport, loadValidityReport, LOAD_TASK_PLANS_REPORT],
  READ: [
    readLP10OverviewReport,
    readLP15OverviewReport,
    readREGOverviewReport,
    READ_TASK_PLANS_REPORT,
  ],
  MONI: [
    moniOverviewReport,
    moniAccessibilityLatencyReport,
    MONI_TASK_PLANS_REPORT,
  ],
  MEAS: [measTechnicalValidationReport],
};

export const REPORTS: ModuleReports[] = Object.entries(PREREPORTS).map(
  ([module, reports]) => ({
    key: module,
    reports: reports.map((config) => ({
      id: config.id,
      author: 'SYSTEM', // TODO not futureproof
      config: JSON.stringify(config),
      description: config.techDescription,
      module,
      name: config.title,
    })),
  })
);
