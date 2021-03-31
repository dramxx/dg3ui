import React from 'react';
import Modal from 'react-modal';

import { TypeItem } from '../../model';
import { FlexCol, FlexRow, StyledButton, TreeItemRow, TreeSearch } from './styles';

Modal.setAppElement('#root');

interface Props {
  types: TypeItem[];
  initialSelection: TypeItem[];
  onApply: (selection: TypeItem[]) => void;
  onCancel: () => void;
}

export default function TreeSearchModal(props: Props) {
  const { types, initialSelection, onApply, onCancel } = props;

  const [selection, setSelection] = React.useState(initialSelection);

  React.useEffect(() => {
    setSelection(initialSelection);
  }, [initialSelection]);

  const roots = React.useMemo(() => {
    return types.filter((x) => x.parent === null);
  }, [types]);

  const findDescendantLeaves = (type: TypeItem, result: TypeItem[] = []) => {
    type.children.forEach((childId) => {
      const child = types.find((x) => x.id === childId);
      if (child.children.length === 0) {
        result.push(child);
      } else {
        findDescendantLeaves(child, result);
      }
    });
    return result;
  };

  const isItemChecked = (item: TypeItem): boolean => {
    if (item.children.length === 0) {
      return selection.map((x) => x.id).includes(item.id);
    } else {
      const descendantLeaves = findDescendantLeaves(item);
      return descendantLeaves.every((leaf) => isItemChecked(leaf));
    }
  };

  const renderTreeItem = (item: TypeItem, level = 0) => {
    const isChecked = isItemChecked(item);
    const children = item.children.map((childId) => types.find((type) => type.id === childId));
    const toggleItem = () => {
      const toggledItems = item.children.length === 0 ? [item] : findDescendantLeaves(item);
      if (isChecked) {
        setSelection(selection.filter((x) => !toggledItems.find((y) => y.id === x.id)));
      } else {
        setSelection([...selection, ...toggledItems]);
      }
    };
    return [
      <TreeItemRow key={item.id} level={level} onClick={toggleItem}>
        <input
          type={'checkbox'}
          checked={isChecked}
          onChange={() => {
            /* void handler */
          }}
        />
        <span style={{ marginLeft: '1rem' }}>{item.label}</span>
      </TreeItemRow>,
      ...children.map((child) => renderTreeItem(child, level + 1)),
    ];
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onCancel}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '60rem',
          height: '50rem',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <FlexCol>
        <TreeSearch>{roots.map((root) => renderTreeItem(root, 0))}</TreeSearch>
        <FlexRow align={'center'} justify={'flex-end'} style={{ marginTop: '2rem', width: '100%' }}>
          <StyledButton onClick={onCancel} style={{ marginRight: '1rem' }}>
            Cancel
          </StyledButton>
          <StyledButton onClick={() => onApply(selection)}>Apply</StyledButton>
        </FlexRow>
      </FlexCol>
    </Modal>
  );
}
