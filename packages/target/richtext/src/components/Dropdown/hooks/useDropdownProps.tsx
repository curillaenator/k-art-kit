import { useAnimation } from '@k-art/dropable';

import { resolveOpenNodeIcon } from './utils';
import type { DropdownProps, DropdownItemProps } from '../interfaces';

export const useDropdownProps = (props: DropdownProps) => {
  const {
    items = [] as DropdownItemProps[][],
    value,
    selectedItems,

    icon, // eslint-disable-line  @typescript-eslint/no-unused-vars

    ...rest
  } = props;

  // const controled = useControledDropdown();
  const animated = useAnimation();

  // const {
  //   isOpen,
  //   //
  //   openDropdown, // eslint-disable-line  @typescript-eslint/no-unused-vars
  //   mounted, // eslint-disable-line  @typescript-eslint/no-unused-vars

  //   ...combinedControled
  // } = useCombineControledAnimated({
  //   controled,
  //   animated,
  //   rest,
  // });

  const selectedItem = value !== null ? items.flat().filter((item) => item.id === value)?.[0] || null : null;

  return {
    ...rest,
    ...animated,
    isActive: false,

    items,
    selectedItem,
    selectedItems,

    openNodeIcon: resolveOpenNodeIcon(props, selectedItem),
  };
};
