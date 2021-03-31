import { DetailConfig } from '@dg3/schema';
import { MEAS_DIO_ATTRIBUTES } from './MeasDioAttributesConfig';
import { DIO_AUTHOR_ATTRIBUTES } from '../../detail/DioDetail/DioAuthorAttributesConfig';
import { DIO_CARDS } from '../../detail/DioDetail/DioCards';
import { DIO_OBJECT_ATTRIBUTES } from '../../detail/DioDetail/DioObjectAttributesConfig';

export const MEAS_DIO_DETAIL: DetailConfig = {
  id: 'dio.detail',
  version: '1.0',
  widgets: [
    DIO_CARDS,
    MEAS_DIO_ATTRIBUTES,
    DIO_AUTHOR_ATTRIBUTES,
    DIO_OBJECT_ATTRIBUTES,
  ],
};
