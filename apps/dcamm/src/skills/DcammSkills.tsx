import { OverviewPageType } from '@dg3/types';
import { DeviOverviewPagesDefinition } from './DEVI';
import { EvenOverviewPagesDefinition } from './EVEN';
import { LoadOverviewPagesDefinition } from './LOAD';
import { MeasOverviewPagesDefinition } from './MEAS';
import { MoniOverviewPagesDefinition } from './MONI';
import { PlacOverviewPagesDefinition } from './PLAC';
import { ReadOverviewPagesDefinition } from './READ/ReadOverviewPagesDefinition';

export const DCAMM_SKILLS = {
  PANE: 'PANE',
  PLAC: 'PLAC',
  DEVI: 'DEVI',
  READ: 'READ',
  MEAS: 'MEAS',
  EVEN: 'EVEN',
  LOAD: 'LOAD',
  MONI: 'MONI',
};

export type DcammSkillsKeys = keyof typeof DCAMM_SKILLS;

export const SKILL_OVERVIEWS: {
  [key in DcammSkillsKeys]: Array<OverviewPageType>;
} = {
  PANE: [],
  PLAC: PlacOverviewPagesDefinition,
  DEVI: DeviOverviewPagesDefinition,
  READ: ReadOverviewPagesDefinition,
  MEAS: MeasOverviewPagesDefinition,
  EVEN: EvenOverviewPagesDefinition,
  LOAD: LoadOverviewPagesDefinition,
  MONI: MoniOverviewPagesDefinition,
};
