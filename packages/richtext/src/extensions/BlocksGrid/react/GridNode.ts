import { mergeAttributes } from '@tiptap/core';
import toPairs from 'lodash/toPairs.js';
import classNames from 'classnames';

import { BlocksGrid as BlocksGridCore, EXTENSION_NAME } from '../core';

// TODO: add global classses in options to be able to render pure html with them
import gridStyles from './grid.module.scss';

const BlocksGrid = BlocksGridCore.extend({
  addOptions() {
    return this.parent?.();
  },

  renderHTML({ HTMLAttributes, node }) {
    const { disableOverlap } = this.options;

    return [
      'section',
      {
        ...HTMLAttributes,
        'data-extension': EXTENSION_NAME,
        class: classNames(gridStyles.grid, { [gridStyles.overlap]: !disableOverlap }),
        style: `--blocksgrid-template: ${[...new Array(node.attrs['blocksCount'] || 1)]
          .map((_, i) => (i === node.attrs['fatBlockIdx'] ? 'minmax(0, 2fr)' : 'minmax(0, 1fr)'))
          .join(' ')}`,
      },
      0,
    ];
  },

  addNodeView() {
    return (props) => {
      const { node, HTMLAttributes, extension } = props;
      const { disableOverlap } = extension.options;

      const mainNode = document.createElement('section');
      mainNode.className = classNames(gridStyles.grid, { [gridStyles.overlap]: !disableOverlap });

      mainNode.style.setProperty(
        '--blocksgrid-template',
        [...new Array(node.attrs['blocksCount'] || 1)]
          .map((_, i) => (i === node.attrs['fatBlockIdx'] ? 'minmax(0, 2fr)' : 'minmax(0, 1fr)'))
          .join(' '),
      );

      toPairs(mergeAttributes(HTMLAttributes, { 'data-extension': this.name })).forEach(([attrKey, attrVal]) =>
        mainNode.setAttribute(attrKey, attrVal),
      );

      return {
        dom: mainNode,
        contentDOM: mainNode,
      };
    };
  },
});

export { BlocksGrid };
