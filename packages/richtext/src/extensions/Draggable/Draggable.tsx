import { Decoration, DecorationSet } from 'prosemirror-view';
import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

import styles from './draggable.module.scss';

export const Draggable = Extension.create({
  name: 'draggablePlugin',

  addOptions() {
    return {
      types: [],
    };
  },

  addProseMirrorPlugins() {
    const { types } = this.options;

    return [
      new Plugin({
        props: {
          decorations(state) {
            const decorations: Decoration[] = [];

            state.doc.descendants((node, pos) => {
              // декорируем все указанные узлы титапа
              if (types.includes(node.type.name)) {
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: styles.draggable,
                    draggable: 'true',
                    'data-drag-handle': 'true',
                  }),
                );
              }
            });

            return DecorationSet.create(state.doc, decorations);
          },
        },
      }),
    ];
  },
});
