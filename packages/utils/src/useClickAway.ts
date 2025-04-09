import { MutableRefObject, useEffect } from 'react';

export const useClickAway = (
  containerRef: MutableRefObject<HTMLElement | null>,
  onOutside: () => void,
  listenerOptions: boolean | AddEventListenerOptions = { capture: true },
): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as HTMLElement)) {
        onOutside();
      }
    };
    document.addEventListener('click', handleClick, listenerOptions);

    return () => document.removeEventListener('click', handleClick, listenerOptions);
  }, [containerRef, onOutside, listenerOptions]);
};
