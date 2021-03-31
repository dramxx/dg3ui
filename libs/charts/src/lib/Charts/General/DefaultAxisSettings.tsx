import React from 'react';
import { ThemeContext } from 'styled-components';

// TODO: line + bar chart could be merged more with generic props
export const getDefaultAxisSettings = (): { xAxis: object; yAxis: object } => {
  const dgTheme = React.useContext(ThemeContext);

  const lineStyle = {
    color: dgTheme.colors.black,
    fontSize: dgTheme.fontSize.small,
  };

  return {
    xAxis: {
      nameLocation: 'end',
      boundaryGap: true,
      nameGap: 0,
      nameTextStyle: {
        align: 'right',
        verticalAlign: 'top',
        lineHeight: 60,
      },
      axisLine: {
        lineStyle: lineStyle,
      },
    },
    yAxis: {
      nameLocation: 'end',
      nameGap: 10,
      nameTextStyle: {
        align: 'center',
      },
      splitNumber: 3,
      rotate: 90,
      axisLine: {
        lineStyle: lineStyle,
      },
    },
  };
};
