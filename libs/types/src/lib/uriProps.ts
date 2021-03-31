export interface QueryParams {
  [key: string]: string | number;
}

export interface Uri {
  path: string;
  query?: QueryParams;
  host?: string;
}
