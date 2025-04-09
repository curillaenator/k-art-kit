import { TableCellOptions } from '@tiptap/extension-table-cell';
import { mergeAttributes } from '@tiptap/core';
import { toPairs, keys } from 'lodash';

import { CoreTableCell } from '../../core/TableCell';
import type { TableCellAttributes, TableCellOnResizeFn } from '../../core/interfaces';

import { JSIcon } from './icons';

import styles from './cell.module.scss';

const TableCell = CoreTableCell.extend<TableCellOptions>({
  addAttributes() {
    return { ...this.parent?.() };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'td',
      mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, class: styles.cellContaner }),
      ['span', { class: styles.cellContent }, 0],
    ];
  },

  addNodeView() {
    return (props) => {
      const { editor, node, HTMLAttributes, extension } = props;
      const { colspan, backgroundColor } = node.attrs as TableCellAttributes;

      const td = document.createElement('td');
      td.classList.add(styles.cellContaner);

      td.style.setProperty('background-color', backgroundColor || 'transparent');

      const content = document.createElement('span');
      content.contentEditable = `${editor.isEditable}`;
      content.classList.add(styles.cellContent);
      if (colspan > 1) content.classList.add(styles.cellContent_center);

      td.append(content);

      if (editor.isEditable) {
        const toggler = document.createElement('span');
        toggler.classList.add(styles.widthHandler);
        toggler.contentEditable = 'false';

        toggler.append(new JSIcon().expandIcon);
        toggler.onmousedown = (e) => {
          e.preventDefault();
          e.stopPropagation();

          const resizersWrp = (e.target as HTMLElement)?.closest(`div[data-resizers-container]`);
          const togglerHandlerId = (resizersWrp as HTMLDivElement | null)?.dataset['resizersTableId'];
          if (!togglerHandlerId) return;

          const togglerHandler = extension.storage.rezisers[togglerHandlerId] as TableCellOnResizeFn;
          togglerHandler?.(e);
        };

        td.append(toggler);
      }

      toPairs(HTMLAttributes).forEach(([atrName, atrValue]) => td.setAttribute(atrName, atrValue));

      return { dom: td, contentDOM: content };
    };
  },
});

export { TableCell };
