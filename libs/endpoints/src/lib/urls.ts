const window = (global as any).window ?? {};

export const EXPRESS_SERVER_URL =
  process.env.EXPRESS_SERVER_URL ?? window.EXPRESS_SERVER_URL;
export const GRAPHQL_URL = process.env.GRAPHQL_URL ?? window.GRAPHQL_URL;
export const PLAYGROUND_ENABLED =
  process.env.PLAYGROUND_ENABLED ?? window.PLAYGROUND_ENABLED;
export const PUBLIC_PATH = process.env.GUI_PUBLIC_PATH ?? window.PUBLIC_PATH;
