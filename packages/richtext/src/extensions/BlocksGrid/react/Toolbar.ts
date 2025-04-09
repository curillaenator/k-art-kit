import type { MutableRefObject } from 'react';
import { Editor } from '@tiptap/core';
import { Node as PmNode } from 'prosemirror-model';

import { getBlocksGridNodeByPos } from '../core';
import { ToolbarIcons } from './icons';

import { EXTENSION_NAME, COLUMN_NODE_NAME, ALLOWED_COLUMNS_IDXS } from '../core/constants';
import styles from './toolbar.module.scss';

interface ColumnToolbarButtonProps {
  icon?: SVGSVGElement;
  appearance?: 'secondary' | 'danger';
  className?: string;
}

interface ColumnToolbarProps {
  editor: Editor;
  node: PmNode;
  getPos: () => number;
  columnIdx: number;
  blocksGridNode: PmNode;

  submitButtonRef?: MutableRefObject<HTMLButtonElement | null>;
  editorContentRef?: React.MutableRefObject<HTMLDivElement | null>;
}

class ColumnToolbar {
  private props: ColumnToolbarProps | null = null;
  private toolbar: HTMLDivElement = document.createElement('div');

  constructor(props: ColumnToolbarProps) {
    this.props = props;
    this.uiToolbar();
    return this;
  }

  get element() {
    return this.toolbar;
  }

  // UI
  private uiToolbar() {
    if (!this.props) return;

    this.toolbar.classList.add(styles.toolbar);
    this.toolbar.setAttribute('contentEditable', 'false');

    const icons = new ToolbarIcons();
    const toolbarElements: HTMLButtonElement[] = [];

    if (this.props.blocksGridNode.attrs['blocksCount'] > 1) {
      if (this.props.columnIdx !== 0) {
        const shiftLeftButton = this.uiButton({ icon: icons.carretLeft });

        shiftLeftButton.onclick = (e) => this.shiftBlock(e, true);

        toolbarElements.push(shiftLeftButton);
      }

      if (this.props.columnIdx !== this.props.blocksGridNode.attrs['blocksCount'] - 1) {
        const shiftRigthButton = this.uiButton({ icon: icons.carretRight });

        shiftRigthButton.onclick = (e) => this.shiftBlock(e);

        toolbarElements.push(shiftRigthButton);
      }

      const isColFat = this.props.blocksGridNode.attrs['fatBlockIdx'] === this.props.columnIdx;

      const fattenColumn = this.uiButton({ icon: isColFat ? icons.collapseIcon : icons.expandIcon });

      fattenColumn.onclick = (e) => this.fattenBlock(e);

      toolbarElements.push(fattenColumn);
    }

    if (this.props.blocksGridNode.attrs['blocksCount'] < 3) {
      const addColumnButton = this.uiButton({ icon: icons.addIcon });

      addColumnButton.onclick = (e) => this.createBlock(e);

      toolbarElements.push(addColumnButton);
    }

    const removeColumnButton = this.uiButton({ icon: icons.deleteIcon, appearance: 'danger' });

    removeColumnButton.onclick = (e) => this.deleteBlock(e);

    removeColumnButton.onmouseenter = () => {
      if (!this.props?.editor || !this.props.editorContentRef?.current) return;

      this.props.editorContentRef.current.style.setProperty(
        `--blocksgrid-${this.props.node.attrs['blocksGridId']}-${this.props.columnIdx}-bdc`,
        'var(--theme-backgrounds-danger)',
      );
    };

    removeColumnButton.onmouseleave = () => this.clearCssv();

    toolbarElements.push(removeColumnButton);

    this.toolbar.append(...toolbarElements);
  }

  private uiButton(props: ColumnToolbarButtonProps) {
    const { icon, appearance = 'secondary', className } = props;

    const buttonEl = document.createElement('button');

    buttonEl.setAttribute('type', 'button');

    buttonEl.classList.add(styles.button, styles[`button_${appearance}`]);
    if (className) buttonEl.classList.add(className);

    if (icon) buttonEl.append(icon);

    return buttonEl;
  }

  // CONTROLS
  private createBlock(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props) return;

    const $columnPos = this.props.editor.state.doc.resolve(this.props.getPos());
    const colIdx = $columnPos.index($columnPos.depth);

    const { node: blocksGridNode, pos: blocksGridNodePos } = getBlocksGridNodeByPos(
      this.props.editor.state,
      this.props.getPos(),
    );

    if (!blocksGridNodePos || blocksGridNode?.type.name !== EXTENSION_NAME) return;

    const blocksGridNodeContent = (blocksGridNode.content as unknown as { content: PmNode[] }).content;

    const newContent = [
      ...blocksGridNodeContent.slice(0, colIdx + 1),
      this.props.editor.state.schema.nodes[COLUMN_NODE_NAME].createAndFill({
        blocksGridId: blocksGridNode.attrs['blocksGridId'],
      }) as PmNode,
      ...blocksGridNodeContent.slice(colIdx + 1),
    ];

    this.dispatchExtensionNode(
      blocksGridNodePos,
      blocksGridNode.nodeSize,
      this.props.editor.state.schema.nodes[EXTENSION_NAME].create(
        {
          ...blocksGridNode.attrs,
          blocksCount: blocksGridNode.attrs['blocksCount'] + 1,
          timestamp: Date.now(),
        },

        newContent,
      ),
    );
  }

  private deleteBlock(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props) return;

    const nodePos = this.props.getPos();
    const prevNode = this.props.editor.state.doc.nodeAt(nodePos - 1);

    if (prevNode?.type.name === EXTENSION_NAME && prevNode.content.childCount === 1) {
      const delTr = this.props.editor.state.tr;
      delTr.delete(nodePos - 1, nodePos - 1 + prevNode.nodeSize);
      this.props.editor.view.dispatch(delTr);
      this.props.editor.commands.focus(nodePos);

      return;
    }

    const { node: blocksGridNode, pos: blocksGridNodePos } = getBlocksGridNodeByPos(
      this.props.editor.state,
      this.props.getPos(),
    );

    if (!blocksGridNodePos || blocksGridNode?.type.name !== EXTENSION_NAME) return;

    const $columnPos = this.props.editor.state.doc.resolve(this.props.getPos());
    const colIdx = $columnPos.index($columnPos.depth);

    const newNodeContent = [...(blocksGridNode.content as unknown as { content: PmNode[] }).content].filter(
      (_, i) => i !== colIdx,
    );

    this.dispatchExtensionNode(
      blocksGridNodePos,
      blocksGridNode.nodeSize,
      this.props.editor.state.schema.nodes[EXTENSION_NAME].create(
        {
          ...blocksGridNode.attrs,
          blocksCount: blocksGridNode.attrs['blocksCount'] - 1,
          timestamp: Date.now(),
        },

        newNodeContent,
      ),
    );
  }

  private shiftBlock(e: MouseEvent, backwards?: boolean) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props) return;

    const $columnPos = this.props.editor.state.doc.resolve(this.props.getPos());
    const colIdx = $columnPos.index($columnPos.depth);

    const { node: blocksGridNode, pos: blocksGridNodePos } = getBlocksGridNodeByPos(
      this.props.editor.state,
      this.props.getPos(),
    );

    if (!blocksGridNodePos || blocksGridNode?.type.name !== EXTENSION_NAME) return;

    const newContent = [...(blocksGridNode.content as unknown as { content: PmNode[] }).content];

    if (backwards) {
      [newContent[colIdx - 1], newContent[colIdx]] = [newContent[colIdx], newContent[colIdx - 1]];
    } else {
      [newContent[colIdx], newContent[colIdx + 1]] = [newContent[colIdx + 1], newContent[colIdx]];
    }

    this.dispatchExtensionNode(
      blocksGridNodePos,
      blocksGridNode.nodeSize,
      this.props.editor.state.schema.nodes[EXTENSION_NAME].create(
        {
          ...blocksGridNode.attrs,
          timestamp: Date.now(),
          fatBlockIdx: blocksGridNode.attrs['fatBlockIdx'] + (backwards ? -1 : 1),
        },
        [...newContent],
      ),
    );
  }

  private fattenBlock(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props) return;

    const { node: blocksGridNode, pos: blocksGridNodePos } = getBlocksGridNodeByPos(
      this.props.editor.state,
      this.props.getPos(),
    );

    if (!blocksGridNodePos || blocksGridNode?.type.name !== EXTENSION_NAME) return;

    const $columnPos = this.props.editor.state.doc.resolve(this.props.getPos());
    const colIdx = $columnPos.index($columnPos.depth);

    this.dispatchExtensionNode(
      blocksGridNodePos,
      blocksGridNode.nodeSize,
      this.props.editor.state.schema.nodes[EXTENSION_NAME].create(
        {
          ...blocksGridNode.attrs,
          fatBlockIdx: colIdx === blocksGridNode.attrs['fatBlockIdx'] ? null : colIdx,
          timestamp: Date.now(),
        },

        blocksGridNode.content,
      ),
      this.props.editor.state.selection.$from.pos,
    );
  }

  private dispatchExtensionNode(initPos: number, initSize: number, newNode: PmNode, carretPos?: number) {
    if (!this.props) return;

    const tr = this.props.editor.state.tr;

    tr.delete(initPos, initPos + initSize);
    tr.replaceWith(initPos, initPos, newNode);

    this.props!.editor.view.dispatch(tr);
    this.props!.blocksGridNode = newNode;
    this.props.editor.commands.focus(carretPos || initPos - 2);

    this.clearCssv();
  }

  private clearCssv() {
    ALLOWED_COLUMNS_IDXS.forEach((num) =>
      this.props?.editorContentRef?.current?.style.removeProperty(
        `--blocksgrid-${this.props.blocksGridNode.attrs['blocksGridId']}-${num}-bdc`,
      ),
    );
  }
}

export { ColumnToolbar, type ColumnToolbarProps };
