import { createContext, useContext } from 'react';
import { HierarchyProps } from './interfaces';

const $hierarchyContext = createContext<HierarchyProps>(
  //@ts-expect-error
  {},
);

const useHierarchyContext = () => useContext($hierarchyContext); // as HierarchyContext;

const HierarchyContextProvider = $hierarchyContext.Provider;

export { HierarchyContextProvider, useHierarchyContext };
