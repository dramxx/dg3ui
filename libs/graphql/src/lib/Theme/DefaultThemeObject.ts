import { mergeDeepRight } from 'ramda';

import { defaultTheme } from '../../../../components/src/lib/Theme/defaultTheme';

export const defaultThemeObject = mergeDeepRight(
  {
    __typename: 'ThemeData',
    name: 'default Theme',
    colors: {
      __typename: 'ColorsData',
      primary1: '#F69331',
      primary2: '#F36C21',
      grey1: '#F0F0F0',
      grey2: '#E2E2E2',
      grey3: '#B3B3B3',
      grey4: '#666666',
      red: '#FC5959',
      green: '#16A842',
      white: '#FFFFFF',
      black: '#181628',
      link: '#1592E6',
    },
    fontFamily: 'muli, sans-serif',
    fontSize: {
      __typename: 'FontSizeData',
      normal: '14px',
      small: '12px',
      big: '18px',
      large: '20px',
      extraLarge: '28px',
    },
    fontWeight: {
      __typename: 'FontWeightData',
      normal: 'normal',
      bold: 'bold',
    },
    radius: {
      __typename: 'RadiusData',
      small: '3px',
      normal: '5px',
      big: '10px',
    },
    sizes: {
      __typename: 'SizesData',
      topBarHeight: '38px',
      menuWidth: '180px',
      menuCollapsedWidth: '50px',
      filterBoxHeight: '68px',
      filterHeight: '32px',
    },
    shadows: {
      __typename: 'ShadowsData',
      shadow1: '3px 0px 6px #0000004D',
      shadow2: '0px 2px 3px #000000BF',
      shadow3: '2px 2px 3px #000000BF',
      shadow4: '2px 2px 3px #00000026',
      shadow5: '2px 2px 3px #0000004D',
    },
    spacing: {
      __typename: 'SpacingData',
      small: '6px',
      normal: '12px',
      big: '18px',
      large: '24px',
    },
    zIndex: {
      __typename: 'ZIndex',
      minor: 1,
      modal: 1200,
      modalContent: 1201,
    },
  },
  defaultTheme
);
