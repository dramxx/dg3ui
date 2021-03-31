import { GraphQLSchema } from 'graphql';
import React from 'react';

import { DgGraphiql, getSchema, graphQLFetcher } from '@dg3/graphiql';

export default function Graphiql() {
  const [schema, setSchema] = React.useState<GraphQLSchema>();

  React.useEffect(() => {
    getSchema().then((value) => setSchema(value));
  }, []);

  return <DgGraphiql fetcher={graphQLFetcher} schema={schema} />;
}
