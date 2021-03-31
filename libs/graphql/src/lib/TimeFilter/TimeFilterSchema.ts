import gql from 'graphql-tag';

export const timeFilterTypeDefs = gql`
  extend type Query {
    timeFilter: TimeFilter!
  }

  enum TimeFilterPreset {
    DAY
    WEEK
    FORTNIGHT
    MONTH
    QUARTER
    HALF_YEAR
    YEAR
  }

  type TimeFilter {
    from: Date!
    to: Date!
    preset: TimeFilterPreset
  }
`;
