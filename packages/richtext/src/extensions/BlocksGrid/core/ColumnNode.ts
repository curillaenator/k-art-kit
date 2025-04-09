import { Node, findParentNode, isAtEndOfNode, isAtStartOfNode, getText } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';

import type { BlocksGridColumnConfig } from './interfaces';
import { COLUMN_NODE_NAME } from './constants';

const BlocksGridColumn = Node.create<BlocksGridColumnConfig>({
  name: COLUMN_NODE_NAME,

  group: 'block',

  content: `block+`,

  draggable: false,

  addOptions() {
    return {
      blocksGridId: null,
    };
  },

  addAttributes() {
    return {
      blocksGridId: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: `div[data-extension="${COLUMN_NODE_NAME}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes, 'data-extension': COLUMN_NODE_NAME }, ['div', {}, 0]];
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, view } = editor;
        const { selection } = state;
        const { $from } = selection;

        // TODO: таких хардкодных проверок быть не должно (возможно порядок инициализации позволяет этого избежать)
        // * Внутри этих нод есть свои обработчики, оставляем дефолтную обработку Enter.
        if (['codeBlock', 'plantuml'].includes(selection.$from.parent.type.name)) return false;

        const closestAncestorNode = findParentNode((t) => t.type === this.type)(selection);
        const hasGridColumnAsDirectParent = closestAncestorNode && $from.depth - closestAncestorNode.depth === 1;

        // * Если GridColumn не является родителем текущего выделения, то мы оставляем дефолтную обработку Enter.
        if (!hasGridColumnAsDirectParent) return false;

        const tr = state.tr;
        const cursor = tr.selection instanceof TextSelection && tr.selection.$cursor;

        // * Когда у текстового выделения отсутствуют ноды впереди и позади, то это пустая нода. Когда это выделение находится внутри GridColumn, то по дефолту при нажатии Enter некорректно вставляется новый параграф вне GridColumn. https://sberworks.ru/jira/browse/SWTR-9935
        const isTextSelectionInEmptyParagraph = cursor && !cursor.nodeAfter && !cursor.nodeBefore;

        // * Если это не текстовое выделение в пустой ноде, то мы оставляем дефолтную обработку Enter.
        if (!isTextSelectionInEmptyParagraph) return false;

        const nodeToInsert = closestAncestorNode.node.type.contentMatch.defaultType?.createAndFill();
        if (!nodeToInsert) return false;

        tr.insert($from.pos, nodeToInsert);
        tr.setSelection(TextSelection.near(tr.doc.resolve($from.pos + 1)));
        view.dispatch(tr);
        view.focus();

        return true;
      },

      'Mod-Enter': ({ editor }) => {
        const { state, view } = editor;
        const { selection } = state;

        const blocksGridNode = findParentNode((t) => t.type.name === state.schema.nodes['blocksGrid'].name)(selection);
        if (!blocksGridNode) return false;

        const tr = state.tr;
        const newPos = blocksGridNode?.pos + blocksGridNode.node.nodeSize;

        tr.insert(newPos, state.schema.nodes.paragraph.create());
        tr.setSelection(TextSelection.near(tr.doc.resolve(newPos)));
        tr.scrollIntoView();

        view.dispatch(tr);
        view.focus();

        return true; // Останавливаем стандартное поведение
      },

      Backspace: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty) return false;

        const parentNode = findParentNode((t) => t.type.name === state.schema.nodes[COLUMN_NODE_NAME].name)(selection);
        if (!parentNode || parentNode.node.type.name !== COLUMN_NODE_NAME) return false;

        const nodeBeforeCarret = editor.state.doc.nodeAt($from.before(parentNode?.depth + 1) - 1);
        if (nodeBeforeCarret?.type.name !== COLUMN_NODE_NAME) return false;

        // остановка дефолтного поведения клавиши Backspace
        if (isAtStartOfNode(editor.state) && nodeBeforeCarret.type.name === COLUMN_NODE_NAME) return true; // Останавливаем стандартное поведение

        return false;
      },

      Delete: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;

        const colNode = findParentNode((t) => t.type.name === state.schema.nodes['column'].name)(selection);

        if (!colNode) return false;

        // остановка дефолтного поведения клавиши Delete
        if ($from.pos === colNode.pos + colNode.node.nodeSize - 2 && isAtEndOfNode(state)) return true;
        if (!getText(colNode.node).length) return true;

        return false;
      },
    };
  },
});

export { BlocksGridColumn };
