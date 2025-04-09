import { CSSProperties } from 'react';

export type Layers = 'cloud4' | 'cloud3' | 'cloud2' | 'cloud1' | 'back5' | 'back4' | 'back3' | 'back2' | 'back1' | 'bg';

export interface BackgroundProps {
  positionStyles: Record<Layers, CSSProperties>;
}
