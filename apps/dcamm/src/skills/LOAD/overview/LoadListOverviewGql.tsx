import { JqOverviewDataConfig } from '@dg3/types';
import { LOAD_OVERVIEW_QUERY } from '../graphql/LoadOverviewQuery';

export const LOAD_LIST_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: LOAD_OVERVIEW_QUERY,
  transformation: `
    def attribute(attr): ((.attributes[] | select(.did.id == attr)) // null);
    def parsedate: sub("\\\\.[0-9]*Z"; "Z") | fromdate;
    [ .time.single as $filter | .set.items[]
      | attribute("information:electricity.load_control.switching_plan_received").normalizedValue as $date
      | select((($date | parsedate) >= ($filter.from | parsedate)) and (($date | parsedate) <= ($filter.to | parsedate)))
      | {
        id: {keyId: "internalId", intId: .internalId, valueId: .internalId, value: .internalId},
        "information:electricity.load_control.tou_id": (attribute("information:electricity.load_control.tou_id").normalizedValue as $val | {keyId: "information:attribute.ckod", intId: ("Instance:" + .internalId), valueId: $val, value: $val}),
        "information:attribute.hdo_group_id": (attribute("information:attribute.hdo_group_id").normalizedValue as $val | {keyId: "information:attribute.ckod", intId: ("Instance:" + .internalId), valueId: $val, value: $val}),
        "information:electricity.load_control.switching_plan_valid_from": (attribute("information:electricity.load_control.switching_plan_valid_from").normalizedValue as $val | {keyId: "information:attribute.ckod", intId: .internalId, valueId: $val, value: $val}),
        "information:electricity.load_control.switching_plan_received": (attribute("information:electricity.load_control.switching_plan_received").normalizedValue as $val | {keyId: "information:electricity.load_control.switching_plan_received", intId: .internalId, valueId: $val, value: $val}),
    } ]
  `,
  //       // {
  //       //   key: 'om_count',
  //       //   keyId: 'om_count',
  //       //   intId: '$.internalId',
  //       //   valueId: '$.consumption_points[*].count',
  //       //   value: '$.consumption_points[*].count',
  //       // },
  //     ],
  //   },
  // ],
  columns: [
    {
      Header: 'TOU ID',
      accessor: 'information:electricity.load_control.tou_id',
      detailLink: true,
      sortingKey: null,
    },
    {
      Header: 'HDO group',
      accessor: 'information:attribute.hdo_group_id',
      sortingKey: 'information:attribute.hdo_group_id',
    },
    {
      Header: 'platnost od',
      accessor:
        'information:electricity.load_control.switching_plan_valid_from',
      sortingKey:
        'information:electricity.load_control.switching_plan_valid_from',
    },
    {
      Header: 'přijato ze SŘV',
      accessor: 'information:electricity.load_control.switching_plan_received',
      sortingKey:
        'information:electricity.load_control.switching_plan_received',
    },
    // {
    //   Header: 'počet OM',
    //   accessor: 'om_count',
    // },
  ],
  defaultOrdering: {
    key: 'information:electricity.load_control.switching_plan_received',
    order: 'DESCENDING',
  },
};
