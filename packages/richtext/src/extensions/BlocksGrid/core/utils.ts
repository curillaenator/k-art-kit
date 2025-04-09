import { Node as PmNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

import { EXTENSION_NAME } from './constants';

const getBlocksGridNodeByPos = (state: EditorState, pos: number) => {
  const $pos = state.doc.resolve(pos);

  let depth = $pos.depth;
  let blocksGridNode: PmNode | null = null;
  let blocksGridPos: number | null = null;

  while (depth > 0) {
    const node = $pos.node(depth);

    if (node.type.name === EXTENSION_NAME) {
      blocksGridNode = node;
      blocksGridPos = $pos.before(depth);
      break;
    }

    depth--;
  }

  return { node: blocksGridNode, pos: blocksGridPos };
};

export { getBlocksGridNodeByPos };
