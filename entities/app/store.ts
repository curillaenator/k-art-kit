import { createEvent, createStore } from 'effector';
import type { AppStore } from './interfaces';

const toggleAside = createEvent<boolean | undefined>();
const toggleMode = createEvent<boolean | undefined>();

const $appStore = createStore<AppStore>({
  isAsideOpen: true,
  darkmode: undefined,
});

$appStore
  .on(toggleAside, (prev, isOpen) => ({
    ...prev,
    isAsideOpen: isOpen !== undefined ? isOpen : !prev.isAsideOpen,
  }))
  .on(toggleMode, (prev, darkmode) => ({
    ...prev,
    darkmode: darkmode !== undefined ? darkmode : !prev.darkmode,
  }));

export { $appStore, toggleAside, toggleMode };
