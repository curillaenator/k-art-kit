import React from "react";
import { CharIcon } from "../svg/CharIcon";

// import {
//   RedIcon,
//   LightGreyIcon,
//   BlueIcon,
//   LightBlueIcon,
//   GreenIcon,
//   DarkOrangeIcon,
//   LightOrangeIcon,
//   PurpleIcon,
// } from '../svg/CharHighlightIcon';

import ResetIcon from "../svg/reset.svg";

import type { ToolbarItemProps } from "../interfaces";

import { colorsLib } from "@k-art/theme";

const WYSIWYG_COLORS = {
  DANGER: colorsLib.danger[300],
  SECONDARY: "var(--theme-neutral-300)",
  POSITIVE: colorsLib.nika[600],
  WARN: colorsLib.orange[300],
  ACCENT: "var(--theme-primary-300)",
  WHITE: "#FFFFFF",
  DEFAULT: "inherit",
} as const;

// TODO: Create special Icon component for Color, cuz storing Icon component for subjected to change colors is a violation of SSOT and DRY principles.
const COLOR_ITEMS: ToolbarItemProps[] = [
  {
    id: "defaultColor",
    Icon: () => <CharIcon color="var(--theme-texts-base)" />,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.DEFAULT).run(),
    isActive: (editor) =>
      editor.isActive("textStyle", { color: WYSIWYG_COLORS.DEFAULT }),
  },

  {
    id: "redColor",
    Icon: () => <CharIcon color={WYSIWYG_COLORS.DANGER} />,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.DANGER).run(),
    isActive: (editor) =>
      editor.isActive("textStyle", { color: WYSIWYG_COLORS.DANGER }),
  },
  {
    id: "lightGreyColor",
    Icon: () => <CharIcon color={WYSIWYG_COLORS.SECONDARY} />,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.SECONDARY).run(),
    isActive: (editor) =>
      editor.isActive("textStyle", { color: WYSIWYG_COLORS.SECONDARY }),
  },
  {
    id: "greenColor",
    Icon: () => <CharIcon color={WYSIWYG_COLORS.POSITIVE} />,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.POSITIVE).run(),
    isActive: (editor) =>
      editor.isActive("textStyle", { color: WYSIWYG_COLORS.POSITIVE }),
  },
  {
    id: "darkOrangeColor",
    Icon: () => <CharIcon color={WYSIWYG_COLORS.WARN} />,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.WARN).run(),
    isActive: (editor) =>
      editor.isActive("textStyle", { color: WYSIWYG_COLORS.WARN }),
  },
  {
    id: "purpleColor",
    Icon: () => <CharIcon color={WYSIWYG_COLORS.ACCENT} />,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.ACCENT).run(),
    isActive: (editor) =>
      editor.isActive("textStyle", { color: WYSIWYG_COLORS.ACCENT }),
  },
];

const BACKGROUND_COLOR_ITEMS: ToolbarItemProps[] = [
  // {
  //   id: 'blackColorBackground',
  //   Icon: BlackIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.BLACK }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.BLACK }),
  // },
  // {
  //   id: 'redColorBackground',
  //   Icon: RedIcon,
  //   command: (chain) => chain.focus().setHighlight({ color: WYSIWYG_COLORS.RED }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.RED }),
  // },
  // {
  //   id: 'lightGreyColorBackground',
  //   Icon: LightGreyIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.LIGHT_GREY }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.LIGHT_GREY }),
  // },
  // {
  //   id: 'blueColorBackground',
  //   Icon: BlueIcon,
  //   command: (chain) => chain.focus().setHighlight({ color: WYSIWYG_COLORS.BLUE }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.BLUE }),
  // },
  // {
  //   id: 'lightBlueColorBackground',
  //   Icon: LightBlueIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.LIGHT_BLUE }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.LIGHT_BLUE }),
  // },
  // {
  //   id: 'greenColorBackground',
  //   Icon: GreenIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.GREEN }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.GREEN }),
  // },
  // {
  //   id: 'darkOrangeColorBackground',
  //   Icon: DarkOrangeIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.DARK_ORANGE }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.DARK_ORANGE }),
  // },
  // {
  //   id: 'lightOrangeColorBackground',
  //   Icon: LightOrangeIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.LIGHT_ORANGE }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.LIGHT_ORANGE }),
  // },
  // {
  //   id: 'purpleColorBackground',
  //   Icon: PurpleIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.PURPLE }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.PURPLE }),
  // },
];

const TEXT_COLOR_CLEAR: ToolbarItemProps = {
  id: "textColorClear",
  Icon: ResetIcon,
  command: (chain) => chain.focus().unsetColor().run(),
};

// const TEXT_HIGHLIGHT_CLEAR: ToolbarItemProps = {
//   id: 'textHighlightClear',
//   Icon: BlackCharIcon,
//   command: (chain) => chain.focus().unsetHighlight().unsetColor().run(),
// };

// ?? It's almost identical to textHighlightColor, but uses different caption
// const TEXT_COLOR_AND_HIGHLIGHT_CLEAR: ToolbarItemProps = {
//   ...TEXT_HIGHLIGHT_CLEAR,
//   id: 'textColorAndHighlightClear',
// };

export { COLOR_ITEMS, BACKGROUND_COLOR_ITEMS, TEXT_COLOR_CLEAR };
