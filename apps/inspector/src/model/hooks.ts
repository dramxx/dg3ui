import * as React from 'react';
import * as Redux from 'react-redux';

export function useForceRender() {
  const [, setState] = React.useState(false);
  return React.useCallback(() => setState((value) => !value), []);
}

export function useAsyncEffect(
  effect: (...args: unknown[]) => Promise<void>,
  deps: React.DependencyList
) {
  React.useEffect(() => {
    effect();
  }, deps);
}

export function useAsyncLayoutEffect(
  effect: (...args: unknown[]) => Promise<void>,
  deps: React.DependencyList
) {
  React.useLayoutEffect(() => {
    effect();
  }, deps);
}

export function useAfterMountEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    if (isMounted) {
      effect();
    }
  }, deps);
}

export function useReduxActions<ActionCreators>(creators: ActionCreators) {
  type ArgsTypes<F> = F extends (...args: infer Args) => infer R ? Args : never;

  type ExecutableActions<ActionCreators> = {
    [Key in keyof ActionCreators]: (
      ...args: ArgsTypes<ActionCreators[Key]>
    ) => void;
  };

  const dispatch = Redux.useDispatch();

  const result = React.useMemo(() => {
    return Object.keys(creators).reduce((acc, key) => {
      const actionCreator = creators[key];
      const execution = (...args: any) => {
        const action = actionCreator(...args);
        dispatch(action);
      };
      return { ...acc, [key]: execution };
    }, {});
  }, [dispatch]);

  return result as ExecutableActions<ActionCreators>;
}

export function useReduxSelector<TState, TSelected>(
  selector: (state: TState) => TSelected
) {
  return Redux.useSelector(selector);
}
