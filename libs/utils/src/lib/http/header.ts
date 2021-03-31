type Headers = { [key: string]: string };

export const CONTENT_TYPE = {
  json: 'application/json;charset=UTF-8',
  html: 'text/html;charset=UTF-8',
  csv: 'text/csv;charset=UTF-8',
  zip: 'application/zip',
};

export type ContentType = keyof typeof CONTENT_TYPE;

export function lang(lang: string) {
  return {
    'Accept-Language': lang,
  };
}

export function accept(contentType: ContentType) {
  return {
    Accept: CONTENT_TYPE[contentType],
  };
}

export function contentType(contentType: ContentType) {
  return {
    'Content-Type': CONTENT_TYPE[contentType],
  };
}

export function headers(...args: Array<Headers>): Headers {
  return args.reduce((acc, header) => Object.assign(acc, header), {});
}
