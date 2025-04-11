import { useRef, useState, useEffect, useMemo } from 'react';
import type { ShapeProps } from '../interfaces';

export const useShapeParams = (props: ShapeProps) => {
  const { borderRadius = 18, height: forcedHeight, contractXBy = 0 } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [boundings, setBoundings] = useState<string>('0_0');

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.target.getBoundingClientRect();

      setBoundings(`${width - contractXBy}_${forcedHeight || height}`);
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [forcedHeight, contractXBy]);

  const shapeData: { W: number; H: number; path: string } = useMemo(() => {
    const [W, H] = boundings.split('_').map((v) => +v);

    const minHalf = Math.min(W / 2, H / 2);

    const R = 1.25 * borderRadius > minHalf ? minHalf : 1.25 * borderRadius;
    const S = 0.19 * R;

    const path = `
    M ${W - R} 0 C ${W - S} 0 ${W} ${S} ${W} ${R}
    V ${H - R} C ${W} ${H - S} ${W - S} ${H} ${W - R} ${H}
    H ${R} C ${S} ${H} 0 ${H - S} 0 ${H - R}
    V ${R} C 0 ${S} ${S} 0 ${R} 0 Z
    `.trim();

    return { W, H, path };
  }, [boundings, borderRadius]);

  return { ...shapeData, ref };
};
