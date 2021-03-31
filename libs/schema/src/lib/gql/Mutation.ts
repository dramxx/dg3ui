import { Literal, Static, Union } from 'runtypes';

export const MutationSchema = Union(
  Literal('EditTaskPlans'),
  Literal('EditInventoryEntity')
);

export type Mutation = Static<typeof MutationSchema>;
