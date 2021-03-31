/* ALL optional values are defined in interface proposal but not used in real model !!! */
export type VgaStaticData = {
  color?: Array<String>;
  timeline: object;
  toolbox?: object;
  title?: {
    text: string;
  };
  tooltip?: { show: boolean };
  legend?: object;
  label?: {
    show: true;
  };
  series: Array<VgaSeriesObject>;
};

export type VgaDynamicData = {
  frames: Array<VgaFrame>;
};

export type VgaSeriesObject = {
  type?: string;
  name?: string;
  layout?: string;
  symbolSize?: number;
  categories?: Array<object>;
  data: Array<VgaNode>;
  links: Array<VgaLink>;
};

export type VgaLink = {
  name?: string;
  id: string;
  source: string;
  target: string;
};

export type VgaNode = {
  name?: string;
  id: string;
  x: number;
  y: number;
  category: number;
  symbolSize?: number;
};

export type VgaFrame = {
  timestamp: string;
  /* indikátor celého snímku, říka zda se jedná o celý snímek (true) nebo jen přírustek toho předcházejícího(false) */
  wholeFrame: boolean;
  /* dvojice: [id_objektu, value] => kde id_objektu odpovídá pozici v poli links(hran) v rámci statických dat) */
  links: Array<[number, number]>;
  /* dvojice: [id_objektu, value] => kde id_objektu odpovídá pozici v poli nodes(uzlů) v rámci statických dat) */
  nodes: Array<[number, number]>;
  /* čtveřice: [id_objektu, value_1faze, value_2faze, value_3faze],
   * kde hodnota -1 znamena ze hodnota neni definovana (chyba odečtu, případně při estimaci)
   * */
  upnodes: Array<[number, number, number, number]>;
  /* trojice: [id_objektu, indikator_problemu, symbol_problemu]
   * kde indikator_problemu je binární hodnota buď 0 nebo 1 a znamená, že je/neni problem
   * symbol_problemu - je identifikace symbolu, který se má zobrazit
   */
  uplinks: Array<[number, number, number]>;
};
