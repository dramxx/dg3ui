import axios from 'axios';

import { getTokenFromRequest } from '../keycloack/keycloak';

const FormData = require('form-data');
const AdmZip = require('adm-zip');

export const catalogImportHandler = (req, res) => {
  const importbody = req.files;
  const token = getTokenFromRequest(req);

  return catalogImport(importbody, token)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err.data);
    });
};

export const catalogImport = (files: any, token: string) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const zip = new AdmZip();

    Object.keys(files).forEach((file) => {
      zip.addFile(files[file].name, files[file].data);
    });

    // Could be useful for manual test if zip is ok
    // fs.writeFileSync('templates.zip', zip.toBuffer());

    // create form data based on catalog requirements
    const importSettings = { ownerOfAll: true, componentId: 'catalog' };
    formData.append('importSettings', JSON.stringify(importSettings));
    formData.append('file', zip.toBuffer(), 'import.zip');

    axios({
      method: 'post',
      url: `${process.env.CATALOG_URL}/import`,
      data: formData,
      headers: {
        ...formData.getHeaders(),
        Authorization: 'Bearer ' + token,
      },
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
