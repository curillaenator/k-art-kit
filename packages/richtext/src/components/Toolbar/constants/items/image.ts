import ImageIcon from '../svg/image.svg';

import type { ToolbarItemProps } from '../interfaces';

const IMAGE_ITEMS: ToolbarItemProps[] = [
  {
    id: 'image',
    Icon: ImageIcon,
    command: (chain) => chain.focus().setImage({ src: null }).run(),
    isActive: () => false,
    shouldBeDisabled: () => false,
  },
];

export { IMAGE_ITEMS };
