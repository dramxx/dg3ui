export type BrowserRouterMatch = {
  path: string;
  url: string;
  isExact: boolean;
  params: {
    [key: string]: any;
  };
};
