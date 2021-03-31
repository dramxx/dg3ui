import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';
import { isEmpty } from 'ramda';
import { Record, Static, String } from 'runtypes';

const ErrorSchema = Record({
  error: String,
  msg: String,
});

type ErrorObject = Static<typeof ErrorSchema>;

class JsonlinesError extends Error {
  readonly errors: ErrorObject[];

  constructor(errors: ErrorObject[]) {
    super(JSON.stringify(errors));
    this.name = 'JsonlinesError';
    this.errors = errors;
  }
}

export const parseJsonLines = (response: Response) =>
  response
    .text()
    .then((text) =>
      text
        .split('\n')
        .slice(0, -1)
        .map((line) => JSON.parse(line))
    )
    .then((responseArray) => {
      const errors: ErrorObject[] = responseArray.filter(ErrorSchema.guard);
      if (!isEmpty(errors)) {
        throw new JsonlinesError(errors);
      }
      return responseArray;
    });

export const serializeJsonLinesText = (data: object, headers: Headers) => {
  headers.set('Content-Type', 'application/jsonlines');
  headers.set('Accept', 'application/jsonlines');
  return { body: data.toString(), headers };
};

type DataType = { [key: string]: unknown[] };

export const serializeJsonLines = (data: DataType, headers: Headers) => {
  headers.set('Content-Type', 'application/jsonlines');
  headers.set('Accept', 'application/jsonlines');
  const body = Object.entries(data)
    .map(
      ([key, lines]) =>
        `${key}:${lines.map((line) => JSON.stringify(line)).join('\n')}`
    )
    .join('\n');
  return { body, headers };
};

const createError = (error: ErrorObject): GraphQLError =>
  new GraphQLError(error.msg);

export const jsonlinesErrorLink = onError(
  ({ operation, forward, networkError }) => {
    if (networkError instanceof JsonlinesError) {
      return forward(operation).map((data) => {
        return {
          data: null,
          errors: networkError.errors.map(createError),
        };
      });
    }
  }
);
