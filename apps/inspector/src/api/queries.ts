import gql from 'graphql-tag';

export const GET_INSTANCE_ID_FROM_VALUE_ID = gql`
  query getInstanceIdFromValueId($ids: [ID!]!) {
    diosSetById(ids: $ids) {
      items {
        object {
          internalId
        }
      }
    }
  }
`;

export const INSTANCES_TEMPLATES_TAB_DETAILS = gql`
  query instancesTemplatesTabDetails($id: [ID!]!) {
    instances(filter: { node: { internalId: $id } }) {
      templatesShouldSatisfy {
        id
        localization {
          name
          description
        }
      }

      templatesNotSatisfy {
        id
      }

      templatesSatisfy {
        id
      }
    }
  }
`;

export const INSTANCES_ATTRIBUTES_TAB_DETAILS = gql`
  query instancesAttributesTabDetails($id: [ID!]) {
    instances(filter: { node: { internalId: $id } }) {
      internalId
      hlavni_druh: coreElement {
        id
        localization {
          name
        }
      }

      pod_druh: element {
        ... on DeviceKind {
          id
          localization {
            name
            description
          }
        }

        ... on PlaceKind {
          id
          localization {
            name
            description
          }
        }

        ... on GenericElement {
          id
          localization {
            name
            description
          }
        }
      }

      attributes {
        did {
          id
          localization {
            name
            description
          }
        }
        normalizedValue
      }
    }
  }
`;

export const INSTANCE_RELATIONS_TAB = gql`
  query instanceRelations($id: [ID!]) {
    instances(filter: { node: { internalId: $id } }) {
      internalId
      edgeInstance {
        direction
        type
        existsFrom
        existsTo
        attributes {
          did {
            id
          }
          normalizedValue
        }
        edgeEndPoint {
          coreElement {
            id
            localization {
              name
              description
            }
          }
          id {
            did {
              id
              localization {
                name
              }
            }
            value
          }
        }
      }
    }
  }
`;

export const GET_INSTANCES = gql`
  query GET_INSTANCES($types: [InstancePatternMatcher!]) {
    instances(filter: { OR: $types }) {
      internalId
      __typename
      ... on GenericInstance {
        element {
          localization {
            name
            description
          }
        }
      }
      ... on Place {
        kind {
          localization {
            name
            description
          }
        }
      }
      ... on Device {
        kind {
          localization {
            name
            description
          }
        }
      }
      id {
        did {
          id
        }
        value
      }
      attributes {
        did {
          id
          localization {
            name
            description
            abbreviation
          }
        }
        normalizedValue
      }
    }
  }
`;

export const GET_INSTANCE_TYPES = gql`
  query GET_INSTANCE_TYPES($query: String!) {
    elements(
      filter: {
        fullTextSearch: { query: $query }
        coreElements: null
        includeDeprecated: false
        includeAncestors: true
        includeDescendants: true
      }
    ) {
      ... on GenericElement {
        id
        localization {
          name
          description
        }
        parent {
          id
        }
        children {
          id
        }
        filterMatch
      }
      ... on DeviceKind {
        id
        localization {
          name
          description
        }
        parent {
          id
        }
        children {
          id
        }
        filterMatch
      }
      ... on PlaceKind {
        id
        localization {
          name
          description
        }
        parent {
          id
        }
        children {
          id
        }
        filterMatch
      }
      ... on Template {
        id
        localization {
          name
          description
        }
        parent {
          id
        }
        children {
          id
        }
        filterMatch
      }
    }
  }
`;

export const GET_FULL_DIOS_OVERVIEW = gql`
  query table($start: DateTime!, $end: DateTime!, $types: [ID!], $size: Int!, $offset: Int!) {
    diosSet(time: { single: { from: $start, to: $end } }, filter: { didFilter: { ids: $types } }) {
      items(paging: { size: $size, offset: $offset }, ordering: { byField: TIMESTAMP, order: DESCENDING }) {
        id
        time_stamp: timestamp
        time_of_indexing: startIndexing
        data_type: did {
          id
          localization {
            name
            description
          }
          dataType {
            id
            localization {
              name
            }
          }
        }
        author: author {
          element {
            __typename
            ... on DeviceKind {
              device_class: coreElement {
                id
                localization {
                  name
                }
              }
              device_kind: id
              localization {
                name
              }
            }
            ... on PlaceKind {
              place_class: coreElement {
                id
                localization {
                  name
                }
              }
              place_kind: id
              localization {
                name
              }
            }
            ... on GenericElement {
              generic_class: coreElement {
                id
                localization {
                  name
                }
              }
              generic_kind: id
              localization {
                name
              }
            }
          }
        }
        object: object {
          element {
            __typename
            ... on DeviceKind {
              device_class: coreElement {
                id
                localization {
                  name
                }
              }
              device_kind: id
              localization {
                name
              }
            }
            ... on PlaceKind {
              place_class: coreElement {
                id
                localization {
                  name
                }
              }
              place_kind: id
              localization {
                name
              }
            }
            ... on GenericElement {
              generic_class: coreElement {
                id
                localization {
                  name
                }
              }
              generic_kind: id
              localization {
                name
              }
            }
          }
        }
        validity {
          isInvalid
          isDuplicity
        }
        value {
          certainty
          normalizedValue
          normalizedType
          raw
        }
      }
    }
  }
`;

//TODO: wont be needed soon
export const GET_DIOS_OVERVIEW = gql`
  query TABLE($start: DateTime!, $end: DateTime!, $types: [ID!], $size: Int!, $offset: Int!) {
    diosSet(time: { single: { from: $start, to: $end } }, filter: { didFilter: { ids: $types } }) {
      items(paging: { size: $size, offset: $offset }, ordering: { byField: TIMESTAMP, order: DESCENDING }) {
        id
        timestamp
        did {
          id
          localization {
            name
          }
        }
        value {
          normalizedType
          normalizedValue
        }
      }
    }
  }
`;

export const GET_DIO_VALUES = gql`
  query Records($start: DateTime!, $end: DateTime!) {
    diosSet(time: { single: { from: $start, to: $end } }) {
      items(ordering: { byField: TIMESTAMP, order: DESCENDING }) {
        id
        timestamp
        value {
          normalizedValue
        }
      }
    }
  }
`;

export const GET_DIO_VALUE_TYPES = gql`
  query GET_DIO_VALUE_TYPES($query: String!) {
    topics( # Pokud chceme zobrazovat stromovou strukturu a ne jenom flat list didů ptáme se na topicy
      filter: {
        # Filtr se aplikuje na topicy a didy současně
        fullTextSearch: { query: $query } # Hledá topicy a didy, které v příslušné lokalizaci obsahují toto slovo, lze si zde hrát s tím ve kterých polích se vyhledává a s citlivosti hledání
        includeDeprecated: false # Určuje zda se mají zobrazit i zneplatněné záznamy
        includeAncestors: true # Zda se mají načíst i rodičové nalezených objektů, je užitečné pokud chceme zobrazit celou stromovou strukturu nalezených hodnot. Rozlišit záznamy, které odpovídají filtru a které jsou zde jenom pro doplnění stromu lze pomocí políčka filterMatch
        includeDescendants: true # Určuje zda se mají načíst potomci odpovídajícího topicu, např.: zadám do fulltextu electricity, pokud je tato hodnota false najde mi to pouze topic electricity, pokud dám true najde mi to i electricity->voltage i když v lokalizaci napětí se nic o elektřině nepíše
      }
    ) {
      id # Potřeba pro sestavení stromů topiců (reference z parent.id)
      parent {
        id # Potřeba pro sestavení stromů topiců (reference z id)
      }
      children {
        id
      }
      filterMatch # Zda položka odpovídá filtru nebo byla doplněna na základě voleb includeAncestors, includeDescendants
      localization {
        # Lokalizace pro topic
        name
        description
      }
      didsDirect {
        # Didy nacházející se v topicu
        id # Výsledkem GUI filtru je seznam těchto id
        localization {
          # Lokalizace pro did
          name
          description
        }
        filterMatch # Zda položka odpovídá filtru nebo byla doplněna na základě voleb includeAncestors, includeDescendants
      }
    }
  }
`;

export const GET_CHART_DATA = gql`
  query ChartData($start: DateTime!, $end: DateTime!, $granularity: CalendarTime!) {
    diosSet(
      filter: { didFilter: { ids: ["information:electricity.power.active_power.active_power_instantaneous"] } }
      time: { single: { from: $start, to: $end } }
    ) {
      splitByTimestampInterval(
        split: { explicit: { showEmpty: true, granularity: { calendarInterval: { time: $granularity } } } }
      ) {
        from
        to
        set {
          count
        }
      }
    }
  }
`;

// Value detail tabs

export const VALUES_DETAIL_ATTRIBUTES_TAB = gql`
  query VALUES_DETAIL_ATTRIBUTES_TAB($id: ID!) {
    diosSetById(ids: [$id]) {
      items {
        id
        did {
          id
          localization {
            name
          }
        }
        startIndexing
        timestamp
        tags {
          key
          value
        }
        taskExecution {
          id
        }
        taskExecutionNode {
          id
        }
        validity {
          isDuplicity
          isInvalid
        }
        value {
          certainty
          normalizedType
          normalizedValue
          raw
        }
      }
    }
  }
`;

export const VALUES_DETAIL_AUTHOR_TAB = gql`
  query VALUES_DETAIL_AUTHOR_TAB($id: ID!) {
    diosSetById(ids: [$id]) {
      items {
        id
        author {
          internalId
        }
      }
    }
  }
`;

export const VALUES_DETAIL_MEDIATOR_TAB = gql`
  query VALUES_DETAIL_MEDIATOR_TAB($id: ID!) {
    diosSetById(ids: [$id]) {
      items {
        id
        mediators {
          internalId
        }
      }
    }
  }
`;

export const VALUES_DETAIL_OBJECT_TAB = gql`
  query VALUES_DETAIL_OBJECT_TAB($id: ID!) {
    diosSetById(ids: [$id]) {
      items {
        id
        object {
          internalId
        }
      }
    }
  }
`;
