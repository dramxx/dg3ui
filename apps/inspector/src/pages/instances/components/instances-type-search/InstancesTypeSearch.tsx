import { InstanceType } from '@api';
import TypeSearch from '@components/type-search';
import { TypeItem } from '@model';
import React from 'react';

interface Props {
  types: InstanceType[];
  selectedTypes: InstanceType[];
  onSearch: (query: string) => void;
  onChange: (types: InstanceType[]) => void;
}

export default function InstancesTypeSearch(props: Props) {
  const { types, selectedTypes, onSearch, onChange } = props;

  const mapValueTypeToGenericType = (array: InstanceType[]) => {
    return array.map<TypeItem>((x) => ({
      id: x.id,
      label: x.localization.name,
      color: x.color,
      children: x.children.map((child) => child.id),
      parent: x.parent ? x.parent.id : null,
    }));
  };

  const mapGenericTypeToValueType = (array: TypeItem[]) => {
    return array.map<InstanceType>((x) => {
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
