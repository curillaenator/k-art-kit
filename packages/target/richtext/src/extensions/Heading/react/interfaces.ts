import type { MutableRefObject } from 'react';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { Node as ExtensionNode, Editor as CoreEditor } from '@tiptap/core';

import type { HeadingOptions } from '@tiptap/extension-heading';

interface HeadingAttributes {
  id: string;
  level: number;
}

type HeadingObsRef = MutableRefObject<IntersectionObserver | null>;

interface ReactHeadingConfig extends HeadingOptions {
  headingObsRef?: HeadingObsRef;
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingReactWidgetProps {
  extension: ExtensionNode<ReactHeadingConfig>;
  node: ProseMirrorNode;
  editor: CoreEditor;
  selected: boolean;
  deleteNode: () => void;
  updateAttributes: (attrs: HeadingAttributes) => void;
  getPos: () => number;
  HTMLAttributes?: Record<string, unknown>;
}

export type { HeadingReactWidgetProps, HeadingTag, ReactHeadingConfig, HeadingObsRef, HeadingAttributes };
