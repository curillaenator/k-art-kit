import React, { FC, useCallback } from 'react';
import { useCurrentEditor } from '@tiptap/react';

import { Dropable } from '@k-art/dropable';
import { ToolbarButton } from '../ToolbarButton';

import { EXTENSION_NAME as BLOCKS_GRID_NODE_NAME } from '../../extensions/BlocksGrid/core/constants';

import { getInsertBlocksGridVariants, checkIsCarretInside } from './utils';
import { useDropdown } from './hooks/useDropdown';

import TrashIcon from './svg/trash.svg';
import BlocksgridIcon from './svg/addBlocksgrid.svg';

import { DEFAULT_CAPTIONS } from '../constants';
import type { GridSelectorProps } from './interfaces';
//@ts-ignore
import styles from './gridselector.module.scss';

export const GridSelector: FC<GridSelectorProps> = (props) => {
  const { editor } = useCurrentEditor();

  const {
    id,
    disabled,
    offset = [0, 4],
    isOpen,
    closeDropdown,
    editorContentRef,

    //guard
    onSelectionUpdateHandlers, // eslint-disable-line @typescript-eslint/no-unused-vars

    ...rest
  } = useDropdown(props);

  const clearBlocksGridCssv = useCallback(() => {
    if (!editor || !editorContentRef?.current) return;
    const targetNode = editor.state.selection.$from.node(1);

    if (targetNode?.type?.name === 'blocksGrid') {
      [0, 1, 2].forEach((num) =>
        editorContentRef.current?.style.removeProperty(`--blocksgrid-${targetNode.attrs['blocksGridId']}-${num}-bdc`),
      );
    }
  }, [editor, editorContentRef]);

  const highlightFocusedBlocksGridWithCssv = useCallback(() => {
    if (!editor || !editorContentRef?.current) return;
    const targetNode = editor.state.selection.$from.node(1);

    if (targetNode?.type?.name === 'blocksGrid') {
      [0, 1, 2].forEach((num) =>
        editorContentRef.current?.style.setProperty(
          `--blocksgrid-${targetNode.attrs['blocksGridId']}-${num}-bdc`,
          'var(--theme-backgrounds-danger)',
        ),
      );
    }
  }, [editor, editorContentRef]);

  if (!editor) return null;

  // not hooks
  const isCarretInsideAvoidedNodes = checkIsCarretInside(editor, [BLOCKS_GRID_NODE_NAME, 'table']);
  const isBlocksGridDisabled = isCarretInsideAvoidedNodes || disabled;

  return (
    <Dropable
      {...rest}
      offset={offset}
      closeDropdown={closeDropdown}
      closeOnItemClick
      openNode={
        <div>
          <ToolbarButton
            id={!!id ? `${id}-opennode` : undefined}
            active={isOpen}
            onClick={() => setTimeout(() => editor.commands.focus(), 20)}
          >
            <BlocksgridIcon />
          </ToolbarButton>
        </div>
      }
    >
      <div className={styles.inserts}>
        {getInsertBlocksGridVariants(editor.commands).map(({ id, icon: Icon, onClick }) => (
          <ToolbarButton
            key={id}
            disabled={isBlocksGridDisabled}
            onClick={(e) => {
              onClick?.(e);
              closeDropdown?.();
            }}
          >
            <Icon />
          </ToolbarButton>
        ))}
      </div>

      <ToolbarButton
        disabled={!checkIsCarretInside(editor, ['blocksGrid'])}
        onMouseEnter={highlightFocusedBlocksGridWithCssv}
        onMouseLeave={clearBlocksGridCssv}
        onClick={() => {
          editor.commands.deleteBlocksGrid(clearBlocksGridCssv);
          closeDropdown?.();
        }}
      >
        <TrashIcon />
        {DEFAULT_CAPTIONS.deleteBlocksGrid}
      </ToolbarButton>
    </Dropable>
  );
};
