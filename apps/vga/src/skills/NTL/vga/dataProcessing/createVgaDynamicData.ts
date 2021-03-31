import { GraphChartDataObject, VgaDynamicData } from '@dg3/types';
import { GqlWidgetConfig } from '@dg3/schema';
import jp from 'jsonpath/jsonpath.min';
import { groupBy } from 'ramda';

export const createVgaDynamicData = (
  gql: GqlWidgetConfig,
  data: object,
  graphData: GraphChartDataObject,
  hours: Array<string>
): VgaDynamicData => {
  const sourceArray: Array<any> = jp.query(data, gql.rootPath);

  if (!sourceArray) {
    return {
      frames: [],
    };
  }

  const links = sourceArray[0].links.map((link) => ({
    id: link.id.value,
    data: link.diosObject.items.map((item) => ({
      id: item.did.id,
      timestamp: item.timestamp,
      value: item.value.normalizedValue,
    })),
  }));

  const nodes = sourceArray[0].nodes.map((node) => ({
    id: node.id.value,
    data: node.diosObject.items.map((item) => ({
      id: item.did.id,
      timestamp: item.timestamp,
      value: item.value.normalizedValue,
    })),
  }));

  /* TODO: remove this section after GROUP BY DID is solved in GQL a use it instead */
  const groupByDid = groupBy((link: { id: string; data: any }) => {
    return link.id;
  });

  const newLinks = links.map((link: { id: string; data: any }) => {
    return {
      id: link.id,
      data: groupByDid(link.data),
    };
  });

  const newNodes = nodes.map((node) => {
    return {
      id: node.id,
      data: groupByDid(node.data),
    };
  });
  /* */

  const dynamic = {
    nodes: newNodes,
    links: newLinks,
  };

  return {
    frames: hours.map((hour) => {
      return {
        timestamp: hour,
        wholeFrame: true,
        links: graphData.links.map((link, index) => {
          if (dynamic.links) {
            const segment = dynamic.links.find((item) => item.id === link.id);

            const flow = segment?.data[
              'electricity.energy.positive_active_energy.positive_active_energy_estimated_instantaneous'
            ]?.find((item) => item.timestamp === hour);

            return [index, flow ? flow.value * 1000 : -1];
          }
        }),
        nodes: graphData.nodes.map((node, index) => {
          if (dynamic.nodes) {
            const dynamic_node = dynamic.nodes.find(
              (item) => item.id === node.id
            );

            const consumption = dynamic_node?.data[
              'electricity.energy.positive_active_energy.positive_active_energy_estimated_instantaneous'
            ]?.find((item) => item.timestamp === hour);

            return [index, consumption ? consumption.value * 1000 : -1];
          }
        }),
        upnodes: graphData.nodes.map((node, index) => {
          if (dynamic.nodes) {
            const dynamic_node = dynamic.nodes.find(
              (item) => item.id === node.id
            );

            const phase1 = dynamic_node?.data[
              'electricity.voltage.voltage_phase_1_estimated_instantaneous'
            ]?.find((item) => item.timestamp === hour);
            const phase2 = dynamic_node?.data[
              'electricity.voltage.voltage_phase_2_estimated_instantaneous'
            ]?.find((item) => item.timestamp === hour);
            const phase3 = dynamic_node?.data[
              'electricity.voltage.voltage_phase_3_estimated_instantaneous'
            ]?.find((item) => item.timestamp === hour);

            /* TODO: how to solve missing value waiting for SmarterInstruments,
             ** solution should be send -1 as missing value or dont send object with missing value at all
             */
            return [
              index,
              phase1 ? phase1.value : 230,
              phase2 ? phase2.value : 230,
              phase3 ? phase3.value : 230,
            ];
          }
        }),
        uplinks: graphData.links.map((link, index) => {
          return [index, 0, 0];
        }),
      };
    }),
  };
};
