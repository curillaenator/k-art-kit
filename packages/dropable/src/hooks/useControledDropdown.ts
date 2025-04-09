import { useState, useCallback, useRef } from 'react';
import type { Instance } from 'tippy.js';

export const useControledDropdown = (opts?: { fullControl?: boolean; openByDefault?: boolean }) => {
  const instance = useRef<Instance | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(opts?.fullControl ? !!opts?.openByDefault : false);

  const onMount = useCallback((inst: Instance) => {
    instance.current = inst;
  }, []);

  const onShow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: Instance) => {
      if (!opts?.fullControl) setIsOpen(true);
    },
    [opts],
  );

  const onHide = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: Instance) => {
      if (!opts?.fullControl) setIsOpen(false);
    },
    [opts],
  );

  const openDropdown = useCallback(() => {
    if (opts?.fullControl) {
      setIsOpen(true);
    } else {
      instance.current?.show();
    }
  }, [instance, opts]);

  const closeDropdown = useCallback(() => {
    if (opts?.fullControl) {
      setIsOpen(false);
    } else {
      instance.current?.hide();
    }
  }, [instance, opts]);

  return {
    isOpen,
    mounted: !!instance.current,
    onMount,
    onShow,
    onHide,
    closeDropdown,
    openDropdown,
  };
};
