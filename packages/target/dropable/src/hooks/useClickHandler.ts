// хук для внутреннего использования в темных пресетах
import { useContext, useCallback, ChangeEvent } from 'react';

import { DropableContext } from '../context';

export const useClickHandler = <T = ChangeEvent<unknown>>(onClick: (value: T) => void, closeOnClick?: boolean) => {
  const { closeOnItemClick, closeDropdown } = useContext(DropableContext);

  const clickHandler = useCallback(
    (value: T) => {
      onClick(value);

      // closeOnItemClick - общий для ДД флаг, closeOnClick - индивидуальный для каждого элемента
      if (closeOnClick || closeOnItemClick) {
        closeDropdown();
      }
    },
    [closeOnClick, closeOnItemClick, onClick, closeDropdown],
  );

  return { clickHandler };
};
