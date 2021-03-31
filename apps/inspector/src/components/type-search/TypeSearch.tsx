import produce from 'immer';
import React from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import Modal from 'react-modal';
import { useDebounce } from 'use-lodash-debounce';

import { TypeItem } from '../../model';
import { TypeColors } from '../../model/type-colors';
import {
  FlexCol,
  FlexRow,
  StyledButton,
  StyledColorPicker,
  StyledInput,
  StyledTypeItem,
  StyledTypeItemName,
  StyledTypeSearch,
} from './styles';
import TreeSearchModal from './TreeSearchModal';

Modal.setAppElement('#root');

interface Props {
  types: TypeItem[];
  selectedTypes: TypeItem[];
  onSearch: (query: string) => void;
  onChange: (types: TypeItem[]) => void;
}

export default function TypeSearch(props: Props) {
  const { types, selectedTypes, onSearch, onChange } = props;

  const [typeToChangeColor, setTypeToChangeColor] = React.useState<string>();
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [showTreeSearch, setShowTreeSearch] = React.useState(false);

  React.useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  const leafs = React.useMemo(() => {
    return types.filter((x) => x.children.length === 0);
  }, [types]);

  const availableTypes = React.useMemo(() => {
    const selectedIds = selectedTypes.map((x) => x.id);
    return leafs.filter((x) => !selectedIds.includes(x.id));
  }, [leafs, selectedTypes]);

  const selectType = (type: TypeItem) => {
    const lastColorIndex = selectedTypes.length % TypeColors.length;
    const color = TypeColors[lastColorIndex];
    onChange([...selectedTypes, { ...type, color }]);
  };

  const deselectType = (type: TypeItem) => {
    onChange(selectedTypes.filter((x) => x.id !== type.id));
  };

  const changeColor = (id: string) => {
    if (!typeToChangeColor) {
      setTypeToChangeColor(id);
    } else {
      setTypeToChangeColor(undefined);
    }
  };

  const finishColorChange = (color: ColorResult) => {
    const updatedTypes = produce(selectedTypes, (draft) => {
      const index = draft.findIndex((x) => x.id === typeToChangeColor);
      draft[index].color = color.hex;
    });
    onChange(updatedTypes);
    setTypeToChangeColor(undefined);
  };

  return (
    <StyledTypeSearch>
      <FlexRow>
        <StyledButton onClick={() => setShowTreeSearch(true)}>...</StyledButton>
        <StyledInput placeholder={'Search...'} value={search} onChange={(e) => setSearch(e.target.value)} />
      </FlexRow>
      <FlexCol>
        <h4>Selected</h4>
        {selectedTypes.map((type) => (
          <StyledTypeItem key={type.id}>
            <div className={'color-dot'} style={{ background: type.color }} onClick={() => changeColor(type.id)} />
            {typeToChangeColor === type.id && (
              <StyledColorPicker>
                <TwitterPicker colors={TypeColors} onChangeComplete={finishColorChange} />
              </StyledColorPicker>
            )}
            <StyledTypeItemName>{type.label}</StyledTypeItemName>
            <div className={'button'} onClick={() => deselectType(type)}>
              -
            </div>
          </StyledTypeItem>
        ))}
      </FlexCol>
      <FlexCol>
        <h4>Available</h4>
        {availableTypes.map((type) => (
          <StyledTypeItem key={type.id}>
            <StyledTypeItemName>{type.label}</StyledTypeItemName>
            <div className={'button'} onClick={() => selectType(type)}>
              +
            </div>
          </StyledTypeItem>
        ))}
      </FlexCol>
      {showTreeSearch && (
        <TreeSearchModal
          types={types}
          initialSelection={selectedTypes}
          onApply={(selection) => {
            onChange([...selection.map((type, i) => ({ ...type, color: TypeColors[i] }))]);
            setShowTreeSearch(false);
          }}
          onCancel={() => setShowTreeSearch(false)}
        />
      )}
    </StyledTypeSearch>
  );
}
