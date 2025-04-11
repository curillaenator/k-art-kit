import React, { FC, useEffect } from 'react';
import { toPairs } from 'lodash';
import cn from 'classnames';

import { $hierarchyStore, setHierarchyStore } from './service/store';
import { HierarchyContextProvider } from './context';
import { Foldable } from './components/Foldable';

import type { HierarchyProps } from './interfaces';
import styles from './styles.module.scss';

export const Hierarchy: FC<HierarchyProps> = (props) => {
  const { rootId, rootItemsIds } = props;

  // rootId should not be in deps
  useEffect(() => {
    const rootPrestate = sessionStorage.getItem(rootId);
    if (!!rootPrestate) setHierarchyStore(JSON.parse(rootPrestate));

    return () => {
      sessionStorage.setItem(rootId, JSON.stringify($hierarchyStore.getState()));
      setHierarchyStore(null);
    };
  }, [rootItemsIds]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HierarchyContextProvider value={props}>
      <ul className={cn(styles.container, styles.themeVars_light)}>
        {toPairs(rootItemsIds)
          .toSorted(([_a, orderA], [_b, orderB]) => orderA - orderB) // eslint-disable-line @typescript-eslint/no-unused-vars
          .map(([code]) => (
            <Foldable key={code} code={code} path={[]} />
          ))}
      </ul>
    </HierarchyContextProvider>
  );
};
