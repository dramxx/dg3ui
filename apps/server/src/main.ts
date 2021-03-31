import * as express from 'express';
import { resolve } from 'path';
import * as path from 'path';

import { END_POINT } from '@dg3/endpoints';
import { path as uriPath } from '@dg3/utils';
import { catalogImportHandler } from './api/catalog/import';
import { loadHandler } from './api/inventory/load';
import { initKeycloack } from './api/keycloack/keycloak';
import { configureSession } from './api/keycloack/session';
import { taskPlanEditHandler } from './api/taskController/taskPlanHandlers';
import {
  cometHandler,
  taskExecution,
} from './api/taskController/tcEndpointHandlers';
import setup from './middlewares/frontendMiddleware';
import argv2 from './server/argv';

const buildFolder = './apps/gui';

const fileUpload = require('express-fileupload');

const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./api/db/queries');
const user = require('./user/user');
const cors = require('cors');
require('dotenv').config();

const app = express();

const GUI_WEB_CONTEXT = process.env.GUI_WEB_CONTEXT ?? '/';
const PUBLIC_PATH = process.env.GUI_PUBLIC_PATH ?? '/';
const GUI_PROXY_ENABLED = process.env.GUI_PROXY_ENABLED ?? false;

const mainRoute = express.Router();

mainRoute.use(
  fileUpload({
    preserveExtension: 5,
    tempFileDir: '/tmp/',
  })
);

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true,
};

app.use(cors(corsOptions));
app.options('*', cors());

// SHOULD be replaced in production, can cause memory leaks (most likely psql bcs we have it already in project)
const store = new session.MemoryStore();
app.use(configureSession({ store }));

app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/jsonlines' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (process.env.SSO_ENABLED === 'true') {
  const keycloak = initKeycloack({
    store,
  });

  // this setting is for usage of custom logout endpoint
  mainRoute.use(
    keycloak.middleware({
      logout: uriPath(END_POINT.logout.path),
    })
  );

  mainRoute.use(keycloak.protect());

  mainRoute.options(uriPath(END_POINT.userDetail.path), cors());
  mainRoute.get(uriPath(END_POINT.userDetail.path), cors(), user.userDetails);
}

mainRoute.options(uriPath(END_POINT.reports.path), cors());
mainRoute.get(uriPath(END_POINT.reports.path), cors(), db.getReports);

mainRoute.options(uriPath(END_POINT.importReports.path), cors());
mainRoute.post(uriPath(END_POINT.importReports.path), cors(), db.importReports);

mainRoute.options(uriPath(END_POINT.savedFilters.path), cors());
mainRoute.get(uriPath(END_POINT.savedFilters.path), cors(), db.getSavedFilters);

mainRoute.options(uriPath(END_POINT.exportedFiles.path), cors());
mainRoute.get(
  uriPath(END_POINT.exportedFiles.path),
  cors(),
  db.getExportedFiles
);

mainRoute.options(uriPath(END_POINT.getExportedFileById.path), cors());
mainRoute.get(
  uriPath(END_POINT.getExportedFileById.path),
  cors(),
  db.getExportedFileById
);

mainRoute.options(uriPath(END_POINT.reqTaskExecution.path), cors());
mainRoute.post(uriPath(END_POINT.reqTaskExecution.path), cors(), cometHandler);

mainRoute.options(uriPath(END_POINT.taskPlanEdit.path), cors());
mainRoute.post(
  uriPath(END_POINT.taskPlanEdit.path),
  cors(),
  taskPlanEditHandler
);

mainRoute.options(uriPath(END_POINT.catalogImport.path), cors());
mainRoute.post(
  uriPath(END_POINT.catalogImport.path),
  cors(),
  catalogImportHandler
);

mainRoute.options(uriPath(END_POINT.inventoryLoad.path), cors());
mainRoute.post(uriPath(END_POINT.inventoryLoad.path), cors(), loadHandler);

mainRoute.options(uriPath(END_POINT.tcExecutionsStart.path), cors());
mainRoute.post(
  uriPath(END_POINT.tcExecutionsStart.path),
  cors(),
  taskExecution
);

mainRoute.options(uriPath(END_POINT.createSavedFilter.path), cors());
mainRoute.post(
  uriPath(END_POINT.createSavedFilter.path),
  cors(),
  db.createSavedFilter
);

app.options(uriPath(END_POINT.deleteSavedFilter.path), cors());
app.post(
  uriPath(END_POINT.deleteSavedFilter.path),
  cors(),
  db.deleteSavedFilter
);

const { GRAPHQL_URL, EXPRESS_SERVER_URL, PLAYGROUND_ENABLED } = process.env;

// used in app Prod Middleware
app.set('views', path.join(__dirname, buildFolder));
if (GUI_PROXY_ENABLED === 'true') {
  app.set('trust proxy', 'loopback');
}
app.engine('html', require('ejs').renderFile);

mainRoute.get('/', function (req, res) {
  res.render('index.html', {
    GRAPHQL_URL,
    EXPRESS_SERVER_URL,
    PLAYGROUND_ENABLED,
    PUBLIC_PATH,
  });
});

mainRoute.use(express.static('static'));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
// We use `__dirname` to locate directory in which is our node module
setup(mainRoute, {
  outputPath: resolve(__dirname, buildFolder),
  publicPath: PUBLIC_PATH,
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv2.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host

// use the gzipped bundle
mainRoute.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

const PORT = process.env.PORT || 4000;

// Start your app.
app.use(GUI_WEB_CONTEXT, mainRoute);
app.listen(PORT, () => {
  console.log(
    `🚀  Aplications Server running at: http://localhost:${PORT}${GUI_WEB_CONTEXT}`
  );
});
