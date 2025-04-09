import { useRef, useCallback } from 'react';
import { debounce } from 'lodash';

const useEnableOnChageFn = () => {
  const isOnChangeEnabledRef = useRef<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const enableEditorOnChangeFn = useCallback(
    debounce((enabled: boolean = true) => {
      isOnChangeEnabledRef.current = enabled;
    }, 400),
    [],
  );

  return {
    isOnChangeEnabledRef,
    enableEditorOnChangeFn,
  };
};

export { useEnableOnChageFn };
