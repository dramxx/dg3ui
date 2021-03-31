import { PieChartMockColors } from '@dg3/charts';
import { ReportConfig } from '@dg3/schema';

export const deviTableReport: ReportConfig = {
  id: 'Device_report_1',
  techDescription: 'mega test report',
  title: 'Device report 1',
  keywords: ['key', 'words', 'for', 'place', 'report'],
  canvasSettings: { rows: 10, columns: 10 },
  version: '1.0.0',
  widgets: [
    {
      id: 'table123',
      type: 'TableWidget',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.devices[*]',
      query:
        'query Table($deviceFilter: InstancePatternMatcher) {\n    devices(filter: $deviceFilter) {\n      intId\n      attrs(\n        dids: ["ckod", "device_lifecycle_phase", "device_maintenance_status"]\n      ) {\n        did\n        value\n      }\n      kind {\n        codeName\n        attrs(\n          dids: ["ptb_skupina", "model", "matnr", "vyrobce", "konstrukcni_typ"]\n        ) {\n          did\n          value\n        }\n      }\n      mediator: relDevice(edge: { type: "accessible_by", direction: OUT }) {\n        id {\n          did\n          value\n        }\n      }\n      instalation_place: relPlace(\n        edge: { type: "installed_at", direction: OUT }\n        filter: { node: { kindName: "DEVICE_LOCATION" } }\n      ) {\n        placement: relPlace(edge: { type: "feed_from", direction: OUT }) {\n          id {\n            did\n            value\n          }\n        }\n        dts: relPlace(\n          walk: {\n            path: { follow: { edge: { type: "feed_from", direction: OUT } } }\n          }\n          filter: { node: { kindName: "SECONDARY_SUBSTATION" } }\n        ) {\n          id {\n            did\n            value\n          }\n        }\n      }\n    }\n  }',
      jsonPathMapping: [
        {
          key: 'table',
          type: 'object',
          values: [
            { key: 'id', value: '$.intId' },
            {
              key: 'ckod',
              value: '$.attrs[?(@.did.id == "attribute.ckod")].value',
            },
            {
              key: 'device_maintenance_status',
              value:
                '$.attrs[?(@.did.id == "attribute.device_maintenance_status")].value',
            },
            {
              key: 'ptb_skupina',
              value:
                '$.kind.attributes[?(@.did.id == "attribute.ptb_skupina")].value',
            },
            {
              key: 'vyrobce',
              value:
                '$.kind.attributes[?(@.did.id == "attribute.vyrobce")].valued',
            },
            { key: 'codeName', value: '$.kind.id' },
            {
              key: 'dts',
              value: '$.instalation_place[0].dts[0].id.value',
            },
          ],
        },
      ],
      config: {
        columns: [
          {
            Header: 'c-kód',
            accessor: 'ckod',
          },
          {
            Header: 'druh',
            accessor: 'codeName',
          },
          {
            Header: 'PTB',
            accessor: 'ptb_skupina',
          },
          {
            Header: 'výrobce',
            accessor: 'vyrobce',
          },
          {
            Header: 'napájecí DTS',
            accessor: 'dts',
          },
          {
            Header: 'servisní stav',
            accessor: 'device_maintenance_status',
          },
        ],
      },
      position: { x: 0, y: 0, height: 10, width: 5 },
      chartProps: {
        title: 'Top 20 devices',
        rowsInTable: 20,
        showBorder: true,
        showExport: false,
        showPageSize: false,
        showPagination: false,
      },
    },
    {
      id: 'DevicesByKind',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.placesSet.groupByKind',
      query:
        '{\n' +
        '    placesSet{\n' +
        '    groupByKind{\n' +
        '      kind{codeName}\n' +
        '      set{count}\n' +
        '    }\n' +
        '  }\n' +
        '}',
      jsonPathMapping: [
        {
          key: 'pie',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.kind.codeName',
            },
            {
              key: 'name',
              value: '$.kind.codeName',
            },
            {
              key: 'value',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 5,
        y: 0,
        height: 5,
        width: 5,
      },
      chartProps: {
        colors: PieChartMockColors,
        title: 'Devices count by Kind',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: true,
        enableTooltip: true,
        widgetStyle: 'pie',
        showBorder: true,
        enableRadialLabels: false,
      },
    },
    {
      id: 'DevicesByKind2',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.placesSet.groupByKind',
      query:
        '{\n' +
        '    placesSet{\n' +
        '    groupByKind{\n' +
        '      kind{codeName}\n' +
        '      set{count}\n' +
        '    }\n' +
        '  }\n' +
        '}',
      jsonPathMapping: [
        {
          key: 'pie2',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.kind.codeName',
            },
            {
              key: 'name',
              value: '$.kind.codeName',
            },
            {
              key: 'value',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 5,
        y: 5,
        height: 5,
        width: 5,
      },
      chartProps: {
        colors: [
          '#FFD38D',
          '#B1423D',
          '#FFC452',
          '#D9752D',
          '#BF5533',
          '#B1423D',
          '#923545',
          '#79313D',
        ],
        title: 'Devices count by Kind 2',
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
