import { ReportConfig } from '@dg3/schema';

export const deviStatisticsReport: ReportConfig = {
  id: 'deviStatisticsReport',
  techDescription: 'Devices statistics',
  title: 'statistiky',
  keywords: ['devices', 'statistics'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'allDevices',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['device'],
      language: 'jsonpath',
      rootPath: '$',
      query: `
        query allDevices($devicesSetFilter: InstancesSetPatternMatcher!) {
          addElecricMeters: devicesSet(filter: {AND: [$devicesSetFilter, {node: {kind: {id: ["device:device.ptb-5.LZQJXC", "device:device.ptb-5.LZQJ400V3100AX6"]}}}]}) {
            count
          }
          smartMeters: devicesSet(filter: {AND: [$devicesSetFilter, {node: {kind: {attrValue: {did: "information:attribute.ptb_skupina", value: ["1", "2", "3", "4"]}}}}]}) {
            count
          }
          concentrators:   devicesSet(filter: {AND: [$devicesSetFilter, {node: {kind: {id: ["device:device.ptb-5.CXPSGCON100", "device:device.ptb-5.CXPSGCON200", "device:device.ptb-5.CXPSG200GWYC"]}}}]}) {
            count
          }
        }
        `,
      jsonPathMapping: [
        {
          key: 'addElecricMeters',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'addElecricMeters',
            },
            {
              key: 'name',
              value: 'součtové elektroměry',
            },
            {
              key: 'value',
              value: '$["addElecricMeters"].count',
            },
          ],
        },
        {
          key: 'smartMeters',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'smartMeters',
            },
            {
              key: 'name',
              value: 'smartmetery',
            },
            {
              key: 'value',
              value: '$["smartMeters"].count',
            },
          ],
        },
        {
          key: 'concentrators',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'concentrators',
            },
            {
              key: 'name',
              value: 'koncentrátory',
            },
            {
              key: 'value',
              value: '$["concentrators"].count',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 0,
        height: 11,
        width: 10,
      },
      chartProps: {
        colors: [
          '#FFD665',
          '#FEAE5D',
          '#FD845D',
          '#FFF2AD',
          '#FFE972',
          '#F8925C',
          '#D9A051',
          '#AC772D',
          '#A56813',
        ],
        title: 'všechna zařízení',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: 'pie',
        showBorder: true,
        enableRadialLabels: true,
      },
    },
    {
      id: 'koncetratory',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['device'],
      language: 'jsonpath',
      rootPath: '$.devicesSet.groupByKind[*]',
      query: `
              query concentrators($devicesSetFilter: InstancesSetPatternMatcher!) {
                devicesSet(filter: {AND: [$devicesSetFilter, {node: {kind: {id: ["device:device.ptb-5.CXPSGCON100", "device:device.ptb-5.CXPSGCON200", "device:device.ptb-5.CXPSG200GWYC"]}}}]}) {
                  groupByKind {
                    kind {
                      id
                      localization {
                        name
                      }
                    }
                    set {
                      count
                    }
                  }
                }
              }
        `,
      jsonPathMapping: [
        {
          key: 'pie',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.kind.localization.name',
            },
            {
              key: 'name',
              value: '$.kind.localization.name',
            },
            {
              key: 'value',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 10,
        y: 0,
        height: 11,
        width: 10,
      },
      chartProps: {
        colors: [
          '#FFD665',
          '#FEAE5D',
          '#FD845D',
          '#FFF2AD',
          '#FFE972',
          '#F8925C',
          '#D9A051',
          '#AC772D',
          '#A56813',
        ],
        title: 'koncentrátory',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: 'pie',
        showBorder: true,
        enableRadialLabels: true,
      },
    },
    {
      id: 'souctoveElektromery',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['device'],
      language: 'jsonpath',
      rootPath: '$.devicesSet.groupByKind[*]',
      query: `
              query addElectricMeters($devicesSetFilter: InstancesSetPatternMatcher!) {
                devicesSet(filter: {AND: [$devicesSetFilter, {node: {kind: {id: ["device:device.ptb-5.LZQJXC", "device:device.ptb-5.LZQJ400V3100AX6"]}}}]}) {
                  groupByKind {
                    kind {
                      id
                      localization {
                        name
                      }
                    }
                    set {
                      count
                    }
                  }
                }
              }
        `,
      jsonPathMapping: [
        {
          key: 'pie',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.kind.localization.name',
            },
            {
              key: 'name',
              value: '$.kind.localization.name',
            },
            {
              key: 'value',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 11,
        height: 11,
        width: 10,
      },
      chartProps: {
        colors: [
          '#FFD665',
          '#FEAE5D',
          '#FD845D',
          '#FFF2AD',
          '#FFE972',
          '#F8925C',
          '#D9A051',
          '#AC772D',
          '#A56813',
        ],
        title: 'součtové elektroměry',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: 'pie',
        showBorder: true,
        enableRadialLabels: true,
      },
    },
    {
      id: 'smartmetery',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['device'],
      language: 'jsonpath',
      rootPath: '$.devicesSet.groupByKind[*]',
      query: `
        query SmartMeters($devicesSetFilter: InstancesSetPatternMatcher!) {
          devicesSet(filter: {AND: [$devicesSetFilter, {node: {kind: {attrValue: {did: "information:attribute.ptb_skupina", value: ["1", "2", "3", "4"]}}}}]}) {
            groupByKind {
              kind {
                id
                localization  {
                  name
                }
              }
              set {
                count
              }
            }
          }
        }
        `,
      jsonPathMapping: [
        {
          key: 'pie',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.kind.localization.name',
            },
            {
              key: 'name',
              value: '$.kind.localization.name',
            },
            {
              key: 'value',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 10,
        y: 11,
        height: 11,
        width: 10,
      },
      chartProps: {
        colors: [
          '#FFD665',
          '#FEAE5D',
          '#FD845D',
          '#FFF2AD',
          '#FFE972',
          '#F8925C',
          '#D9A051',
          '#AC772D',
          '#A56813',
        ],
        title: 'smartmetery',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: 'pie',
        showBorder: true,
        enableRadialLabels: true,
      },
    },
  ],
};
