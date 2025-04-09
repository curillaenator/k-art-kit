import { ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes, type NodeViewProps } from '@tiptap/core';

import { TocNodeWidget } from './NodeWidget';

import { TOC_EXTENSION_NAME, SCROLL_DEFAULT_DURATION, SCROLL_DEFAULT_OFFSET, DEFAULT_RANGE } from './constants';
import { getHtmlRenderMessage } from './utils';

import type { TocNodeConfig } from './interfaces';

import htmlStyles from './html.module.scss';

const TocNode = Node.create<TocNodeConfig>({
  name: TOC_EXTENSION_NAME,
  group: 'block',
  draggable: true,

  addOptions() {
    return { scrollDuration: SCROLL_DEFAULT_DURATION, scrollOffset: SCROLL_DEFAULT_OFFSET };
  },

  addAttributes() {
    return {
      title: { default: this.options['title'] || 'Table of content' },
      minLevel: { default: 1 },
      maxLevel: { default: 6 },
      // аттрибут, изменения которого триггерит ререндер узла ProseMirror
      timestamp: { default: Date.now(), rendered: false },
    };
  },

  renderText({ node }) {
    return `${node.attrs['title'] || 'Table of content'}`;
  },

  parseHTML() {
    return [{ tag: `nav[data-extension="${this.name}"]` }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const tocTitle = node.attrs['title'] || this.options.title;

    return [
      'nav',
      mergeAttributes(HTMLAttributes, { class: htmlStyles.toctainer, 'data-extension': this.name }),
      ['span', { class: htmlStyles.toctitle }, tocTitle],
      ['span', { class: htmlStyles.tocmessage }, getHtmlRenderMessage(tocTitle)],
    ];
  },

  addCommands() {
    return {
      insertToc:
        (range) =>
        ({ commands }) => {
          const { minLevel, maxLevel } = range || DEFAULT_RANGE;

          return commands.insertContent([
            { type: 'paragraph' },
            {
              type: this.name,
              attrs: { title: 'Table of content', minLevel, maxLevel, timestamp: Date.now() },
            },
            { type: 'paragraph' },
          ]);
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(TocNodeWidget as unknown as React.ComponentType<NodeViewProps>);
  },
});

export { TocNode };
