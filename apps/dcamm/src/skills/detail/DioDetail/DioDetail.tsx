import { DetailConfig } from '@dg3/schema';
import { DIO_ATTRIBUTES } from './DioAttributesConfig';
import { DIO_AUTHOR_ATTRIBUTES } from './DioAuthorAttributesConfig';
import { DIO_CARDS } from './DioCards';
import { DIO_OBJECT_ATTRIBUTES } from './DioObjectAttributesConfig';

export const DIO_DETAIL: DetailConfig = {
  id: 'dio.detail',
  version: '1.0',
  widgets: [
    DIO_CARDS,
    DIO_ATTRIBUTES,
    DIO_AUTHOR_ATTRIBUTES,
    DIO_OBJECT_ATTRIBUTES,
  ],
};
