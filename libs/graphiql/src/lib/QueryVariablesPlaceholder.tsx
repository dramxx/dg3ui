export const QUERY_VARIABLES_PLACEHOLDER = `
query queryVariables($deviceFilter: InstancePatternMatcher, $placeFilter: InstancePatternMatcher) {
    places(page: { offset: 0, size: 100 }, filter: $placeFilter) {
      intId
    },
    devices(page: { offset: 0, size: 100 }, filter: $deviceFilter) {
      intId
    }
  }
`;
