import type { FC } from 'react';

type HierarchyState = Record<string, HierarchyServiceItem>;

type HierarchyTree = Record<string, number>; // <unitCode, order>

interface HierarchyItem {
  code: string;
  name: string;
  spaceCode?: string;

  path: string[];

  createdAt: number;
  createdBy: string;

  updatedAt?: number;
  updatedBy?: string;

  hierarchy?: HierarchyTree;
}

interface HierarchyServiceItem {
  path: string[];
  isDrag: boolean;
  isExpanded: boolean;
  isPending: boolean;
}

type AsyncItemLoadStatus = 'success' | 'error';
type FoldableStateItem = 'isActionsOpened' | 'isHovered' | 'isPending' | 'isActive' | 'isMouseOver';

interface FoldableItemAction {
  key: FoldableStateItem;
  payload: boolean;
}

interface HierarchyProps {
  // isDraggable?: boolean;
  // actions?: HierarchyItemAction[];

  rootId: string;
  rootItemsIds: HierarchyTree;

  queryKey: string;
  getItemQuery: (code: string) => Promise<HierarchyItem | null>;

  ItemLoader?: FC;

  linkPattern: (item: HierarchyItem) => string;
  matchRoutePattern?: (item: HierarchyItem) => string;
  onHeightChanged?: (height: number) => void;
}

export type {
  HierarchyState,
  HierarchyProps,
  HierarchyItem,
  HierarchyTree,
  HierarchyServiceItem,
  //
  FoldableItemAction,
  FoldableStateItem,
  AsyncItemLoadStatus,
};
