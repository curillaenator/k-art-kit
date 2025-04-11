import type { FC, SyntheticEvent } from 'react';
import type { ChainedCommands } from '@tiptap/core';
import type { Editor as EditorReact } from '@tiptap/react';

interface ToolbarItemIconProps {
  id?: string;
  state?: 'disabled';
  onClick?: (e: SyntheticEvent<HTMLImageElement | SVGElement>) => void;
  className?: string;
  colorMode?: 'light' | 'dark' | 'color';
}

type ToolbarItemIconComponent = FC<ToolbarItemIconProps>;

interface BaseToolbarItemProps {
  id: string;
  caption?: string;
  Icon?: ToolbarItemIconComponent;
  active?: boolean;
  closeOnClick?: boolean;
  disabled?: boolean;
}

interface ToolbarItemProps extends BaseToolbarItemProps {
  onClick?: (item: BaseToolbarItemProps) => void;
  command?: (chain: ChainedCommands) => boolean;
  isActive?: (editor: EditorReact) => boolean;
  shouldBeDisabled?: (editor: EditorReact) => boolean;
}

export type { ToolbarItemProps, BaseToolbarItemProps, ToolbarItemIconProps, ToolbarItemIconComponent };
