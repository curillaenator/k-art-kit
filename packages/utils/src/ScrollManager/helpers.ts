export const getScrollbarSize = (doc: Document, win: Window): number => {
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(win.innerWidth - documentWidth);
};

export const getPaddingRight = (element: HTMLElement, win: Window): number => {
  const { paddingRight } = win.getComputedStyle(element);

  return parseInt(paddingRight, 10);
};

export const normalizeDataKey = (key: string) => key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);

export const saveDataAttribute = (element: HTMLElement, key: string, value: string) => {
  element.setAttribute(`data-kit-${normalizeDataKey(key)}`, value);
};

export const removeDataAttribute = (element: HTMLElement, key: string) => {
  element.removeAttribute(`data-kit-${normalizeDataKey(key)}`);
};

export const getDataAttribute = (element: HTMLElement, key: string) =>
  element.getAttribute(`data-kit-${normalizeDataKey(key)}`) || '';
