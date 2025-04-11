import { RefObject, useEffect, useMemo } from 'react';

import { BaseScrollManager } from './ScrollManager';

export const useDisabledScroll = <T extends HTMLElement>(
  document: Document,
  window: Window,
  targets: RefObject<T | null>[] = [],
) => {
  const scroll = useMemo(() => new BaseScrollManager(targets, { document, window }), [document, window, targets]);

  useEffect(() => {
    scroll.disable();

    return () => scroll.enable();
  }, [scroll]);
};
