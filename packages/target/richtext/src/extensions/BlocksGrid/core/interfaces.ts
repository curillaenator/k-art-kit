import type { MutableRefObject } from 'react';

export interface BlocksGridConfig {
  disableOverlap?: boolean;
}

export interface BlocksGridOptions extends BlocksGridConfig {
  blocksCount?: number;
  fatBlockIdx?: number | null;
  timestamp?: number | null;
}

export interface BlocksGridColumnConfig {
  blocksGridId: string | null;
  submitButtonRef?: MutableRefObject<HTMLButtonElement | null>;
  editorContentRef?: React.MutableRefObject<HTMLDivElement | null>;
}
