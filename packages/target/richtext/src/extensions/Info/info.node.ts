import { Node, mergeAttributes, InputRule } from '@tiptap/core';
import cn from 'classnames';

import { INFO_ICONS } from './icons';

import type { InfoAttributes } from './interfaces';
import styles from './info.module.scss';

const INFO_EXTENSION = 'info';
const INPUT_RE = /!(info|warn|success|error)\[([^\]]+)\]\s$/; // seacrhes for `[title][url] ` with \s in the end

const Info = Node.create({
  name: INFO_EXTENSION,

  group: 'block',

  content: 'block+',

  draggable: true,

  addAttributes() {
    return {
      infoType: {
        default: 'info' as InfoAttributes['infoType'],
      },
    };
  },

  renderText({ node }) {
    return node.textContent;
  },

  parseHTML() {
    return [{ tag: `section[data-extension="${this.name}"]` }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { infoType = 'info' } = node.attrs as InfoAttributes;

    return [
      'section',
      mergeAttributes(HTMLAttributes, {
        class: cn(styles.info, styles[`info_${infoType}`]),
        'data-extension': this.name,
      }),

      ['img', { src: `data:image/svg+xml;base64,${btoa(INFO_ICONS[infoType])}` }],

      ['div', { class: styles.info_content }, 0],
    ];
  },

  addInputRules() {
    const { schema } = this.editor;

    return [
      ...(this.parent?.() || []),

      new InputRule({
        find: INPUT_RE,

        handler: ({ range, match, commands }) => {
          const [, infoType, content] = match;

          commands.deleteRange(range);

          const infoContentNode = schema.nodes.paragraph.create(null, schema.text(content));
          const infoNode = schema.nodes.info.create({ infoType }, infoContentNode);

          commands.insertContentAt(range.from, infoNode);
        },
      }),
    ];
  },
});

export { Info };
