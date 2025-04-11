// import type { IconComponent } from '@sbt_swtr/kit-tracker.icon';

import { HierarchyItem } from '../../interfaces';

export interface ActionsProps {
  item: HierarchyItem;
  setActionsOpened: (payload: boolean) => void;
  setHovered: (payload: boolean) => void;
}

export interface HierarchyItemAction {
  id: string;
  caption?: string;
  // Icon?: IconComponent;
  onClick?: (item: HierarchyItem) => Promise<void>;
  linkPattern?: (item: HierarchyItem) => string;
}
