import React from 'react';
import styled from 'styled-components';
import TreeMenu from 'react-simple-tree-menu';
import { TreeDataType } from './TreeViewMock';

const styledTreeViewWidth = '30rem';

const StyledTreeView = styled.div`
  .toggle-icon {
    display: inline-block;
    &-symbol {
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
    }
  }

  .tree-item-group {
    list-style-type: none;
    padding-left: 0;
    text-align: left;
    width: fit-content;
    min-width: ${styledTreeViewWidth};
  }

  .tree-item {
    padding: 0.5rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.black};
    background: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey1};
    box-shadow: none;
    position: relative;

    &--active {
      color: ${(props) => props.theme.colors.white};
      background: ${(props) => props.theme.colors.primary1};
      border-bottom: none;
    }

    &--focused {
      box-shadow: 0 0 5px 0 #383838;
    }
  }

  .search {
    padding: 1rem 1rem;
    min-width: ${styledTreeViewWidth};
  }
`;

type TreeViewProps = {
  data: TreeDataType[];
  onClickItem?: (obj: TreeDataType) => void;
};

// TODO: this is template for the onClickItem function
//
// const onClickItem = ({ key, label }) => {
//   console.log(`You clicked item: ${key}\nwith label: ${label}`);
// };

export const TreeView = (props: TreeViewProps) => {
  return (
    <StyledTreeView>
      <TreeMenu
        data={props.data}
        disableKeyboard={true}
        onClickItem={props.onClickItem}
      />
    </StyledTreeView>
  );
};
