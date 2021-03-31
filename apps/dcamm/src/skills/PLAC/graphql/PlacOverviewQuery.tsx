export const PLAC_OVERVIEW_QUERY = `
query PlacesListTable($placesSetFilter: InstancesSetPatternMatcher!, $page: PageDelimitation, $ordering: [InstanceOrder!]) {
  set: placesSet(filter: {AND: [$placesSetFilter, {node: {kindId: ["place:place.consumption_point","place:place.secondary_substation"]}}]}) {
    count
    items (page: $page, ordering: $ordering) {
      internalId
      id {
        did {
          id
          localization  {
            name
          }
        }
        value
      }
      kind {
        id
        localization  {
          name
        }
      }
      attributes(dids: [
        "information:attribute.ean",
        "information:attribute.sjz",
        "information:attribute.anlage",
        "information:attribute.house",
        "information:attribute.tariftype",
        "information:attribute.oj",
        "information:attribute.city1",
        "information:attribute.city2",
        "information:attribute.street",
        "information:attribute.house_num1",
        "information:attribute.anlart",
        "information:attribute.typ_mereni",
        "information:attribute.mr_source",
        "information:attribute.place_maintenance_status"
        ]) {
        did {
          id
          localization  {
            name
          }
        }
        normalizedValue
      }
    }
  }
}
`;
