import { mergeAttributes } from '@tiptap/core';
import toPairs from 'lodash/toPairs.js';

import { BlocksGridColumn as BlocksGridColumnCore, COLUMN_NODE_NAME, getBlocksGridNodeByPos } from '../core';

import { ColumnToolbar } from './Toolbar';
import columnStyles from './column.module.scss';

const BlocksGridColumn = BlocksGridColumnCore.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { ...HTMLAttributes, 'data-extension': COLUMN_NODE_NAME, class: columnStyles.column },
      [
        'div',
        {
          class: columnStyles.content,
        },
        0,
      ],
    ];
  },

  addNodeView() {
    return ({ editor, getPos, node, HTMLAttributes }) => {
      const getPosition = typeof getPos === 'function' ? getPos : () => 1;

      const { node: blocksGridNode, pos: blocksGridPos } = getBlocksGridNodeByPos(editor.state, getPosition());
      const $nodePos = editor.state.doc.resolve(getPosition());
      const columnIdx = $nodePos.index($nodePos.depth);

      const dom = document.createElement('div');

      dom.contentEditable = editor.isEditable ? 'true' : 'false';
      dom.classList.add(columnStyles.column);
      dom.style.setProperty(
        '--blocksgrid-column-bdc',
        `var(--blocksgrid-${node.attrs['blocksGridId']}-${columnIdx}-bdc, var(--theme-backgrounds-light))`,
      );

      const contentDOM = document.createElement('div');
      contentDOM.classList.add(columnStyles.content);

      const attrs = mergeAttributes(HTMLAttributes, {
        'data-type': this.name,
      });

      toPairs(attrs).forEach(([attrKey, attrVal]) => dom.setAttribute(attrKey, attrVal));

      dom.append(contentDOM);

      if (editor.isEditable && blocksGridNode && blocksGridPos && typeof getPos === 'function') {
        dom.append(
          new ColumnToolbar({
            editor,
            node,
            getPos,
            columnIdx,
            blocksGridNode,

            submitButtonRef: this.options.submitButtonRef,
            editorContentRef: this.options.editorContentRef,
          }).element,
        );
      }

      return {
        dom,
        contentDOM,
      };
    };
  },
});

export { BlocksGridColumn };
