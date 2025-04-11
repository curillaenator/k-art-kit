import React, { FC, PropsWithChildren, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';
import { usePortal } from '@k-art/utils';

import { useCloseOnEscape } from './hooks/useCloseOnEscape';
import { getAnimationCns } from './utils';

import type { DrawerProps } from './interfaces';

import { DrawerOverlay } from './Overlay';
import { DrawerContainer, DrawerContent } from './drawer.styled';

const Drawer: FC<PropsWithChildren<DrawerProps>> = (props) => {
  const { open, portalId, contentClassName, children } = props;

  useCloseOnEscape(props);

  const portal = usePortal(portalId);

  return ReactDOM.createPortal(
    <DrawerContainer appear show={open} unmount>
      <DrawerOverlay {...props} />

      {/* @ts-expect-error */}
      <Transition.Child as={Fragment} {...getAnimationCns('content')}>
        <DrawerContent className={contentClassName}>{children}</DrawerContent>
      </Transition.Child>
    </DrawerContainer>,
    portal,
  );
};

export { Drawer };
