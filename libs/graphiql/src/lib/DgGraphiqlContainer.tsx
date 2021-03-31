import 'graphiql/graphiql.css';

import { parse, typeFromAST } from 'graphql';
import { isNil } from 'ramda';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { DgQueryVariables } from './DgQueryVariables';
import { getSchema } from './graphqlFetcher';
import { QUERY_VARIABLES_PLACEHOLDER } from './QueryVariablesPlaceholder';

interface GraphiqlContainerProps {
  variables: string;
  onVariablesEdit: (vars: string) => void;
}

export const DgGraphiqlContainer = (props: GraphiqlContainerProps) => {
  const { variables, onVariablesEdit } = props;
  const [schema, setSchema] = useState(null);
  const [query, setQuery] = useState<string>(QUERY_VARIABLES_PLACEHOLDER);
  const [variableToType, setVariableToType] = useState(null);

  useEffect(() => {
    getSchema().then((res) => {
      setSchema(res);
    });
  }, []);

  useEffect(() => {
    if (isNil(schema)) return;

    const variableToTypes = Object.create(null);

    try {
      const parsedQuery = parse(query);
      parsedQuery.definitions.forEach((definition) => {
        if (definition.kind === 'OperationDefinition') {
          const variableDefinitions = definition.variableDefinitions;
          variableDefinitions &&
            variableDefinitions.forEach(({ variable, type }) => {
              // @ts-ignore
              const inputType = typeFromAST(schema, type);

              if (inputType) {
                variableToTypes[variable.name.value] = inputType;
              }
            });
        }
      });

      setVariableToType(variableToTypes);
    } catch (err) {
      // TODO: could be displayed under query editor
      console.warn(err);
    }
  }, [schema, query]);

  return (
    <DgQueryVariables variables={variables} variableToType={variableToType} onEdit={(vars) => onVariablesEdit(vars)} />
  );
};
