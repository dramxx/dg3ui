export const HOMEPAGE_MODULE = 'PANE';

export type AppModuleTypes<T> = {
  PANE: T;
  NTL: T;
  PLAC: T;
  DEVI: T;
  MONI: T;
  MEAS: T;
  READ: T;
  EVEN: T;
  LOAD: T;
  GRAPH: T;
  GRAPHIQL: T;
};

export const AppTypesSortOrder: AppModuleTypes<number> = {
  PANE: 1,
  NTL: 2,
  PLAC: 3,
  DEVI: 4,
  READ: 5,
  MEAS: 6,
  EVEN: 7,
  LOAD: 8,
  MONI: 9,
  GRAPH: 10,
  GRAPHIQL: 11,
};
