import IconH1 from '../svg/h1.svg';
import IconH2 from '../svg/h2.svg';
import IconH3 from '../svg/h3.svg';
import IconH4 from '../svg/h4.svg';
import IconH5 from '../svg/h5.svg';
import IconH6 from '../svg/h6.svg';
import IconParagraph from '../svg/text.svg';
import IconBulletedList from '../svg/list-ul.svg';
import IconNumberedList from '../svg/list-ol.svg';

import type { ToolbarItemProps } from '../interfaces';

const TEXT_ITEMS: ToolbarItemProps[][] = [
  [
    {
      id: 'h1',
      Icon: IconH1,
      command: (chain) => chain.focus().toggleHeading({ level: 1 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 1 }),
    },
    {
      id: 'h2',
      Icon: IconH2,
      command: (chain) => chain.focus().toggleHeading({ level: 2 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 2 }),
    },
    {
      id: 'h3',
      Icon: IconH3,
      command: (chain) => chain.focus().toggleHeading({ level: 3 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 3 }),
    },
    {
      id: 'h4',
      Icon: IconH4,
      command: (chain) => chain.focus().toggleHeading({ level: 4 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 4 }),
    },
    {
      id: 'h5',
      Icon: IconH5,
      command: (chain) => chain.focus().toggleHeading({ level: 5 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 5 }),
    },
    {
      id: 'h6',
      Icon: IconH6,
      command: (chain) => chain.focus().toggleHeading({ level: 6 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 6 }),
    },
  ],
  [
    {
      id: 'paragraph',
      Icon: IconParagraph,
      command: (chain) => chain.focus().setParagraph().run(),
    },
  ],
  [
    {
      id: 'bulletList',
      Icon: IconBulletedList,
      command: (chain) => chain.focus().toggleBulletList().run(),
    },
    {
      id: 'orderedList',
      Icon: IconNumberedList,
      command: (chain) => chain.focus().toggleOrderedList().run(),
    },
  ],
];

export { TEXT_ITEMS };
