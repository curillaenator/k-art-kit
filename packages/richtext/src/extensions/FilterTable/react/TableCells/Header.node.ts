import { TableHeaderOptions } from '@tiptap/extension-table-header';
import { mergeAttributes } from '@tiptap/core';
import { toPairs, keys } from 'lodash';

import { CoreTableHeader } from '../../core/TableHeader';
import type { TableCellAttributes, TableCellOnResizeFn } from '../../core/interfaces';

import { JSIcon } from './icons';

import styles from './cell.module.scss';

const TableHeader = CoreTableHeader.extend<TableHeaderOptions>({
  addAttributes() {
    return { ...this.parent?.() };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'th',
      mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, class: styles.cellContainer }),
      ['span', { class: styles.cellContent }, 0],
    ];
  },

  addNodeView() {
    return (props) => {
      const { editor, node, HTMLAttributes, extension } = props;
      const { colspan, backgroundColor } = node.attrs as TableCellAttributes;

      const th = document.createElement('th');
      th.classList.add(styles.thContaner);

      th.style.setProperty('background-color', backgroundColor || 'var(--editor-highlight-bgc)');

      const content = document.createElement('span');
      content.contentEditable = `${editor.isEditable}`;
      content.classList.add(styles.thContent);
      if (colspan > 1) content.classList.add(styles.thContent_center);

      th.append(content);

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

        th.append(toggler);
      }

      toPairs(HTMLAttributes).forEach(([atrName, atrValue]) => th.setAttribute(atrName, atrValue));

      return { dom: th, contentDOM: content };
    };
  },
});

export { TableHeader };
