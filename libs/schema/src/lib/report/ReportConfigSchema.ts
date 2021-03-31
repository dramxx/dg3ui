import { Array, Record, Static, String } from 'runtypes';

import { CanvasSettingsSchema } from './CanvasSettingsShema';
import { VisualisationWidgetConfigSchema } from './VisualisationWidgetSchema';

export const ReportConfigSchema = Record({
  id: String,
  techDescription: String,
  title: String,
  version: String,
  keywords: Array(String),
  canvasSettings: CanvasSettingsSchema,
  widgets: Array(VisualisationWidgetConfigSchema),
});

export type ReportConfig = Static<typeof ReportConfigSchema>;
