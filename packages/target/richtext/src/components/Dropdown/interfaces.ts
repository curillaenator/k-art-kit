import type { DropableProps } from "@k-art/dropable";
import type { ToolbarItemProps, ToolbarItemIconComponent } from "../Toolbar";

interface DropdownItemProps extends ToolbarItemProps {}

type OmitedBaseDropableProps = Omit<
  DropableProps,
  "openNode" | "trigger" | "placement" | "children"
>;
type Placements = Extract<
  DropableProps["placement"],
  "bottom-start" | "bottom-end"
>;

interface DropdownBaseProps {
  id?: string;
  value: string | null;
  selectedItems?: Record<string, boolean>;
  onChange: (itemId: string) => void;
  placement?: Placements;
  items?: ToolbarItemProps[][];
  icon?: DropdownIconComponent;
}

interface DropdownProps extends DropdownBaseProps, OmitedBaseDropableProps {}

type DropdownIconComponent = ToolbarItemIconComponent;

export type { DropdownProps, DropdownItemProps, DropdownIconComponent };
