import React, { useRef, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useDisabledScroll, usePreventEvent } from "@k-art/utils";
import type { DrawerProps } from "./interfaces";

import { getAnimationCns } from "./utils";
import { DrawerOverlay } from "./drawer.styled";

const Overlay = (props: DrawerProps) => {
  const { onClose } = props;
  const overlayRef = useRef<HTMLDivElement>(null);

  useDisabledScroll(document, window);
  usePreventEvent([overlayRef], "touchmove");

  return (
    <Transition.Child as={Fragment} {...getAnimationCns("overlay")}>
      <DrawerOverlay ref={overlayRef} onClick={onClose} />
    </Transition.Child>
  );
};

export { Overlay as DrawerOverlay };
