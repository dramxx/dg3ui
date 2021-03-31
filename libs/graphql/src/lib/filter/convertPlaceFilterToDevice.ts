import { INSTALLED_AT_TRAVERSAL } from '../Traversals/Traversals';

export const convertPlaceFilterToDevice = (placeFilter: {
  AND: Array<{ node: object } | {}>;
}) => {
  const filter = {
    AND: [],
  };

  /* this is simple solution to achieve valid type of filter for SingularInstancePatternMatcher
   *  Maybe in future we'll need to split it and make specific creator for this type of filter
   * */
  placeFilter.AND.forEach(
    (condition: { node?: object; rels?: { toPlace: { node: object } } }) => {
      if (condition?.node) {
        filter.AND.push(condition.node);
      }

      /* rels, this part can't be solved easily,
        current solution takes only node part from it.
        We should also consider possible simplification by ignore these rels filters for conversion.
        (TODO: proper solution is finish same filter type support on backend ticket G3-724)
      */
      if (condition?.rels) {
        filter.AND.push(condition.rels.toPlace.node);
      }

      // relsSets is not  currently handled
    }
  );

  return [
    {
      rels: {
        traversal: INSTALLED_AT_TRAVERSAL,
        toPlace: {
          node: filter,
        },
      },
    },
  ];
};
