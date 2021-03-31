import fetch from 'node-fetch';

import { END_POINT } from '@dg3/endpoints';
import { path as uriPath } from '@dg3/utils';
import { inventoryLoad } from '../inventory/load';
import { getTokenFromRequest } from '../keycloack/keycloak';

import ReadableStream = NodeJS.ReadableStream;

export const cometHandler = (req, response) => {
  const taskbody = req.body;
  const token = getTokenFromRequest(req);
  return cometRequest(taskbody, token)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};

export const taskExecution = (req, response) => {
  const { task_template_id, filter } = req.body;
  const token = getTokenFromRequest(req);

  return sendTaskExecution(task_template_id, filter, token)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
};

export const cometRequest = async (body: string, token: string) => {
  return fetch(
    `${process.env.TC_URL}${uriPath(END_POINT.executionsStart.path)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jsonlines',
        Accept: 'application/jsonlines',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        task_template_id: 'gui_manual_data_import.v1',
        filter: {},
      }),
    }
  )
    .then((response) => {
      const respondUrl = response.headers.get('mm-respond-to');
      return response.body;
    })
    .then((res) => {
      return processReadableCommetStream(res, body, token);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const readLoadResults = async (
  executionNodeId: string,
  body: string,
  token: string
) => {
  return await inventoryLoad(executionNodeId, body, token);
};

// TODO: use TC when actually will cooperate
const processReadableCommetStream = (
  stream: ReadableStream,
  body: string,
  token: string
) => {
  return new Promise((resolve, reject) => {
    // stream.on('readable', () => {
    //   const chunk = stream.read();
    //
    //   if (chunk === null) {
    //     reject('Empty response from task controller');
    //     // end communication with TC after error
    //     return;
    //   }
    //   const lines = chunk.toString('utf-8').split('\n');

    readLoadResults('', body, token)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });

    // lines.forEach((line) => {
    //   if (line.includes('executionNodeId')) {
    //     try {
    //       const executionNodeId = JSON.parse(line).executionNodeId;
    //
    //       // TODO: we should send action results ater its finished to TC mm-respond-url
    //       readLoadResults('', body).then((res) => {
    //         resolve(res);
    //       });
    //     } catch (e) {
    //       // there is a possibility of problem during JSON parse which would kill the server
    //       reject(e);
    //     }
    //   }
    // });
    // });
    //
    // stream.on('error', (e) => reject(e));
    //
    // stream.on('end', () => {
    //   resolve('');
    // });
  });
};

const sendTaskExecution = (
  task_template_id: string,
  filter: string,
  token: string
) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.TC_URL}${uriPath(END_POINT.executionsStart.path)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/jsonlines',
        Accept: 'application/jsonlines',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        task_template_id,
        filter: JSON.parse(filter),
      }),
    })
      .then((res) => {
        if (res.status >= 400) {
          reject('Bad request.');
        }

        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
