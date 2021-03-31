import * as fs from 'fs';

import { ConvertObjectToSingleQuotedString } from '@dg3/utils';
import { KeycloakUser } from '../../user/user';
import { getPrivateUser } from '../keycloack/keycloak';

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.PG_USER ?? 'postgres',
  host: process.env.PG_HOST ?? 'localhost',
  database: process.env.PG_DATABASE ?? 'gui',
  password: process.env.PG_PASSWORD ?? '',
  port: process.env.PG_PORT ?? 5432,
});

const getExportedFiles = (request, response) => {
  // const user: KeycloakUser = getPrivateUser(request.session.user);

  pool.query(
    `SELECT id, filename, created_at, task_id, length(export_file) as filesize from exported_files`,
    (error, results) => {
      if (error) {
        console.error('getExportedFiles:', error);
        response.status(500).json('Internal db error');
        return;
      }

      response.status(200).json(results.rows);
    }
  );
};

const getExportedFileById = (request, response) => {
  // const user: KeycloakUser = getPrivateUser(request.session.user);
  const fileId = request.query.fileId;

  pool.query(
    `SELECT id, filename, encode(export_file, 'base64') from exported_files where id = '${fileId}';`,
    (error, results) => {
      if (error) {
        console.error('getExportedFiles:', error);
        response.status(500).json('Internal db error');
        return;
      }

      response.setHeader('Content-Type', 'application/zip');

      fs.writeFile(
        `${results.rows[0].filename}.zip`,
        results.rows[0].encode,
        'base64',
        function (error) {
          response.download(`${results.rows[0].filename}.zip`);
        }
      );
    }
  );
};

const getReports = (request, response) => {
  pool.query(
    "with modules as (SELECT module, json_agg(json_build_object('id',id, 'module', module, 'name', name, 'author', author, 'description', description, 'config', report_config)) as reports FROM reports GROUP BY module)" +
      'SELECT json_object_agg(module,reports) as reports from modules;',
    (error, results) => {
      if (error) {
        console.error('getReports:', error);
        response.status(500).json('Internal db error');
        return;
      }

      const resultJson = results != null ? results.rows[0] : [];
      response.status(200).json(resultJson);
    }
  );
};

const importReports = (request, response) => {
  const {
    name,
    config,
    author,
    description,
    module,
    visibility,
    users,
  } = request.body[0];

  const visibilityString = ConvertObjectToSingleQuotedString(visibility);
  const usersString = ConvertObjectToSingleQuotedString(users);

  const insert = `INSERT INTO reports(report_config, author, name, description, module, visibility, users) VALUES(
    '${config}','${author}','${name}','${description}','${module}',ARRAY${visibilityString},ARRAY${usersString})`;

  pool.query(insert, (error, results) => {
    if (error) {
      console.error('importReports:', error);
      response.status(500).json('Error during report insertion');
      return;
    }

    response.status(200).json(`Reports import was sucessful.`);
  });
};

const getSavedFilters = (request, response) => {
  const user: KeycloakUser = getPrivateUser(request.session.user);

  pool.query(
    `SELECT id, content_filter, name, author, description from saved_filters where '${
      user != null ? user.id : 'TEMPORARY'
    }' = any(users);`,
    (error, results) => {
      if (error) {
        console.error('getSavedFilters:', error);
        response.status(500).json('Internal db error');
        return;
      }

      // mapping content_filter value onto camel case
      const savedFilters =
        results != null
          ? results.rows.map(({ content_filter, ...rest }) => ({
              ...rest,
              contentFilter: content_filter,
            }))
          : [];

      response.status(200).json({
        savedFilters,
      });
    }
  );
};

const createSavedFilter = (request, response) => {
  const { name, contentFilter, author, description, visibility } = request.body;

  const user: KeycloakUser = getPrivateUser(request.session.user);
  const userString =
    user != null
      ? ConvertObjectToSingleQuotedString([user.id])
      : "['TEMPORARY']";
  const visibilityString = ConvertObjectToSingleQuotedString(visibility);

  const insert = `INSERT INTO saved_filters(content_filter, author, name, description, visibility, users) VALUES(
    '${contentFilter}','${author}','${name}','${description}',ARRAY${visibilityString},ARRAY${userString})`;

  pool.query(insert, (error, results) => {
    if (error) {
      console.error('createSavedFilter:', error);
      response.status(500).json('Error during saving new filter.');
      return;
    }

    response.status(200).json(`New saved filter was created successfully.`);
  });
};

const deleteSavedFilter = (request, response) => {
  const { name } = request.body;

  const deleteSavedFilterQuery = `DELETE FROM saved_filters WHERE name='${name}';`;

  pool.query(deleteSavedFilterQuery, (error, results) => {
    if (error) {
      response.status(500).json('Error during filter deletion.');
      return;
    }

    response.status(200).json(`Filter was successfully deleted.`);
  });
};

module.exports = {
  getExportedFiles,
  getExportedFileById,
  getSavedFilters,
  getReports,
  importReports,
  createSavedFilter,
  deleteSavedFilter,
};
