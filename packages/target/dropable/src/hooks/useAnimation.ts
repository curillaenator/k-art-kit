import { useCallback } from 'react';
import { useSpring, config } from 'react-spring';
import type { Instance } from 'tippy.js';

import { AnimationProps } from '../interfaces';

const DEFAULT_OPTIONS: Required<AnimationProps> = {
  hidden: { opacity: 0, transform: 'scale(0.98) translateY(-8px)' },
  showed: { opacity: 1, transform: 'scale(1) translateY(0)' },
  type: 'default',
};

export const useAnimation = (opts?: AnimationProps) => {
  const { hidden, showed, type } = { ...DEFAULT_OPTIONS, ...opts };

  const [animationStyle, api] = useSpring(() => hidden);

  const onShow = useCallback(
    // eslint-disable-next-line
    (_: Instance) => {
      api.start({
        ...showed,
        config: { ...config[type], tension: 250, friction: 26, duration: 100 },
      });
    },
    [showed, type, api],
  );

  const onHide = useCallback(
    // eslint-disable-next-line
    (_: Instance) => {
      api.start({
        ...hidden,
        config: { ...config[type], tension: 250, friction: 26, duration: 10 },
      });
    },
    [hidden, type, api],
  );

  return {
    onShow,
    onHide,
    animationStyle,
  };
};
