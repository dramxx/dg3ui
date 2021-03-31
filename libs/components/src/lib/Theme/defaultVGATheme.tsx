import { DgTheme } from '@dg3/types';

export const defaultVGATheme: DgTheme = {
  name: 'default VGA Theme',
  colors: {
    primary1: '#649FFC',
    primary2: '#4141FF',
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
    small: '12px',
    normal: '14px',
    big: '18px',
    large: '20px',
    extraLarge: '28px',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
  sizes: {
    topBarHeight: '38px',
    menuWidth: '180px',
    menuCollapsedWidth: '50px',
    filterBoxHeight: '68px',
    filterHeight: '32px',
  },
  shadows: {
    shadow1: '0px 0px 6px #00000067',
    shadow2: '0px 0px 6px #00000029',
    shadow3: '0px 0px 3px #0000003E',
    shadow4: '3px 0px 6px #00000029',
    shadow5: '2px 2px 3px #00000076',
  },
  spacing: {
    small: '6px',
    normal: '12px',
    big: '18px',
    large: '24px',
  },
  radius: {
    small: '3px',
    normal: '5px',
    big: '10px',
  },
  zIndex: {
    minor: 1,
    modal: 1200,
    modalContent: 1201,
  },
};
