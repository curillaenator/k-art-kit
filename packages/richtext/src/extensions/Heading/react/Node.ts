import { Heading } from '@tiptap/extension-heading';
import { mergeAttributes } from '@tiptap/core';
import { Node as PMNode } from '@tiptap/pm/model';
import { toPairs } from 'lodash';

import {
  // getLinkIcon,
  getHeadingScrollHash,
} from './utils';

import type { ReactHeadingConfig, HeadingObsRef } from './interfaces';
import styles from './headings.module.scss';

// const onItemClick = (node: PMNode) => {
//   const url = new URL(window.location.href);
//   url.hash = getHeadingScrollHash(node.textContent, node.attrs['id']);
//   navigator.clipboard.writeText(url.href);
// };

const HeadingReactNode = Heading.extend<ReactHeadingConfig>({
  addOptions() {
    return {
      ...this.parent?.(),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),

      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return { id: attributes.id };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, HTMLAttributes, extension }) => {
      const level = node.attrs['level'] || 1;
      const tag = `h${level}`;
      const dom = document.createElement(tag);
      const contentDOM = document.createElement('span');

      contentDOM.style.setProperty('min-width', '16px');

      toPairs(
        mergeAttributes(HTMLAttributes, {
          'data-level': level,
          'data-scrollhash': getHeadingScrollHash(node.textContent, node.attrs['id']),
        }),
      ).forEach(([attrName, attrVal]) => dom.setAttribute(attrName, attrVal));

      dom.classList.add(
        styles.heading,
        styles[`heading_h${level}`],
        styles[`heading_${node.attrs['textAlign'] || 'left'}`],
      );

      // const icon = getLinkIcon();
      // const button = document.createElement('button');
      // button.type = 'button';
      // button.classList.add(styles.copylink);
      // button.setAttribute('contentEditable', 'false');
      // button.append(icon);
      // button.onclick = (e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   onItemClick(node);
      // };

      // dom.append(contentDOM, button);
      dom.append(contentDOM);

      (extension.options['headingObsRef'] as HeadingObsRef)?.current?.observe(dom);

      return { dom, contentDOM };
    };
  },
});

export { HeadingReactNode };
