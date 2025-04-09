import React, { FC, ReactElement, JSXElementConstructor } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Instance } from 'tippy.js';

import { useBaseDropdownProps } from './hooks/useBaseDropdownProps';
import { DropableMenu } from './DropableMenu';
import { PLUGINS } from './constants';
import { DropableProps } from './interfaces';

export const Dropable: FC<DropableProps> = (props) => {
  const {
    openNode,
    children,
    maxWidth = 256,
    minWidth = 216,
    maxHeight = 320,
    animationStyle,
    closeOnItemClick,
    closeDropdown,

    corners,
    headless,

    // Reason: guard tippy props from getting into DOM
    // @ts-expect-error
    mounted, // eslint-disable-line @typescript-eslint/no-unused-vars
    // @ts-expect-error
    openDropdown, // eslint-disable-line @typescript-eslint/no-unused-vars

    ...rest
  } = useBaseDropdownProps(props);

  return (
    <Tippy
      {...rest}
      maxWidth='none'
      arrow={false}
      plugins={PLUGINS}
      render={(attrs, _content, instance) => (
        <DropableMenu
          attrs={attrs}
          corners={corners}
          headless={headless}
          instance={instance as Instance}
          closeDropdown={closeDropdown}
          maxWidth={maxWidth}
          minWidth={minWidth}
          maxHeight={maxHeight}
          animationStyle={animationStyle}
          closeOnItemClick={closeOnItemClick}
        >
          {children}
        </DropableMenu>
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {openNode as ReactElement<any, string | JSXElementConstructor<any>>}
    </Tippy>
  );
};
