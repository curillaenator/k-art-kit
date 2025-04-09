export interface ScrollManager {
  disable(): void;
  enable(): void;
  toggle(): void;
}

export type ScrollOptions = { document: Document; window: Window };
