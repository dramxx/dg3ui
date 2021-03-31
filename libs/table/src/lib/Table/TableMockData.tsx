import React from 'react';

import { MappingObject } from '@dg3/schema';
import { DefaultColumnFilter } from './Filters/DefaultColumnFilter';

export interface Person {
  id: MappingObject;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
  children: React.ReactNode;
}

export const jsonColumnsConf = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    sortType: 'basic',
    Filter: DefaultColumnFilter,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    sortType: 'basic',
  },
  {
    Header: 'Age',
    accessor: 'age',
    sortType: 'basic',
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    sortType: 'basic',
  },
  {
    Header: 'Status',
    accessor: 'status',
    sortType: 'basic',
    filter: 'includes',
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
    sortType: 'basic',
  },
];

export const TableMockData: Array<Person> = [
  {
    id: { key: 'id', value: '0' },
    age: 3,
    firstName: 'tank',
    lastName: 'cast',
    progress: 18,
    status: 'single',
    visits: 7,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '1' },
    age: 25,
    firstName: 'balance',
    lastName: 'interaction',
    progress: 95,
    status: 'complicated',
    visits: 23,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '2' },
    age: 26,
    firstName: 'honey',
    lastName: 'popcorn',
    progress: 95,
    status: 'single',
    visits: 36,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '3' },
    age: 13,
    firstName: 'procedure',
    lastName: 'coal',
    progress: 26,
    status: 'relationship',
    visits: 98,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '4' },
    age: 3,
    firstName: 'tank',
    lastName: 'cast',
    progress: 18,
    status: 'single',
    visits: 7,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '5' },
    age: 25,
    firstName: 'balance',
    lastName: 'interaction',
    progress: 95,
    status: 'complicated',
    visits: 23,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '6' },
    age: 26,
    firstName: 'honey',
    lastName: 'popcorn',
    progress: 95,
    status: 'single',
    visits: 36,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '7' },
    age: 13,
    firstName: 'procedure',
    lastName: 'coal',
    progress: 26,
    status: 'relationship',
    visits: 98,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '8' },
    age: 3,
    firstName: 'tank',
    lastName: 'cast',
    progress: 18,
    status: 'single',
    visits: 7,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '9' },
    age: 25,
    firstName: 'balance',
    lastName: 'interaction',
    progress: 95,
    status: 'complicated',
    visits: 23,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '10' },
    age: 26,
    firstName: 'honey',
    lastName: 'popcorn',
    progress: 95,
    status: 'single',
    visits: 36,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '11' },
    age: 13,
    firstName: 'procedure',
    lastName: 'coal',
    progress: 26,
    status: 'relationship',
    visits: 98,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '12' },
    age: 3,
    firstName: 'tank',
    lastName: 'cast',
    progress: 18,
    status: 'single',
    visits: 7,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '13' },
    age: 25,
    firstName: 'balance',
    lastName: 'interaction',
    progress: 95,
    status: 'complicated',
    visits: 23,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '14' },
    age: 26,
    firstName: 'honey',
    lastName: 'popcorn',
    progress: 95,
    status: 'single',
    visits: 36,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '15' },
    age: 13,
    firstName: 'procedure',
    lastName: 'coal',
    progress: 26,
    status: 'relationship',
    visits: 98,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '16' },
    age: 3,
    firstName: 'tank',
    lastName: 'cast',
    progress: 18,
    status: 'single',
    visits: 7,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '18' },
    age: 25,
    firstName: 'balance',
    lastName: 'interaction',
    progress: 95,
    status: 'complicated',
    visits: 23,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '19' },
    age: 26,
    firstName: 'honey',
    lastName: 'popcorn',
    progress: 95,
    status: 'single',
    visits: 36,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '20' },
    age: 13,
    firstName: 'procedure',
    lastName: 'coal',
    progress: 26,
    status: 'relationship',
    visits: 98,
    children: <div>Expanded children</div>,
  },
  {
    id: { key: 'id', value: '21' },
    age: 3,
    firstName: 'tank',
    lastName: 'cast',
    progress: 18,
    status: 'single',
    visits: 7,
    children: <div>Expanded children</div>,
  },
];
