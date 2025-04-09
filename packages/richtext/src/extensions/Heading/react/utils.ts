import { toPairs } from 'lodash';
import styles from './headings.module.scss';

import { CYRILLIC_TO_LATIN } from './translitMaps';

const avgAttrs = {
  width: '32',
  height: '32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const pathAttrs = {
  stroke: 'currentColor',
  'stroke-width': '1.2',
  'stroke-linecap': 'round',
};

const translit = (textValue: string): string => {
  return textValue
    .split('')
    .map((char) => CYRILLIC_TO_LATIN[char] || char)
    .join('');
};

const createSvg = () => {
  const ic = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  ic.setAttributeNS(ic.namespaceURI, 'viewBox', '0 0 32 32');
  toPairs(avgAttrs).forEach(([atr, val]) => ic.setAttribute(atr, val));

  return ic;
};

const getLinkIcon = () => {
  const linkIcon = createSvg();
  const path = document.createElementNS(linkIcon.namespaceURI, 'path');
  toPairs(pathAttrs).forEach(([atr, val]) => path.setAttribute(atr, val));
  path.setAttribute(
    'd',
    'M16.8506 13.6225C17.173 13.7765 17.4751 13.987 17.7421 14.254C19.0038 15.5157 19.0038 17.5613 17.7421 18.823L14.5114 22.0537C13.2497 23.3154 11.2041 23.3154 9.94236 22.0537C8.68067 20.792 8.68067 18.7464 9.94236 17.4847L11.2038 16.2233M20.7884 15.7767L22.0498 14.5153C23.3115 13.2536 23.3115 11.208 22.0498 9.94627C20.7881 8.68458 18.7425 8.68458 17.4808 9.94627L14.2501 13.177C12.9884 14.4387 12.9884 16.4843 14.2501 17.746C14.5171 18.013 14.8192 18.2235 15.1415 18.3775',
  );
  linkIcon.append(path);
  return linkIcon;
};

interface PopupItemProps {
  caption: string;
  onClick: (e: MouseEvent) => void;
}

const getPopupItem = (props: PopupItemProps) => {
  const { caption, onClick } = props;

  const item = document.createElement('button');
  item.type = 'button';
  item.classList.add(styles.popupItem);
  item.innerText = caption;

  item.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return item;
};

const getPopupPlacement = (nodeEndsAt: number) =>
  nodeEndsAt > window.innerWidth * 0.8 ? 'bottom-left' : 'bottom-right';

const getHeadingScrollHash = (hText: string, hId: string) => {
  const clearedContent = hText.replace(/[^a-zA-ZА-Яа-я0-9]/g, '_').toLowerCase();
  const hash_postfix = btoa(hId).slice(0, 4).toUpperCase();

  return `${translit(clearedContent)}_${hash_postfix}`.replace(/_+/g, '_');
};

export { getLinkIcon, getPopupItem, getPopupPlacement, getHeadingScrollHash };
