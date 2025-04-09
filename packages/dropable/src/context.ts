import { createContext } from 'react';

interface InitDropdownContext {
  closeOnItemClick: boolean;
  closeDropdown: () => void;
}

/*
 * контекст существует для того, чтобы каждый элемент меню через хук useClickHandler
 * мог иметь доступ к глобальному свойству закрытия элементов по нажатию и самой функции закрытия элемента
 */
export const DropableContext = createContext<InitDropdownContext>({
  closeOnItemClick: false,
  closeDropdown: () => {},
});
