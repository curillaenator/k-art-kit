import {
  TOOLBAR_MIN_FULL_WIDTH,
  TOOLBAR_MIN_MEDIUM_WIDTH,
  TOOLBAR_MIN_COMPACT_WIDTH,
  TOOLBAR_MIN_SMALL_WIDTH,
} from '../constants';
import type { ToolbarCompositionTypeName } from '../interfaces';

export const calcComposition = (width: number): ToolbarCompositionTypeName => {
  if (width > TOOLBAR_MIN_FULL_WIDTH) return 'full';
  if (width > TOOLBAR_MIN_MEDIUM_WIDTH) return 'medium';
  if (width > TOOLBAR_MIN_COMPACT_WIDTH) return 'compact';
  if (width > TOOLBAR_MIN_SMALL_WIDTH) return 'small';
  return 'minimal';
};
