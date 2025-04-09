import { TableHeader, TableHeaderOptions } from '@tiptap/extension-table-header';
import { mergeAttributes } from '@tiptap/core';

const CoreTableHeader = TableHeader.extend<TableHeaderOptions>({
  addStorage() {
    return {
      ...this.parent?.(),
      rezisers: {},
    };
  },

  addAttributes() {
    return {
      colspan: {
        default: 1,
      },

      rowspan: {
        default: 1,
      },

      colwidth: {
        default: null,

        parseHTML: (element) => {
          const colwidth = element.getAttribute('colwidth');
          const value = colwidth ? colwidth.split(',').map((width) => parseInt(width, 10)) : null;

          return value;
        },
      },

      backgroundColor: {
        default: 'var(--theme-backgrounds-light)',

        renderHTML: (attrs) => ({
          'data-bgc': attrs['backgroundColor'] || 'var(--editor-highlight-bgc)',
          style: `background-color:${attrs['backgroundColor'] || 'var(--editor-highlight-bgc)'}`,
        }),

        parseHTML: (el) => ({ backgroundColor: el.dataset.bgc }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'th' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['th', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), ['span', 0]];
  },

  renderText({ node }) {
    return `${node.textContent}`;
  },
});

export { CoreTableHeader };
