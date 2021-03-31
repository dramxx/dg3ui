import { FC } from 'react';

import { JsonPathMapping } from '@dg3/schema';

interface DetailProviderProps {
  typeName: string;
  elementId: string;
  overviewModule: string;
}

export type DetailProvider = FC<DetailProviderProps>;

type LabelMapping = {
  accessor: string;
  label: string;
};

export type GqlCardsConfig = {
  rootPath: string;
  query: string;
  jsonPathMapping: JsonPathMapping;
  labelConfig: Array<LabelMapping>;
};
