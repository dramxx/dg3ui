import React, { FC, useEffect, useState } from 'react';
import { DgGraphiql, getSchema, graphQLFetcher } from '@dg3/graphiql';

export const GraphiqlPage: FC = () => {
  const [schema, setSchema] = useState();
  useEffect(() => {
    getSchema().then(setSchema);
  }, []);

  return <DgGraphiql fetcher={graphQLFetcher} schema={schema} />;
};
