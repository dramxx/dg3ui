import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { AttributeTableWidgetConfig } from '@dg3/schema';
import { AttributeTable } from '@dg3/table';
import { EditableAttributeTableWidget } from './EditableAttributeTableWidget';

interface Props {
  config: AttributeTableWidgetConfig;
  elementId: string;
}

export const AttributeTableWidget: FC<Props> = (props) => {
  const { config, elementId } = props;
  const { editable, columns, data, sortColumn, mutation } = config;

  const intl = useIntl();
  // this sort is done in-situ
  const sortByLang = new Intl.Collator(intl.locale).compare;
  data.sort((a, b) => sortByLang(String(a[sortColumn]), String(b[sortColumn])));

  if (mutation) {
    return (
      <EditableAttributeTableWidget
        config={config}
        elementId={elementId}
        mutation={mutation}
      />
    );
  } else {
    return <AttributeTable data={data} columns={columns} editable={editable} />;
  }
};
