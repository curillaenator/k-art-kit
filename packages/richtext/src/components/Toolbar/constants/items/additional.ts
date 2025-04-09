import DividerIcon from '../svg/section-break.svg';
import QuoteIcon from '../svg/quote.svg';
import CodeBlockIcon from '../svg/codeblock.svg';

import type { ToolbarItemProps } from '../interfaces';

const ADDITIONAL_TEXT_ITEMS: ToolbarItemProps[] = [
  {
    id: 'hr',
    Icon: DividerIcon,
    command: (chain) => chain.focus().setHorizontalRule().run(),
    isActive: () => false,
  },
  {
    id: 'blockquote',
    Icon: QuoteIcon,
    command: (chain) => chain.focus().toggleBlockquote().run(),
  },
  {
    id: 'codeBlock',
    Icon: CodeBlockIcon,
    command: (chain) => chain.focus().toggleCodeBlock().run(),
  },
  // {
  //   id: 'expand',
  //   Icon: IconExpand,
  //   command: (chain) => chain.focus().setDetails().run(),
  //   isActive: () => false,
  // },
];

export { ADDITIONAL_TEXT_ITEMS };
