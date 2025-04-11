import { useState, useEffect, useCallback } from 'react';

type WindowSize = {
  height: number | undefined;
  width: number | undefined;
};

export type WindowFallback = {
  innerWidth?: number;
  innerHeight?: number;
  addEventListener: Function;
  removeEventListener: Function;
};

const WINDOW_OBJECT_FALLBACK: WindowFallback = {
  innerWidth: undefined,
  innerHeight: undefined,
  addEventListener: () => {},
  removeEventListener: () => {},
};

export function useWindowSize(w: WindowFallback | Window = window || WINDOW_OBJECT_FALLBACK): {
  height: number | undefined;
  width: number | undefined;
} {
  const getSize = useCallback(
    (): WindowSize => ({
      width: w.innerWidth,
      height: w.innerHeight,
    }),
    [w.innerHeight, w.innerWidth],
  );

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    w.addEventListener('resize', handleResize);

    return () => w.removeEventListener('resize', handleResize);
  }, [getSize, w]);

  return windowSize;
}
