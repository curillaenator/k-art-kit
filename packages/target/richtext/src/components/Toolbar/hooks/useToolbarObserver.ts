import { useEffect, useState, useRef } from 'react';
import { calcComposition } from './utils';
import type { ToolbarCompositionTypeName } from '../interfaces';

interface ToolbarOptions {
  onCompositionUpdate?: (current: ToolbarCompositionTypeName, prev: ToolbarCompositionTypeName) => void;
}

export const useToolbarObserver = (options: ToolbarOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [composition, setComposition] = useState<ToolbarCompositionTypeName>('full');

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObs = new ResizeObserver(([toolbarEntry]) => {
      const { width } = toolbarEntry?.contentRect || { width: 0 };

      setComposition((prev) => {
        const newComp = calcComposition(width);

        if (options.onCompositionUpdate) options.onCompositionUpdate(newComp, prev);

        return newComp;
      });
    });

    resizeObs.observe(containerRef.current);

    return () => {
      if (!containerRef.current) return;
      resizeObs.unobserve(containerRef.current); // eslint-disable-line react-hooks/exhaustive-deps
    };
  }, [options]);

  return {
    containerRef,
    composition,
  };
};
