import type { DropableProps } from "@k-art/dropable";

type OmitedBaseDropableProps = Omit<
  DropableProps,
  | "openNode"
  | "openNodeClassName"
  | "visible"
  | "trigger"
  | "placement"
  | "scrollClassName"
  | "children"
>;

type Placements = Extract<
  DropableProps["placement"],
  "bottom-start" | "bottom-end"
>;

interface EmojiSelectorBaseProps {
  id?: string;
  placement?: Placements;
  editorContentRef: React.MutableRefObject<HTMLDivElement | null>;
  onSelectionUpdateHandlers: React.MutableRefObject<(() => void)[]>;
}

interface EmojiSelectorProps
  extends EmojiSelectorBaseProps,
    OmitedBaseDropableProps {}

export type { EmojiSelectorProps };
