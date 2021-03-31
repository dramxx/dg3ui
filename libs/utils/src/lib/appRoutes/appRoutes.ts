import { isEmpty, isNil } from 'ramda';

import { HOMEPAGE_MODULE } from '@dg3/types';

export const getAppModuleFromUrl = (url: string): string => {
  const splitedUrl = url.split('/');

  return isNil(splitedUrl[1]) || isEmpty(splitedUrl[1])
    ? HOMEPAGE_MODULE
    : splitedUrl[1];
};
