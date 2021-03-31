import { DetailConfig } from '@dg3/schema';
import { EVEN_DIO_ATTRIBUTES } from './EvenDioAttributesConfig';
import { DIO_AUTHOR_ATTRIBUTES } from '../../detail/DioDetail/DioAuthorAttributesConfig';
import { DIO_CARDS } from '../../detail/DioDetail/DioCards';
import { DIO_OBJECT_ATTRIBUTES } from '../../detail/DioDetail/DioObjectAttributesConfig';

export const EVEN_DIO_DETAIL: DetailConfig = {
  id: 'dio.detail',
  version: '1.0',
  widgets: [
    DIO_CARDS,
    EVEN_DIO_ATTRIBUTES,
    DIO_AUTHOR_ATTRIBUTES,
    DIO_OBJECT_ATTRIBUTES,
  ],
};
