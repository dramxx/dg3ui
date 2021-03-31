import 'react-virtualized/styles.css';

import React, { FC, MutableRefObject, ReactNode, useRef } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

interface ListProps {
  data: Array<{ name: string; value: string }>;
}

const VirtualizedList: FC<ListProps> = (props: ListProps) => {
  const { data } = props;

  const cache: MutableRefObject<CellMeasurerCache> = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <AutoSizer>
        {({ width, height }): ReactNode => (
          <List
            defferedMeasurementCache={cache.current}
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            rowCount={data.length}
            rowRenderer={({ key, index, style, parent }): ReactNode => {
              const dataRow = data[index];
              return (
                <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                  <div style={style}>
                    <p>{dataRow.name}</p>
                    <p>{dataRow.value}</p>
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedList;
