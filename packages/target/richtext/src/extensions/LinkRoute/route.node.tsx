import React from 'react';
import { Node, InputRule } from '@tiptap/core';
import { ReactNodeViewRenderer, useReactNodeView, mergeAttributes, NodeViewWrapper } from '@tiptap/react';
import { Corners, BDRS } from '@k-art/shape';

//@ts-ignore
import styles from './route.module.scss';

import type { LinkRouteOptions, LinkRouteAttributes } from './interfaces';
import DocumentIcon from './document.svg';

const LINK_ROUTE_EXT_NAME = 'routeLink';
const INPUT_RE = /!to\[([^\]]+)\]\[([^\]]+)\]\s$/; // seacrhes for `[title][to] ` with \s in the end

const LinkRoute = Node.create<LinkRouteOptions>({
  name: LINK_ROUTE_EXT_NAME,

  priority: 1000,

  keepOnSplit: false,

  exitable: true,

  group: 'block',

  content: 'inline*',

  addOptions() {
    return {
      navTo: null,
    };
  },

  addAttributes() {
    return {
      to: {
        default: '/',
      },
    };
  },

  renderText({ node }) {
    return `[${node.textContent}][${node.attrs['to']}]`;
  },

  parseHTML() {
    return [{ tag: `a[data-extension="${this.name}"]` }];
  },

  renderHTML({ node }) {
    return [
      'a',
      mergeAttributes({
        href: '#',
        to: node.attrs['to'],
        'data-extension': this.name,
      }),
      0,
    ];
  },

  addInputRules() {
    const edtr = this.editor;

    return [
      new InputRule({
        find: INPUT_RE,

        handler: ({ range, match, commands }) => {
          const [, text, to] = match;

          commands.deleteRange(range);

          commands.insertContentAt(
            range.from,
            edtr.schema.nodes[LINK_ROUTE_EXT_NAME].create({ to }, edtr.schema.text(text)),
          );
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      ({ node, extension }) => {
        const { navTo } = extension.options as LinkRouteOptions;
        const { to } = node.attrs as LinkRouteAttributes;
        const { nodeViewContentRef } = useReactNodeView();

        return (
          <NodeViewWrapper
            as='a'
            ref={nodeViewContentRef}
            className={styles.route}
            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              e.preventDefault();
              e.stopPropagation();
              navTo?.(to);
            }}
          >
            <Corners borderRadius={BDRS[16]} />
            <DocumentIcon />
          </NodeViewWrapper>
        );
      },
      { contentDOMElementTag: 'span' },
    );
  },
});

export { LinkRoute, type LinkRouteAttributes };
