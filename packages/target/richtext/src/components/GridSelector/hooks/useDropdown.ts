import {
  useControledDropdown,
  useAnimation,
  useCombineControledAnimated,
} from "@k-art/dropable";

import type { GridSelectorProps } from "../interfaces";

export const useDropdown = (props: GridSelectorProps) => {
  const controled = useControledDropdown();
  const animated = useAnimation();

  const { isOpen, closeDropdown, ...combinedControled } =
    useCombineControledAnimated({
      controled,
      animated,
      rest: props,
    });

  return {
    ...props,
    ...combinedControled,

    isOpen,
    closeDropdown,
  };
};
