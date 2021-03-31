import addProdMiddlewares from './addProdMiddlewares';

/**
 * Front-end middleware
 */
const setup = (app, options) => {
  addProdMiddlewares(app, options);

  return app;
};

export default setup;
