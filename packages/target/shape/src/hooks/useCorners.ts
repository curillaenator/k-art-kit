import { calc } from './helpers';
import type { CornerProps } from '../interfaces';

const PATHS_CACHE = new Map();

export const useCorners = (props: CornerProps) => {
  const { stroke = 0, borderRadius = 16, ...rest } = props;
  const key = `${borderRadius}_${stroke}`;

  if (!PATHS_CACHE.has(key)) PATHS_CACHE.set(key, calc(borderRadius, stroke));

  const { R, borderPath, path } = PATHS_CACHE.get(key) as { R: number; path: string; borderPath: string };

  return {
    ...rest,
    stroke,
    path,
    borderPath,
    commonSvgProps: {
      version: '1.1',
      width: R,
      height: R,
      shapeRendering: 'geometricPrecision',
      viewBox: `0 0 ${R} ${R}`,
      xmlns: 'http://www.w3.org/2000/svg',
    },
  };
};
