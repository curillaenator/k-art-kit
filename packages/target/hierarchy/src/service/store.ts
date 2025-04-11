import { createEvent, createStore } from 'effector';
import { omit } from 'lodash';

import { getPathKey } from '../utils/getPathKey';
import type { HierarchyItem, HierarchyServiceItem, HierarchyState } from '../interfaces';

interface HierarchyServicePayload {
  path: string[];
  serviceItem: Partial<HierarchyServiceItem>;
  targetPath?: string[];
  dtoItem?: HierarchyItem;
}

const DEFAULT_ITEM_STATE: HierarchyServiceItem = {
  path: [],
  isDrag: false,
  isExpanded: false,
  isPending: false,
};

const registerHierarchyItem = createEvent<HierarchyItem & { path: string[] }>();
const updateHierarchy = createEvent<HierarchyServicePayload>();
const setHierarchyStore = createEvent<HierarchyState | null>();

const $hierarchyStore = createStore<HierarchyState>({});

$hierarchyStore
  .on(setHierarchyStore, (_, fullStore) => fullStore || {})
  .on(registerHierarchyItem, (prev, dtoItem) => {
    const itemPath = [...dtoItem.path, dtoItem.code];
    const pathKey = getPathKey(itemPath);

    if (!!prev[pathKey]) return prev;

    return { ...prev, [pathKey]: { ...DEFAULT_ITEM_STATE, path: itemPath } };
  })
  .on(updateHierarchy, (prev, payload) => {
    // targetPath & dtoItem should be provided only on drag end action
    const { targetPath, path, dtoItem, serviceItem } = payload;

    // hits on no drag actions
    if (!targetPath || !dtoItem) {
      const pathKey = getPathKey(path);
      return { ...prev, [pathKey]: { ...prev[pathKey], ...serviceItem } };
    }

    // on drag upgates
    const targetPathKey = getPathKey(targetPath);
    const prevPathKey = getPathKey(path);

    // Update store
    return {
      ...omit(prev, prevPathKey),
      [targetPathKey]: {
        ...prev[prevPathKey],
        ...serviceItem,
      },
    };
  });

export { $hierarchyStore, registerHierarchyItem, updateHierarchy, setHierarchyStore, DEFAULT_ITEM_STATE };
