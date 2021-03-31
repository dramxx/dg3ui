import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { print } from 'graphql';

import { GRAPHQL_URL } from '@dg3/endpoints';

const executor = async ({ document, variables, context }) => {
  const query = print(document);
  const fetchResult = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context?.authKey}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
};

export function graphQLFetcher(graphQLParams) {
  return fetch(GRAPHQL_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then((response) => response.json());
}

export async function getSchema() {
  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  });

  return schema;
}
