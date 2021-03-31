import { DocumentNode } from 'graphql';

import { Mutation } from '@dg3/schema';
import { UPDATE_INVENTORY_ENTITY } from './UpdateInventoryEntity';
import { UPDATE_TASK_PLANS } from './UpdateTaskPlans';

export const mutations: Record<Mutation, DocumentNode> = {
  EditTaskPlans: UPDATE_TASK_PLANS,
  EditInventoryEntity: UPDATE_INVENTORY_ENTITY,
};
