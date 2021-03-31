import { DioValueTopic, DioValueType } from '@api';
import TypeSearch from '@components/type-search';
import { TypeItem } from '@model';
import React from 'react';

interface Props {
  topics: DioValueTopic[];
  selectedTypes: DioValueType[];
  onSearch: (query: string) => void;
  onChange: (types: DioValueType[]) => void;
}

export default function ValueTypeSearch(props: Props) {
  const { topics, selectedTypes, onSearch, onChange } = props;

  const types = React.useMemo(() => {
    return topics
      .reduce((acc, topic) => {
        if (topic.didsDirect.length === 0) {
          acc.push(topic);
        } else {
          const self = { ...topic, children: topic.didsDirect.map((x) => ({ id: x.id })) };
          const children = topic.didsDirect.map((did) => ({ ...did, parent: { id: self.id }, children: [] }));
          acc.push(self, ...children);
        }
        return acc;
      }, [] as DioValueType[])
      .map((type, index, arr) => ({
        ...type,
        children: type.children.filter((child) => arr.find((x) => x.id === child.id)),
      }));
  }, [topics]);

  console.log(types);

  const mapValueTypeToGenericType = (array: DioValueType[]) => {
    return array.map<TypeItem>((x) => ({
      id: x.id,
      label: x.localization.name,
      color: x.color,
      children: x.children.map((child) => child.id),
      parent: x.parent ? x.parent.id : null,
    }));
  };

  const mapGenericTypeToValueType = (array: TypeItem[]) => {
    return array.map<DioValueType>((x) => {
      const valueType = types.find((type) => type.id === x.id);
      return { ...valueType, color: x.color };
    });
  };

  return (
    <TypeSearch
      types={mapValueTypeToGenericType(types)}
      selectedTypes={mapValueTypeToGenericType(selectedTypes)}
      onSearch={onSearch}
      onChange={(types) => {
        const valueTypes = mapGenericTypeToValueType(types);
        onChange(valueTypes);
      }}
    />
  );
}
