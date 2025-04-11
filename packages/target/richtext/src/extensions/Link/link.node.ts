import { Link as LinkCore, type LinkOptions } from '@tiptap/extension-link';
import { InputRule } from '@tiptap/core';

const INPUT_RE = /!url\[([^\]]+)\]\[([^\]]+)\]\s$/; // seacrhes for `[title][url] ` with \s in the end

const Link = LinkCore.extend<LinkOptions & { navigave?: () => void }>({
  addOptions() {
    return {
      ...this.parent?.(),
    };
  },

  addInputRules() {
    return [
      ...(this.parent?.() || []),

      new InputRule({
        find: INPUT_RE,

        handler: ({ range, match, commands }) => {
          const [, text, href] = match;

          commands.deleteRange(range);

          commands.insertContentAt(range.from, {
            type: 'text',
            text,
            marks: [{ type: 'link', attrs: { href } }],
          });
        },
      }),
    ];
  },
});

export { Link };
