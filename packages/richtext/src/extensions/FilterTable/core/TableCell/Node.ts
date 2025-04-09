import { TableCell } from '@tiptap/extension-table-cell';
import { DEFAULT_BACKGROUND_COLOR } from './constants';

const CoreTableCell = TableCell.extend({
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
      },

      backgroundColor: {
        default: 'transparent',

        renderHTML: (attrs) => ({
          'data-bgc': attrs['backgroundColor'] || DEFAULT_BACKGROUND_COLOR,
          style: `background-color:${attrs['backgroundColor'] || DEFAULT_BACKGROUND_COLOR}`,
        }),

        parseHTML: (el) => ({ backgroundColor: el.dataset.bgc }),
      },
    };
  },

  addCommands() {
    return {
      colorFill:
        (color: string) =>
        ({ commands }) => {
          return commands.setCellAttribute('backgroundColor', color);
        },
    };
  },
});

export { CoreTableCell };
