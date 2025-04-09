import { Extension, findChildren, combineTransactionSteps, getChangedRanges, findChildrenInRange } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Fragment, Slice, type Node as TiptapNode } from '@tiptap/pm/model';
import { generateUUID, findDuplicates } from './utils';
import type { Transaction } from '@tiptap/pm/state';

interface UniqueIdConfig {
  attributeName: string;
  types: string[];
  generateID: () => string;
  filterTransaction: ((transaction: Transaction) => unknown) | null;
  enableEditorOnChangeFn?: (enabled?: boolean) => void;
}

const UniqueId = Extension.create<UniqueIdConfig>({
  name: 'uniqueID',

  priority: 1e4,

  addOptions() {
    return {
      attributeName: 'id',
      types: [],
      generateID: () => generateUUID(),
      filterTransaction: null,
      enableEditorOnChangeFn: () => {},
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (element) => element.getAttribute(`data-${this.options.attributeName}`),
            renderHTML: (attributes) =>
              attributes[this.options.attributeName]
                ? {
                    [`data-${this.options.attributeName}`]: attributes[this.options.attributeName],
                  }
                : {},
          },
        },
      },
    ];
  },

  onCreate() {
    if (this.editor.extensionManager.extensions.find((s) => s.name === 'collaboration')) {
      this.options.enableEditorOnChangeFn?.();
      return;
    }

    const { view, state } = this.editor;
    const { tr, doc } = state;
    const { types, attributeName, generateID, enableEditorOnChangeFn } = this.options;

    findChildren(doc, (node) => types.includes(node.type.name) && node.attrs[attributeName] === null).forEach(
      ({ node, pos }) => {
        tr.setNodeMarkup(pos, undefined, { ...node.attrs, [attributeName]: generateID() });
      },
    );

    tr.setMeta('addToHistory', false);
    view.dispatch(tr);
    enableEditorOnChangeFn?.();
  },

  addProseMirrorPlugins() {
    let dragSourceElement: HTMLElement | null = null;
    let isPasting = false;

    return [
      new Plugin({
        key: new PluginKey('uniqueID'),

        appendTransaction: (transactions, oldState, newState) => {
          const docChanged =
            transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
          const shouldFilterTransaction =
            this.options.filterTransaction &&
            transactions.some((transaction) => this.options.filterTransaction?.(transaction) === false);

          if (!docChanged || shouldFilterTransaction) return;

          const { tr, doc } = newState;
          const { types, attributeName, generateID } = this.options;
          // @ts-expect-error
          const transactionSteps = combineTransactionSteps(oldState.doc, transactions);
          const { mapping } = transactionSteps;

          getChangedRanges(transactionSteps).forEach(({ newRange }) => {
            const nodesInRange = findChildrenInRange(doc, newRange, (node) => types.includes(node.type.name));
            const existingIDs = nodesInRange.map(({ node }) => node.attrs[attributeName]).filter((id) => id !== null);

            nodesInRange.forEach(({ node, pos }, index) => {
              const nodeID = tr.doc.nodeAt(pos)?.attrs[attributeName];

              if (nodeID === null) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID(),
                });
                return;
              }

              const nextNode = nodesInRange[index + 1];
              if (nextNode && node.content.size === 0) {
                tr.setNodeMarkup(nextNode.pos, undefined, {
                  ...nextNode.node.attrs,
                  [attributeName]: nodeID,
                });
                existingIDs[index + 1] = nodeID;

                const newID = generateID();
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: newID,
                });
                existingIDs[index] = newID;
                return tr;
              }

              const duplicateIDs = findDuplicates(existingIDs);
              const { deleted } = mapping.invert().mapResult(pos);

              if (deleted && duplicateIDs.includes(nodeID)) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID(),
                });
              }
            });
          });

          if (tr.steps.length) {
            return tr;
          }
        },

        view: (view) => {
          const onDragStart = (event: DragEvent) => {
            dragSourceElement = view.dom.parentElement?.contains(event.target as Node) ? view.dom.parentElement : null;
          };

          window.addEventListener('dragstart', onDragStart);

          return {
            destroy() {
              window.removeEventListener('dragstart', onDragStart);
            },
          };
        },

        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              if (dragSourceElement !== view.dom.parentElement || event.dataTransfer?.effectAllowed === 'copy') {
                dragSourceElement = null;
                isPasting = true;
              }
              return false;
            },

            paste: () => {
              isPasting = true;
              return false;
            },
          },

          transformPasted: (slice) => {
            if (!isPasting) return slice;

            const { types, attributeName } = this.options;

            const transformContent = (content: Fragment) => {
              const fragments: TiptapNode[] = [];

              content.forEach((node) => {
                if (node.isText) {
                  fragments.push(node);
                } else if (!types.includes(node.type.name)) {
                  fragments.push(node.copy(transformContent(node.content)));
                } else {
                  const newNode = node.type.create(
                    {
                      ...node.attrs,
                      [attributeName]: null,
                    },
                    transformContent(node.content),
                    node.marks,
                  );
                  fragments.push(newNode);
                }
              });

              return Fragment.from(fragments);
            };

            isPasting = false;
            return new Slice(transformContent(slice.content), slice.openStart, slice.openEnd);
          },
        },
      }),
    ];
  },
});

export { UniqueId, type UniqueIdConfig };
