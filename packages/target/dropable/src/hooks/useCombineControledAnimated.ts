import { useCallback } from 'react';
import type { Instance } from 'tippy.js';

import { useControledDropdown } from './useControledDropdown';
import { useAnimation } from './useAnimation';

type Controled = ReturnType<typeof useControledDropdown>;
type Animated = ReturnType<typeof useAnimation>;

type RestMandatoryType = {
  onShow?: (instance: Instance) => void;
  onHide?: (instance: Instance) => void;
};

interface Options {
  controled: Partial<Controled>;
  animated: Partial<Animated>;
  rest: RestMandatoryType;
}

export const useCombineControledAnimated = ({ controled, animated, rest }: Options) => {
  const { onShow: onShowC = () => {}, onHide: onHideC = () => {}, ...controledRest } = controled;
  const { onShow: onShowA = () => {}, onHide: onHideA = () => {}, ...animatedRest } = animated;
  const { onShow: onShowR = () => {}, onHide: onHideR = () => {} } = rest;

  const onHide = useCallback(
    (instance: Instance) => {
      onHideC(instance);
      onHideA(instance);
      onHideR(instance);
    },
    [onHideA, onHideC, onHideR],
  );

  const onShow = useCallback(
    (instance: Instance) => {
      onShowC(instance);
      onShowA(instance);
      onShowR(instance);
    },
    [onShowA, onShowC, onShowR],
  );

  return {
    ...controledRest,
    ...animatedRest,
    onHide,
    onShow,
  };
};
