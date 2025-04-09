import { TippyProps } from '@tippyjs/react';

import { DropableProps } from '../interfaces';

export const useBaseDropdownProps = (props: DropableProps) => {
  const {
    trigger = 'click',

    appendToId,

    minWidth,
    maxWidth,
    maxHeight,

    placement = 'bottom-end',
    interactive = true,
    disabled = false,

    ...rest
  } = props;

  return {
    ...rest,
    placement,
    trigger,
    interactive,
    appendTo: (appendToId ? document.getElementById(appendToId) || 'parent' : 'parent') as TippyProps['appendTo'],
    minWidth,
    maxWidth,
    maxHeight,
    disabled,
  };
};
