import { RefObject, useEffect } from 'react';

const preventEvent = (event: Event): void => {
  event.preventDefault();
  event.stopPropagation();
};

export const usePreventEvent = <T extends HTMLElement>(
  targets: RefObject<T | null>[],
  eventType: keyof HTMLElementEventMap,
) => {
  useEffect(() => {
    targets.forEach(({ current }) => {
      if (current) current.addEventListener(eventType, preventEvent, { passive: false });
    });

    return () => {
      targets.forEach(({ current }) => {
        if (current) current.removeEventListener(eventType, preventEvent);
      });
    };
  }, [targets, eventType]);
};
