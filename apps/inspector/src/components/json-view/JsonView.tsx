import React from 'react';

import { DioValue, Instance } from '../../api';

interface Props {
  data: Instance[] | DioValue[];
}

const JsonView = (props: Props) => {
  const { data } = props;

  return (
    <div style={{ width: '100%', overflow: 'auto', direction: 'rtl' }}>
      <pre style={{ direction: 'ltr' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default JsonView;
