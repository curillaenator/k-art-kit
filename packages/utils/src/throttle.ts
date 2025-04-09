const DEFAULT_DELAY = 150;

type ThrottledType = <T>(cb: (...args: T[]) => void, wait?: number) => (...args: T[]) => void;

export const throttled: ThrottledType = (cb, wait = DEFAULT_DELAY) => {
  let prev = 0;

  return (...args) => {
    const now = new Date().getTime();

    if (now - prev > wait) {
      prev = now;
      cb(...args);
    }
  };
};
