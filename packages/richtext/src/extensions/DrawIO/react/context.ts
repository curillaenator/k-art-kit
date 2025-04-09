import { createContext, useContext } from 'react';

import type { UiWidgetProps } from './interfaces';

interface DrawioContextType extends UiWidgetProps {
  toggleDrawIo: () => void;
}

const $drawioContext = createContext<DrawioContextType>(
  //@ts-expect-error
  {},
);

const useDrawioContext = () => useContext($drawioContext);

export { $drawioContext, useDrawioContext };
