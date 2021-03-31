import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ModulePage } from '@dg3/pages';
import { NtlOverviewPagesDefinition } from '../skills/NTL/';

export const Router = () => (
  <Fragment>
    <Route path="/" exact component={() => <Redirect to="/NTL/report" />} />
    <Route
      path="/NTL"
      render={() => (
        <Switch>
          <Route
            path="/NTL/overview/:pageId/:detailId?"
            render={() => <ModulePage overviews={NtlOverviewPagesDefinition} />}
          />
          <Route
            path="/NTL/report/:pageId?"
            render={() => <ModulePage overviews={NtlOverviewPagesDefinition} />}
          />
          <Redirect to={'/NTL/report/'} />
        </Switch>
      )}
    />
  </Fragment>
);
