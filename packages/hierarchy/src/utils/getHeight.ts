import { QueryClient } from '@tanstack/react-query';
import { keys } from 'lodash';

import { $hierarchyStore } from '../service/store';
import { getPathKey } from './getPathKey';

import { ITEM_HEIGHT } from '../constants';
import type { HierarchyItem } from '../interfaces';

interface GetItemsOptions {
  code: string;
  path: string[];
  qc: QueryClient;
  ITEMS_QUERY_KEY: string;
}

const getHeight = (opts: GetItemsOptions): number => {
  const { code, path, ITEMS_QUERY_KEY, qc } = opts;

  const itemStorePath = [...path, code];
  const itemStorePathKey = getPathKey(itemStorePath);
  const itemState = $hierarchyStore.getState()[itemStorePathKey];
  const itemData = qc.getQueryData([ITEMS_QUERY_KEY, code]) as HierarchyItem;

  let result = 0;

  if (!!keys(itemData?.hierarchy).length && itemState?.isExpanded) {
    result += ITEM_HEIGHT * keys(itemData.hierarchy).length;

    result += keys(itemData.hierarchy)
      .map((hCode) => getHeight({ qc, ITEMS_QUERY_KEY, code: hCode, path: itemStorePath }))
      .reduce((a, b) => a + b, 0);
  }

  return result;
};

export { getHeight };
