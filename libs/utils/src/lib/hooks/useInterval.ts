import { useEffect, useRef } from 'react';
import { isNil } from 'ramda';

export const useInterval = (
  callback: () => void,
  delay: number | null,
): void => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (!isNil(delay)) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
