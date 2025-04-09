import type { Editor } from '@tiptap/core';
import type { Selection } from 'prosemirror-state';
import { findParentNode } from '@tiptap/core';

import DrawIoIcon from '../svg/bar-chart.svg';

import type { ToolbarItemProps } from '../interfaces';

const NODES_WITH_FORBIDDEN_DRAWIO = ['table'];

export const selectionHasParent = (editor: Editor, parentNodeName: string | string[], customSelection?: Selection) => {
  const selection = customSelection ?? editor.state.selection;

  const checkNodeName = (nodeName: string) =>
    Array.isArray(parentNodeName) ? parentNodeName.includes(nodeName) : parentNodeName === nodeName;

  return !!findParentNode((node) => checkNodeName(node.type.name))(selection);
};

const DRAW_IO_ITEMS: ToolbarItemProps[] = [
  {
    id: 'insertDrawIo',
    Icon: DrawIoIcon,
    command: (chain) => chain.focus().insertDrawIo(null).run(),
    isActive: () => false,
    shouldBeDisabled: (editor) => selectionHasParent(editor, NODES_WITH_FORBIDDEN_DRAWIO),
  },
];

export { DRAW_IO_ITEMS };
