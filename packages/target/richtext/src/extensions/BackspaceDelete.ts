import { Extension, isAtEndOfNode, isAtStartOfNode } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

import { EXTENSION_NAME as BLOCKSGRID_EXT } from './BlocksGrid';
import { TOC_EXTENSION_NAME as TOC_EXT } from './ToC';
import { DRAWIO_EXTENSION_NAME as DRAWIO_EXT } from './DrawIO';
// import { PLANT_UML_EXTENSION as PLANT_UML_EXT } from './PlantUML';

// клавиши Backspace & Delete переопределены только для экстеншенов, указанных в массиве
const checkExtensionName = (extensionName: string = 'wrong-extension-name') =>
  [
    BLOCKSGRID_EXT,
    TOC_EXT,
    DRAWIO_EXT,
    // PLANT_UML_EXT,
  ].includes(extensionName);

// плагин отлавливает положения курсора "сразу до" и "сразу после" целевых узлов экстеншенов,
// узлы которых не нужно удалять из документа по нажатию Backspace & Delete
export const preventContainerMergePlugin = new Plugin({
  key: new PluginKey('preventContainerMerge'),

  props: {
    handleKeyDown(view, event) {
      const { state } = view;
      const { selection, tr } = state;

      const { $from, $to, empty } = selection;

      if (!empty) return false;

      if (
        event.key === 'Backspace' &&
        isAtStartOfNode(state) &&
        checkExtensionName(state.doc.resolve($from.before(1)).nodeBefore?.type.name)
      ) {
        event.preventDefault();
        //Хак для удаления экспанда
        const nodeExpand = state.doc.resolve($from.before()).node();
        if (nodeExpand?.type.name === 'expand') {
          tr.delete($from.before() - 1, $from.before() + state.doc.resolve($from.before()).node().content.size);
          view.dispatch(tr);
        }

        return true;
      }

      if (
        event.key === 'Delete' &&
        isAtEndOfNode(state) &&
        checkExtensionName(state.doc.nodeAt($to.after(1))?.type.name)
      ) {
        event.preventDefault();
        return true;
      }

      return false;
    },
  },
});

export const BackspaceDeletePreventerPlugin = Extension.create({
  name: 'preventMergeBlocksgridOnBacksapce',

  addProseMirrorPlugins() {
    return [preventContainerMergePlugin];
  },
});
