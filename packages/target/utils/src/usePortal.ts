import { useRef, useEffect } from 'react';

export function createRootElement(id: string): HTMLElement {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

export function addRootElement(elem: HTMLElement): void {
  document.body.appendChild(elem);
}

export function removeRootElement(elem: HTMLElement): void {
  document.body.removeChild(elem);
}

export function usePortal(id: string): HTMLElement {
  const portalRef = useRef<HTMLElement>(document.createElement('div'));

  useEffect(() => {
    portalRef.current = createRootElement(id);
    addRootElement(portalRef.current);

    return () => {
      removeRootElement(portalRef.current);
    };
  }, [id]);

  return portalRef.current;
}
