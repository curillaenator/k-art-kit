import TocIcon from '../svg/toc.svg';

import type { ToolbarItemProps } from '../interfaces';

const TOC_ITEMS: ToolbarItemProps[] = [
  {
    id: 'insertTableOfContent',
    Icon: TocIcon,
    command: (chain) => chain.focus().insertToc().run(),
    isActive: () => false,
  },
];

export { TOC_ITEMS };
