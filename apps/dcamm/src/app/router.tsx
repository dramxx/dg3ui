import React, { FC, Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PLAYGROUND_ENABLED } from '@dg3/endpoints';
import { ModulePage, PlaygroundPage } from '@dg3/pages';
import { OverviewPageType } from '@dg3/types';
import { DCAMM_SKILLS, SKILL_OVERVIEWS } from '../skills/DcammSkills';

const SkillSubRoute: FC<{ skill: string }> = (props) => {
  const overviewDefinition: Array<OverviewPageType> =
    SKILL_OVERVIEWS[props.skill];

  return (
    <Route
      path={`/${props.skill}`}
      render={() => (
        <Switch>
          <Route
            path={`/${props.skill}/overview/:pageId/detail/:detailId?`}
            render={() => <ModulePage overviews={overviewDefinition} />}
          />
          <Route
            path={`/${props.skill}/overview/:pageId/`}
            render={() => <ModulePage overviews={overviewDefinition} />}
          />
          <Route
            path={`/${props.skill}/report/:pageId?`}
            render={() => <ModulePage overviews={overviewDefinition} />}
          />
          <Redirect to={`/${props.skill}/report/`} />
        </Switch>
      )}
    />
  );
};

// PLAYGROUND_ENABLED is a boolean value as string
const PlaygroundRoute = PLAYGROUND_ENABLED === 'true' && (
  <Route path="/PLAY" exact component={PlaygroundPage} />
);

export const Router: FC = () => (
  <Fragment>
    <Route path="/" exact component={() => <Redirect to="/PANE/report" />} />
    {PlaygroundRoute}
    {Object.keys(DCAMM_SKILLS).map((skill) => (
      <SkillSubRoute key={skill} skill={skill} />
    ))}
  </Fragment>
);
