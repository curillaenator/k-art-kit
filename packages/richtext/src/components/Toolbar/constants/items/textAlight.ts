import IconTextAlignLeft from '../svg/align-left.svg';
import IconTextAlignCenter from '../svg/align-center.svg';
import IconTextAlignJustify from '../svg/align-justify.svg';
import IconTextAlignRight from '../svg/align-right.svg';

import type { ToolbarItemProps } from '../interfaces';

const TEXT_ALIGN_ITEMS: ToolbarItemProps[] = [
  {
    id: 'left',
    Icon: IconTextAlignLeft,
    command: (chain) => chain.focus().setTextAlign('left').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
  },
  {
    id: 'center',
    Icon: IconTextAlignCenter,
    command: (chain) => chain.focus().setTextAlign('center').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
  },
  {
    id: 'justify',
    Icon: IconTextAlignJustify,
    command: (chain) => chain.focus().setTextAlign('justify').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
  },
  {
    id: 'right',
    Icon: IconTextAlignRight,
    command: (chain) => chain.focus().setTextAlign('right').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
  },
];

export { TEXT_ALIGN_ITEMS };
