import { makeVar } from '@apollo/client';

import { defaultBackdropObject } from './DefaultBackdropObject';

export const backdropVar = makeVar<{
  show: boolean;
  modal: boolean;
}>(defaultBackdropObject);
