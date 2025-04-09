import { Node } from '@tiptap/core';
import { v4 as uuidv4 } from 'uuid';

import type { BlocksGridOptions } from './interfaces';
import { getBlocksGridNodeByPos } from './utils';
import { EXTENSION_NAME, COLUMN_NODE_NAME } from './constants';

const BlocksGrid = Node.create<BlocksGridOptions>({
  name: EXTENSION_NAME,

  group: 'block',

  content: 'column+',

  draggable: true,

  addOptions() {
    return {};
  },

  addAttributes() {
    return {
      blocksCount: {
        default: 0,
      },

      fatBlockIdx: {
        default: null,
      },

      timestamp: {
        default: null,
      },

      blocksGridId: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: `section[data-extension="${EXTENSION_NAME}"]` }];
  },

  addCommands() {
    return {
      deleteBlocksGrid:
        (clearBlocksgridCssv) =>
        ({ state, chain }) => {
          const blocksGridNode = getBlocksGridNodeByPos(state, state.selection.$from.pos);

          if (!blocksGridNode.node || !blocksGridNode.pos) return false;

          chain()
            .deleteRange({
              from: blocksGridNode.pos,
              to: blocksGridNode.pos + blocksGridNode.node.nodeSize,
            })
            .focus(blocksGridNode.pos);

          clearBlocksgridCssv();

          return true;
        },

      insertBlocksGrid:
        (cols, fatBlockIdx) =>
        ({ state, commands }) => {
          const blocksGridNode = getBlocksGridNodeByPos(state, state.selection.$from.pos);

          if (!!blocksGridNode.node) return false;

          const blocksGridId = uuidv4();

          commands.insertContent([
            { type: 'paragraph' },
            {
              type: EXTENSION_NAME,
              content: [...new Array(cols)].map(() => ({
                type: COLUMN_NODE_NAME,
                content: [{ type: 'paragraph' }, { type: 'paragraph' }],
                attrs: { blocksGridId },
              })),
              attrs: {
                blocksGridId,
                blocksCount: cols,
                fatBlockIdx: fatBlockIdx !== undefined ? fatBlockIdx : null,
              },
            },
            { type: 'paragraph' },
          ]);

          return commands.focus();
        },
    };
  },
});

export { BlocksGrid };
