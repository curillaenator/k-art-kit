const TARGET_CNS = ['enter', 'enterFrom', 'enterTo', 'leave', 'leaveFrom', 'leaveTo'];
const getAnimationCns = (prefix: string) => Object.fromEntries(TARGET_CNS.map((cn) => [cn, `${prefix}-${cn}`]));

export { getAnimationCns };
