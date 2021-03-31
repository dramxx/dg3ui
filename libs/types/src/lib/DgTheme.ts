export interface DgTheme {
  name: string;
  colors: ColorsObject;
  fontFamily: string;
  fontSize: FontSizeObject;
  fontWeight: FontWeightObject;
  sizes: SizesObject;
  shadows: ShadowsObject;
  spacing: SpacingObject;
  radius: RadiusObject;
  zIndex: ZIndexObject;
}

type ColorsObject = {
  primary1: string;
  primary2: string;
  grey1: string;
  grey2: string;
  grey3: string;
  grey4: string;
  red: string;
  green: string;
  white: string;
  black: string;
  link: string;
};

type FontSizeObject = {
  small: string;
  normal: string;
  big: string;
  large: string;
  extraLarge: string;
};

type FontWeightObject = {
  normal: string;
  bold: string;
};

type RadiusObject = {
  small: string;
  normal: string;
  big: string;
};

type SizesObject = {
  topBarHeight: string;
  menuWidth: string;
  menuCollapsedWidth: string;
  filterBoxHeight: string;
  filterHeight: string;
};

type ShadowsObject = {
  shadow1: string;
  shadow2: string;
  shadow3: string;
  shadow4: string;
  shadow5: string;
};

type SpacingObject = {
  small: string;
  normal: string;
  big: string;
  large: string;
};

type ZIndexObject = {
  minor: number;
  modal: number;
  modalContent: number;
};
