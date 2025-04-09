import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react';

import { UIWidget } from './Widget';

import type { DrawIoConfig, DrawIoStorage, DrawIoAttributes } from './interfaces';

import { DRAWIO_EXTENSION_NAME } from './constants';
import styles from './node.module.scss';

const NULL_ATTRS: DrawIoAttributes = {
  xmlpng: null,
};

const DrawIO = Node.create<DrawIoConfig, DrawIoStorage>({
  name: DRAWIO_EXTENSION_NAME,
  group: 'block',
  draggable: true,
  atom: true,

  addOptions() {
    return {
      drawIoLink: null,
    };
  },

  addAttributes() {
    return {
      xmlpng: {
        default: null,
      },
    };
  },

  addCommands() {
    return {
      insertDrawIo:
        (fileAttrs: DrawIoAttributes = NULL_ATTRS) =>
        ({ commands }) =>
          commands.insertContent([
            { type: 'paragraph' },
            {
              type: this.name,
              attrs: fileAttrs,
            },
            { type: 'paragraph' },
          ]),
    };
  },

  parseHTML() {
    return [{ tag: `div[data-extension="${this.name}"]` }];
  },

  renderText() {
    return 'DrawIO image';
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: styles.htmlNode, 'data-extension': `"${this.name}"` }),
      ['img', { class: styles.htmlImage, src: node.attrs['xmlpng'] }],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(UIWidget as unknown as React.ComponentType<NodeViewProps>);
  },
});

export { DrawIO };
