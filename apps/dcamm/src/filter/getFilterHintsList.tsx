import jq from 'jq-web';
import { isNil } from 'ramda';

import { CoreElementKey, SimpleFilterValue } from '@dg3/types';

export type FormattedHints = {
  [key: string]: Array<SimpleFilterValue>;
};

// Set here the DIDs you want to add hints to in the simple filter
type AttributesWithHints = {
  id: string;
  validity: string;
  duplicity: string;
  kind: string;
  lifecycle: string;
  state: string;
};
export const attributesWithHints: AttributesWithHints = {
  kind: 'kind',
  lifecycle: 'information:attribute.device_lifecycle_phase',
  id: 'id',
  validity: 'validity',
  duplicity: 'duplicity',
  state: 'state',
};

export const getFormattedHints = (allHints: object) => {
  return jq.json(
    allHints,
    `
        def hint: {name: .localization.name, id: .id } // null;
        {
          "deviceKinds": .deviceKinds | map(hint),
          "placeKinds": .placeKinds | map(hint),
          "lifecycle": (.dids[] | select( .id =="${attributesWithHints.lifecycle}").dataType.enumValues // null | map(hint)),
          "dids": .infoDios | map(hint),
          "boolean": . | [{name: "true", id: true }, {name: "false", id: false}],
          "taskTemplates": .taskTemplates | map(hint),
          "planState": [{name: "active", id: "ACTIVE"}, {name: "paused", id: "PAUSED"}, {name: "deleted", id: "DELETED"}]
        }
      `
  );
};

export const getFilterHintsList = (
  hints: FormattedHints,
  coreElement: CoreElementKey,
  activeAttributeItem: string,
  attributesWithHints: AttributesWithHints
): Array<SimpleFilterValue> => {
  if (isNil(hints)) {
    return [];
  }
  if (coreElement === 'DEVICE') {
    switch (activeAttributeItem) {
      case attributesWithHints.kind:
        return hints.deviceKinds;
      case attributesWithHints.lifecycle:
        return hints.lifecycle;
    }
  }
  if (coreElement === 'PLACE') {
    switch (activeAttributeItem) {
      case attributesWithHints.kind:
        return hints.placeKinds;
    }
  }
  if (coreElement === 'INFORMATION') {
    switch (activeAttributeItem) {
      case attributesWithHints.id:
        return hints.dids;
      case attributesWithHints.validity:
        return hints.boolean;
      case attributesWithHints.duplicity:
        return hints.boolean;
    }
  }
  if (coreElement === 'TASK') {
    switch (activeAttributeItem) {
      case attributesWithHints.id:
        return hints.taskTemplates;
      case attributesWithHints.state:
        return hints.planState;
    }
  }
  return [];
};
