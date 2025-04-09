import type { HTMLAttributes } from 'react';

export type BDRSVal = 12 | 16 | 20 | 24 | 32 | 48 | 64;

export interface ShapeProps extends HTMLAttributes<HTMLDivElement> {
  borderRadius?: number;
  fixedHeight?: number;
  className?: string;
  isGradient?: boolean;
  gradientDirection?: 'right' | 'left' | 'bottom' | 'top';
  stroke?: number;
  defferedRender?: boolean;
  contractXBy?: number;
  height?: number;
}

export interface CornerProps extends HTMLAttributes<HTMLDivElement> {
  borderRadius?: number;
  isGradient?: boolean;
  gradientDirection?: 'right' | 'left' | 'bottom' | 'top';
  stroke?: number;
  corners?: ('tl' | 'tr' | 'br' | 'bl')[];
}
