import { ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';

import { ImageView } from './Image.view';

import { ImageConfig, ImageAttributes } from './interfaces';

import styles from './image.module.scss';

const IMAGE_EXTENSION = 'image';
const INPUT_REGEXP = /^(https?:\/\/.*\.(?:jpe?g|png)(?:\?.*)?)\s$/;

const Image = Node.create<ImageConfig>({
  name: IMAGE_EXTENSION,
  group: 'block',
  draggable: true,

  addOptions() {
    return {};
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },

      scale: {
        default: 1,
      },

      pos: {
        default: [0, 0],
      },

      height: {
        default: 512,
      },
    };
  },

  renderText({ node }) {
    return node.attrs['src'];
  },

  parseHTML() {
    return [{ tag: `section[data-extension="${this.name}"]` }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { pos, scale, src, height } = node.attrs as ImageAttributes;

    return [
      'section',
      mergeAttributes(HTMLAttributes, {
        style: `height: ${height}px`,
        class: styles.container,
        'data-extension': this.name,
      }),

      [
        'img',
        {
          src,
          alt: src,
          title: src,
          style: `transform: translate(${pos[0]}px, ${pos[1]}px) scale(${scale})`,
        },
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },

  addCommands() {
    return {
      setImage:
        ({ src }) =>
        ({ commands }) => {
          return commands.insertContent([
            { type: 'paragraph' },
            { type: this.name, attrs: { src } },
            { type: 'paragraph' },
          ]);
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: INPUT_REGEXP,
        type: this.type,
        getAttributes: (match) => {
          // const [, , alt, src, title] = match;

          // console.log('Fires', match[1]);

          return { src: match[1] };
        },
      }),
    ];
  },
});

export { Image };
