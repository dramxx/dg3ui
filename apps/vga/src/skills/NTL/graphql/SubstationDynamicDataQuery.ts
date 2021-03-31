export const SUBSTATION_DYNAMIC_DATA = `query substationDynamicData($id: String!, $from: DateTime!, $to: DateTime!) {
  places(
    filter: { node: { id: { did: "identificator.object_id", values: [$id] } } }
  ) {
    nodes: relPlace(
      filter: {
        node: { kindName: ["JUNCTION", "CONNECTION_POINT", "TRANSFORMER"] }
      }
      walk: {
        path: [{ follow: { edge: { type: "CONNECTED_TO"} } }]
      }
    ) {
      id {
        value
      }
      kind {
        codeName
      }
      attrs(
        dids: ["space_and_time.gps_longitude", "space_and_time.gps_latitude"]
      ) {
        did
        value
      }
      diosObject
      (
        time: { single: {
          from: $from,
          to: $to,
        }}
        filter: {
          didFilter: {
              ids: [
                  "electricity.voltage.voltage_phase_1_estimated_instantaneous",
                  "electricity.voltage.voltage_phase_2_estimated_instantaneous",
                  "electricity.voltage.voltage_phase_3_estimated_instantaneous",
                "electricity.energy.positive_active_energy.positive_active_energy_estimated_instantaneous"
              ]
        }}
      )
      {
        items (ordering: {byField: "timestamp"
          order: ASCENDING
        }) {
         timestamp
          did {
            id
            topic
          }
          value {
            normalizedValue
          }
        }
      }
    }

    cp_jun_links: relPlace(
    filter: {  node: { kindName: [ "CONNECTION_POINT" ] } }
      walk: { path: [{ follow: { edge: { type: "CONNECTED_TO" } } }] }
    ) {
      id {
        value
      }
      target: relPlace(
        filter: {  node: { kindName: [ "JUNCTION" ] } }
        edge: { type: "CONNECTED_TO", direction: OUT }) {
        id {
          value
        }
      }
    }

    links: relPlace(
      filter: { node: { kindName: "SEGMENT" }}
      walk: { path: [{ follow: { edge: { type: "CONNECTED_TO" } } }] }
    ) {
      id {
        value
      }
      target: relPlace(edge: { type: "CONNECTED_TO", direction: IN }) {
        id {
          value
        }
      }
      source: relPlace(edge: { type: "CONNECTED_TO", direction: OUT }) {
        id {
          value
        }
      }
      diosObject
      (
        time: { single: {
        from: $from,
        to: $to
      }}
      filter: {
          didFilter: {
              ids: [
                "electricity.energy.positive_active_energy.positive_active_energy_estimated_instantaneous"
              ]
              }}
      )
      {
        items(
          ordering: {
            byField: "timestamp"
            order: ASCENDING
        }) {
        timestamp
          did {
            id
            topic
          }
          value {
            normalizedValue
          }
        }
      }
    }
  }
}
`;
