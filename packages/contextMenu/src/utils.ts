export const compose = (funcs: (() => void)[]) => {
  funcs.forEach((func) => func());
};
