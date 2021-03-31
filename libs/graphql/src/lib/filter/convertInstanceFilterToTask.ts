export const convertInstanceFilterToTask = (ids, coreElement) => ({
  OR: ids.map((id) => ({
    anyNode: { entityInScope: { id: { id, coreElement } } },
  })),
});
