import React, { useState } from 'react';
import { treeData } from '../../../../../components/src/lib/TreeView/TreeViewMock';
import styled from 'styled-components';
import { TreeView } from '@dg3/components';

const StyledContentQuery = styled.div`
  display: flex;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 0.1rem solid ${(props) => props.theme.colors.grey2};
`;

const StyledFilterItems = styled.span`
  margin: 0 0.2rem;
`;

const ContentQuery = (props) => {
  const deleteItem = (id: string) => {
    props.list.find((item) => item.id === id)
      ? props.deleteItem(id)
      : undefined;
  };

  return (
    <StyledContentQuery>
      {props.list.map((item) => (
        <StyledFilterItems key={item.id}>
          {/*<Chip label={item.label} id={item.id} active={true}/>*/}
        </StyledFilterItems>
      ))}
    </StyledContentQuery>
  );
};

export const ListOfKindsTab = () => {
  const [list, setList] = useState([]);

  const deleteItem = (id: string) => {
    list.find((item) => item.id === id)
      ? setList(list.filter((item) => item.id !== id))
      : undefined;
  };

  return (
    <div>
      <div>{'List of Kinds Tab Content'}</div>
      <div>
        <TreeView
          data={treeData}
          onClickItem={({ key, label }) => {
            !list.find((item) => item.id === key)
              ? setList([...list, { id: key, label: label }])
              : setList(list.filter((item) => item.id !== key));
            console.log(list);
            console.log(`You clicked item: ${key}\nwith label: ${label}`);
          }}
        />
        <ContentQuery list={list} deleteItem={deleteItem}/>
      </div>
    </div>
  );
};
