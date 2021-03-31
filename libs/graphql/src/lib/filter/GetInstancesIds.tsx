import gql from 'graphql-tag';

export const GET_INSTANCES_IDS = gql`
  query getInstancesIds($instancesSetFilter: InstancePatternMatcher!) {
    instancesSet(filter: $instancesSetFilter) {
      items {
        internalId
      }
    }
  }
`;
