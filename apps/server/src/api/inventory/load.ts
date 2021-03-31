import fetch from 'node-fetch';

import { getTokenFromRequest } from '../keycloack/keycloak';

import ReadableStream = NodeJS.ReadableStream;

export const loadHandler = (req, res) => {
  const loadbody = req.body;
  const token = getTokenFromRequest(req);

  return inventoryLoad('', loadbody, token)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const inventoryLoad = (
  executionNodeId: string,
  body: string,
  token: string
) => {
  const inventoryLoad = `${process.env.INVENTORY_URL}/load?task_execution_node_id=${executionNodeId}`;

  return fetch(inventoryLoad, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/jsonlines',
      Accept: 'application/jsonlines',
      Authorization: 'Bearer ' + token,
    },
    body,
  })
    .then((response) => {
      return response.body;
    })
    .then((res) => {
      return processReadableStream(res);
    })
    .catch((err) => console.error('post invetory err', err));
};

function processReadableStream(stream: ReadableStream) {
  return new Promise((resolve, reject) => {
    let results = '';

    stream.on('readable', () => {
      let chunk;
      while (null !== (chunk = stream.read())) {
        results += chunk.toString();
      }
    });

    stream.on('error', (e) => reject(e));

    stream.on('end', () => {
      resolve(results);
    });
  });
}
