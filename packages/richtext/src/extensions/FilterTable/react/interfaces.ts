import type { Node as ExtensionNode } from '@tiptap/core';
import type { NodeViewRendererProps } from '@tiptap/react';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

import type { FilterTableConfig, FilterTableStorage, FilterTableAtributes } from '../core/interfaces';

interface UiWidgetNode extends ProseMirrorNode {
  attrs: FilterTableAtributes;
}

interface UiWidgetProps extends NodeViewRendererProps {
  extension: ExtensionNode<FilterTableConfig, FilterTableStorage>;
  node: UiWidgetNode;
  selected: boolean;
  deleteNode: () => void;
  updateAttributes: (attrs: FilterTableAtributes) => void;
  getPos: () => number;
}

export type { UiWidgetProps };
