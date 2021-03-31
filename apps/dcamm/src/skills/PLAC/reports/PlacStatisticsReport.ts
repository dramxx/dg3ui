import { ReportConfig } from '@dg3/schema';

export const placStatisticsReport: ReportConfig = {
  id: 'placStatisticsReport',
  title: 'statistiky',
  techDescription: 'Place statistics',
  keywords: ['place', 'statistics'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'consumption.point.by.dts',
      language: 'jq',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['place'],
      position: {
        x: 0,
        y: 0,
        height: 8,
        width: 6,
      },
      type: 'TableWidget',
      chartProps: {
        title: 'distribuční trafostanice',
        rowsInTable: 7,
        showBorder: true,
        showExport: true,
        showPagination: true,
        showPageSize: false,
      },
      query: `
        query consumptionPointsByDts($placesSetFilter: InstancesSetPatternMatcher!) {
          placesSet(
            filter: {
              AND: [
                $placesSetFilter
                { node: { kindId: ["place:place.secondary_substation"] } }
              ]
            }
          ) {
            items {
              internalId
              attribute(did: "information:attribute.sjz") {
                normalizedValue
              }
              relPlacesSet(
                filter: { node: { kindId: ["place:place.consumption_point"] } }
                walk: {
                  path: { follow: { edge: { type: "feed_from", direction: IN } } }
                }
              ) {
                count
              }
            }
          }
        }
      `,
      transformation: `
        {data: [
          .placesSet.items[]
          | {
            id: {keyId: "id", intId: .internalId, valueId: .internalId, value: .internalId},
            dts: {keyId: "dts", internalId: .internalId, valueId: .attribute.normalizedValue, value: .attribute.normalizedValue },
            count: {keyId: "count", intId: .internalId, valueId: .relPlacesSet.count, value: .relPlacesSet.count}
          }
        ]}
      `,
      config: {
        columns: [
          { Header: 'DTS', accessor: 'dts' },
          { Header: 'počet OM', accessor: 'count' },
        ],
      },
    },
    {
      id: 'consumption.point.by.template',
      language: 'jq',
      type: 'TableWidget',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['place'],
      position: {
        x: 6,
        y: 0,
        width: 8,
        height: 8,
      },
      chartProps: {
        title: 'odběrná místa podle šablon',
        rowsInTable: 7,
        showBorder: true,
        showExport: true,
        showPagination: true,
        showPageSize: false,
      },
      query: `
        query consumptionPoint($placesSetFilter: InstancePatternMatcher!) {
          templates {
            localization {
              name
            }
            id
            instancesShouldSatisfySet(
              filter: {
                AND: [
                  $placesSetFilter
                  { node: { kindId: ["place:place.consumption_point"] } }
                ]
              }
            ) {
              count
            }
          }
        }
      `,
      transformation: `
        { data: [
          .templates[]
          | select(.instancesShouldSatisfySet.count > 0) |
          {
            id: {keyId: "id", valueId: .id, value: .id},
            template: {keyId: "template", valueId: .id ,value: .localization.name},
            count: {keyId: "count", valueId: .instancesShouldSatisfySet.count, value: .instancesShouldSatisfySet.count}}
        ]}
      `,
      config: {
        columns: [
          { Header: 'šablona', accessor: 'template' },
          { Header: 'počet míst', accessor: 'count', width: 80 },
        ],
      },
    },
    {
      id: 'consumption.point.by.tariff',
      type: 'SunburstChart',
      language: 'jq',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['place'],
      position: {
        x: 0,
        y: 8,
        width: 12,
        height: 16,
      },
      chartProps: {
        title: 'počty odběrných míst podle tarifu',
        widgetStyle: '',
        showBorder: true,
        colors: [
          '#FD845D',
          '#A56813',
          '#FFD665',
          '#F8925C',
          '#FEAE5D',
          '#AC772D',
          '#FFE972',
          '#D9A051',
          '#FFF2AD',
        ],
        legendShow: false,
        enableLegendHiding: false,
        enableDataSelection: false,
        enableDataLabels: true,
        enableTooltip: true,
        enableLabelRotation: 'radial',
      },
      query: `
        query consumptionPointsByTariff($placesSetFilter: InstancesSetPatternMatcher!) {
          placesSet(
            filter: {
              AND: [
                $placesSetFilter
                { node: { kindId: ["place:place.secondary_substation"] } }
              ]
            }
          ) {
            items {
              id {
                value
              }
              relPlacesSet(
                filter: { node: { kindId: ["place:place.consumption_point"] } }
                walk: {
                  path: { follow: { edge: { type: "feed_from", direction: IN } } }
                }
              ) {
                groupByAttr(did: "information:attribute.tariftype") {
                  attribute {
                    normalizedValue
                  }
                  set {
                    count
                  }
                }
              }
            }
          }
        }
      `,
      transformation: `
        {data: [
          .placesSet.items[] | {
            name: .id.value,
            children: [
              .relPlacesSet.groupByAttr[] | {
                name: .attribute.normalizedValue,
                value: .set.count
              }
            ]
          }
        ]}
      `,
    },
  ],
};
