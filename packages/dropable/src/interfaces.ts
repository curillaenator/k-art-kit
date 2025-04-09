import type { ReactNode, CSSProperties } from "react";
import type { Instance, Placement } from "tippy.js";
import type { TippyProps } from "@tippyjs/react";
import type { CornerProps } from "@k-art/shape";
import { config } from "react-spring";

type Config = keyof typeof config;

export interface AnimationProps {
  type?: Config;
  showed?: CSSProperties;
  hidden?: CSSProperties;
}

export interface _BaseMenuProps {
  attrs: {
    "data-placement": Placement;
    "data-reference-hidden"?: string;
    "data-escaped"?: string;
  };
  instance: Instance;
  maxWidth: string | number;
  minWidth: string | number;
  maxHeight: string | number;
  closeOnItemClick?: boolean;
  animationStyle?: CSSProperties;
  closeDropdown?: () => void;

  corners?: CornerProps;
  headless?: boolean;

  children: ReactNode;
}

type _OmitedBaseMenuProps = Partial<
  Omit<_BaseMenuProps, "attrs" | "instance" | "getDropdownScrollHeight">
>;
type _OmitedTippyProps = Omit<
  TippyProps,
  "arrow" | "appendTo" | "content" | "trigger" | "children" | "visible"
>;

export interface DropableProps extends _OmitedBaseMenuProps, _OmitedTippyProps {
  children: ReactNode;
  openNode: ReactNode;
  appendToId?: string;
  trigger?:
    | "mouseenter focus"
    | "click"
    | "focusin"
    | "mouseenter click"
    | "manual";
}
