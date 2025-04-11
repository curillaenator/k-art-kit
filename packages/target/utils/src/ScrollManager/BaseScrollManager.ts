import type { RefObject } from 'react';

import { getDataAttribute, getPaddingRight, getScrollbarSize, removeDataAttribute, saveDataAttribute } from './helpers';
import type { ScrollManager, ScrollOptions } from './interfaces';

const DEFAULT_OPTIONS: ScrollOptions = {
  window,
  document,
} as const;

export class BaseScrollManager<T extends HTMLElement> implements ScrollManager {
  private _scrollDisabled = false;

  private _options: ScrollOptions;

  private _targets: RefObject<T | null>[];

  constructor(targets: RefObject<T | null>[], options: Partial<ScrollOptions> = {}) {
    this._options = { ...DEFAULT_OPTIONS, ...options };
    this._targets = targets;
  }

  enable() {
    this._targets.forEach(({ current }) => {
      if (current) this.elementEnableScroll(current);
    });
    this.elementEnableScroll(document.body);
  }

  disable() {
    this._targets.forEach(({ current }) => {
      if (current) this.elementDisableScroll(current);
    });
    this.elementDisableScroll(document.body);
  }

  toggle() {
    if (this._scrollDisabled) {
      this.enable();
    } else {
      this.disable();
    }
  }

  private elementDisableScroll(element: HTMLElement) {
    const { document, window } = this._options;
    const scrollBaWidth = getScrollbarSize(document, window);
    const paddingRight = getPaddingRight(element, window);

    if (element.style.paddingRight) {
      saveDataAttribute(element, 'paddingRight', `${paddingRight}px`);
    }

    if (element.style.overflow) {
      saveDataAttribute(element, 'overflow', element.style.overflow);
    }
    element.style.paddingRight = `${scrollBaWidth + paddingRight}px`;
    element.style.overflow = 'hidden';
    this._scrollDisabled = true;
  }

  private elementEnableScroll(element: HTMLElement) {
    element.style.paddingRight = getDataAttribute(element, 'paddingRight');
    element.style.overflow = getDataAttribute(element, 'overflow');

    removeDataAttribute(element, 'paddingRight');
    removeDataAttribute(element, 'overflow');
    this._scrollDisabled = false;
  }
}
