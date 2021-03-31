import { useCallback, useState } from 'react';

export const useSingleSwitch = (): [boolean, () => void] => {
  const [value, setValue] = useState(false);
  const turnOn = useCallback(() => setValue(true), [setValue]);
  return [value, turnOn];
};
