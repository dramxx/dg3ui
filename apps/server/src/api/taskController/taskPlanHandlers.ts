import fetch from 'node-fetch';
import { isNil } from 'ramda';

import { END_POINT } from '@dg3/endpoints';
import { path as uriPath } from '@dg3/utils';
import { getTokenFromRequest } from '../keycloack/keycloak';

export const taskPlanEditHandler = (request, response) => {
  const token = getTokenFromRequest(request);
  const { active, id } = request.body;
  if (isNil(id)) {
    response.status(400).send('Task plan ID not specified!');
  } else {
    if (!isNil(active)) {
      const { path } = active ? END_POINT.tcPlanResume : END_POINT.tcPlanPause;
      fetch(`${process.env.TC_URL}${uriPath(path.concat(id))}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(() => response.status(200).send({}))
        .catch((error) => response.status(500).send(error));
    }
  }
};
