import * as compression from 'compression';
import * as express2 from 'express';
import * as path from 'path';

function addProdMiddlewares(app, options) {
  const { GRAPHQL_URL, EXPRESS_SERVER_URL, PLAYGROUND_ENABLED } = process.env;
  const publicPath = options.publicPath || '/';
  const outputPath =
    options.outputPath || path.resolve(__dirname, './apps/gui');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use('/', express2.static(outputPath));

  app.get('*', (req, res) =>
    res.render('index.html', {
      GRAPHQL_URL,
      EXPRESS_SERVER_URL,
      PLAYGROUND_ENABLED,
      PUBLIC_PATH: publicPath,
    })
  );
}

export default addProdMiddlewares;
