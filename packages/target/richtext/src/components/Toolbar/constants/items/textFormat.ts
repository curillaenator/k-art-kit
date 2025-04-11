import IconTogglerInline from '../svg/inline-code.svg';
import IconBold from '../svg/text-bold.svg';
import IconItalic from '../svg/text-italic.svg';
import IconStrikeThrough from '../svg/text-strikethrough.svg';
import IconUnderline from '../svg/text-underline.svg';

import type { ToolbarItemProps } from '../interfaces';

const TEXT_FORMAT_ITEMS: ToolbarItemProps[] = [
  {
    id: 'bold',
    Icon: IconBold,
    command: (chain) => chain.focus().toggleBold().run(),
  },
  {
    id: 'italic',
    Icon: IconItalic,
    command: (chain) => chain.focus().toggleItalic().run(),
  },
  {
    id: 'strike',
    Icon: IconStrikeThrough,
    command: (chain) => chain.focus().toggleStrike().run(),
  },
  {
    id: 'underline',
    Icon: IconUnderline,
    command: (chain) => chain.focus().toggleUnderline().run(),
  },
  {
    id: 'code',
    Icon: IconTogglerInline,
    command: (chain) => chain.focus().toggleCode().run(),
  },
];

export { TEXT_FORMAT_ITEMS };
