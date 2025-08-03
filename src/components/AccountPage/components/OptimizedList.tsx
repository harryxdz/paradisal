import React from 'react';
import { FixedSizeList } from 'react-window';

const OptimizedList = ({ items, rowHeight, renderRow }) => (
  <FixedSizeList
    height={500}
    width="100%"
    itemCount={items.length}
    itemSize={rowHeight}
  >
    {({ index, style }) => (
      <div style={style}>
        {renderRow(items[index], index)}
      </div>
    )}
  </FixedSizeList>
);

export default OptimizedList;