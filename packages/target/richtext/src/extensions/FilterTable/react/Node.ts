import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import { ReactNodeViewWidget } from './Widget';
import { CoreTable } from '../core';
import htmlStyles from './html.module.scss';

const FilterTable = CoreTable.extend({
  addOptions() {
    return this.parent?.();
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'section',
      mergeAttributes(this.options.HTMLAttributes, {
        ...HTMLAttributes,
        class: htmlStyles.tableContainer,
        'data-type': this.name,
      }),
      ['table', ['tbody', 0]],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      //@ts-expect-error
      ReactNodeViewWidget,
      { contentDOMElementTag: 'tbody' },
    );
  },
});

export { FilterTable };
