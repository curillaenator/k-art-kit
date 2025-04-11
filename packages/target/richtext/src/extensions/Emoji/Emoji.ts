/** реализация под задачи парсинга Jira Markdown, остальное см пример https://reactjs-tiptap-editor.vercel.app/ , но с соблюдением обозначенных тут контрактов */
import { Node, mergeAttributes } from '@tiptap/core';

import { namesToEmoji } from './emojis';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {}
}

export const Emoji = Node.create({
  name: 'emoji',
  inline: true,
  group: 'inline',

  addAttributes() {
    return {
      shortName: null /** шорт карт вида :question: */,
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-extension="${this.name}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, { 'data-extension': this.name }),

      //@ts-expect-error
      `${node.attrs.shortName ? namesToEmoji[String(node.attrs.shortName).replace(/:/g, '')] : node.attrs.shortName}`,
    ];
  },

  renderText({ node: a }) {
    return a.attrs.shortName;
  },

  addCommands() {
    return {
      setEmoji:
        (emojiAttrs: { shortName: string }) =>
        ({ commands }) =>
          commands.insertContent([{ type: this.name, attrs: emojiAttrs }]),
    };
  },
});
