//  consumption_points: should be relInstancesSet with count after backend is fixed
export const LOAD_OVERVIEW_QUERY = `
  query LoadListTable($page: PageDelimitation, $ordering: [InstanceOrder!]) {
    set: instancesSet(
      filter: { node: { kindName: "switching_plan:switching_plan" } }
    ) {
      count
      items(page: $page, ordering: $ordering) {
        internalId
        id {
          did {
            id
          }
          value
        }
        attributes(
          dids: [
            "information:electricity.load_control.tou_id"
            "information:attribute.hdo_group_id"
            "information:electricity.load_control.switching_plan_valid_from"
            "information:electricity.load_control.switching_plan_received"
          ]
        ) {
          did {
            id
          }
          normalizedValue
        }
        consumption_points: relInstance(
          filter: { node: { kindName: "place:place.consumption_point" } }
        ) {
          internalId
        }
      }
    }
  }
`;
