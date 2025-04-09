import { Table } from '@tiptap/extension-table';
import { mergeAttributes } from '@tiptap/core';
import type { FilterTableStorage, FilterTableConfig } from './interfaces';

const CoreTable = Table.extend<FilterTableConfig, FilterTableStorage>({
  addOptions() {
    return this.parent?.();
  },

  addAttributes() {
    return {
      columnWidths: {
        default: [],
      },

      filters: {
        default: [],
        rendered: false,
      },

      sort: {
        default: null,
        rendered: false,
      },

      summaryRow: {
        default: {},
        rendered: false,
      },

      calcColumn: {
        default: null,
        rendered: false,
      },

      style: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: `section[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'section',
      mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, 'data-type': this.name }),
      ['table', ['tbody', 0]],
    ];
  },

  renderText({ node }) {
    return `${node.textContent}`;
  },
});

export { CoreTable };
