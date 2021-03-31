import { JqDetailWidgetConfig } from '@dg3/schema';

export const DEVICE_LOCATION_HISTORY_CONFIG: JqDetailWidgetConfig = {
  id: 'device.location.history',
  type: 'Attributes',
  title: 'Instalační historie',
  language: 'jq',
  query: `
query deviceLocationHistory($elementId: ID!) {
  devices(filter: {node: {intId: [$elementId]}}) {
    internalId
    edgePlace(edge: {type: "installed_at", direction: OUT}) {
      existsTo
      existsFrom
      edgeEndPoint {
        internalId
        id {
          did {
            id
          }
          value
        }
        relPlace(edge: {type: "feed_from", direction: OUT}) {
          internalId
          id {
            did {
            id
          }
          value
          }
        }
      }
    }
  }
}
  `,
  transformation: `
    {data: [
      .devices[0].edgePlace[] | {
        id: .edgeEndPoint.internalId,
        existsFrom: .existsFrom,
        existsTo: .existsTo,
        anlage: .edgeEndPoint.relPlace[0].id.value,
        devloc: .edgeEndPoint.id.value
      }
    ]}
  `,
  config: {
    columns: [
      { Header: 'platnost od', accessor: 'existsFrom' },
      { Header: 'platnost do', accessor: 'existsTo' },
      { Header: 'anlage', accessor: 'anlage' },
      { Header: 'devloc', accessor: 'devloc' },
    ],
    editable: [],
    refetchQueries: [],
    sortColumn: 'existsTo',
  },
};
