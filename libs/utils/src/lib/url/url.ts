import { isNil } from 'ramda';

export function path(segments: Array<string>): string {
  const pathName = '/' + segments.join('/');
  const slashGroup = new RegExp('/+', 'g');

  return pathName.replace(slashGroup, '/');
}

export type QueryParams = { [key: string]: string };

export function query(queryParams: QueryParams) {
  const keys = Object.keys(queryParams);
  const query = keys.map((key) => `${key}=${queryParams[key]}`).join('&');

  return `?${query}`;
}

export function url(
  protocol: string,
  host: string,
  port: string,
  pathSegments: Array<string>,
  queryParams?: QueryParams
): string {
  const pathName = path(pathSegments);
  const queryString = !isNil(queryParams) ? query(queryParams) : '';

  return `${protocol}://${host}:${port}${pathName}${queryString}`;
}
