import React, { useRef, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useDisabledScroll, usePreventEvent } from '@k-art/utils';

import { getAnimationCns } from './utils';
import { ModalOverlay } from './modal.styled';

import type { ModalProps } from './interfaces';

const Overlay = (props: ModalProps) => {
  const { onClose } = props;
  const overlayRef = useRef<HTMLDivElement>(null);

  useDisabledScroll(document, window);
  usePreventEvent([overlayRef], 'touchmove');

  return (
    //@ts-expect-error
    <Transition.Child as={Fragment} {...getAnimationCns('overlay')}>
      <ModalOverlay ref={overlayRef} onClick={onClose} />
    </Transition.Child>
  );
};

export { Overlay as ModalOverlay };
