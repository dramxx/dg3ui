import gql from 'graphql-tag';

export const themeTypeDefs = gql`
  extend type Query {
    theme: ThemeData
  }

  type ThemeData {
    name: String!
    colors: ColorsData!
    fontFamily: String!
    fontSize: FontSizeData!
    fontWeight: FontWeightData!
    radius: RadiusData!
    sizes: SizesData!
    shadows: ShadowsData!
    spacing: SpacingData!
    zIndex: ZIndex!
  }

  type ColorsData {
    primary1: String!
    primary2: String!
    grey1: String!
    grey2: String!
    grey3: String!
    grey4: String!
    red: String!
    green: String!
    white: String!
    black: String!
    link: String!
  }

  type FontSizeData {
    small: String!
    normal: String!
    big: String!
    large: String!
    extraLarge: String!
  }

  type RadiusData {
    small: String!
    normal: String!
    big: String!
  }

  type FontWeightData {
    normal: String!
    bold: String!
  }

  type SizesData {
    topBarHeight: String!
    menuWidth: String!
    menuCollapsedWidth: String!
    filterBoxHeight: String!
    filterHeight: String!
  }

  type ShadowsData {
    shadow1: String!
    shadow2: String!
    shadow3: String!
    shadow4: String!
    shadow5: String!
  }

  type SpacingData {
    small: String!
    normal: String!
    big: String!
    large: String!
  }

  type ZIndex {
    minor: Int!
    modal: Int!
    modalContent: Int!
  }
`;
