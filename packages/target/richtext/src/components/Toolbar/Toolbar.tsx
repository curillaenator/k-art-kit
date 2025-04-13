import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import cn from 'classnames';
import { v4 as getKey } from 'uuid';

import { Corners, BDRS } from '@k-art/shape';

import type { ToolbarProps } from './interfaces';
// import { useToolbarObserver } from './hooks/useToolbarObserver';

import { DEFAULT_STRUCT } from './constants';
//@ts-ignore
import styles from './Toolbar.module.scss';

const Toolbar: FC<ToolbarProps> = memo((props) => {
  const { disabled, editorContentRef } = props;

  const { editor } = useCurrentEditor();

  // const {
  // containerRef,
  // composition
  // } = useToolbarObserver({});

  const { left, right } = DEFAULT_STRUCT.full;

  const onSelectionUpdateHandlers = useRef<(() => void)[]>([]);

  const onSelectionUpdate = useCallback(() => {
    onSelectionUpdateHandlers.current.forEach((handler) => handler());
  }, []);

  useEffect(() => {
    if (editor) {
      editor.on('selectionUpdate', onSelectionUpdate).on('update', onSelectionUpdate);
      onSelectionUpdate();
    }

    return () => {
      editor?.off('selectionUpdate', onSelectionUpdate).off('update', onSelectionUpdate);
    };
  }, [editor, onSelectionUpdate]);

  return (
    <div
      // ref={containerRef}
      id={'rich-text-toolbar'}
      className={cn(
        styles.toolbar,
        // styles[`_${composition}`],
        styles[`_full`],
      )}
    >
      <Corners borderRadius={BDRS[16]} stroke={1} />

      <div
        className={cn(
          styles.toolbarBlock,
          styles.toolbarBlock_left,
          // styles[`_${composition}`],
          styles[`_full`],
        )}
      >
        {left.map((Component) => (
          <Component
            key={getKey()}
            disabled={disabled}
            editorContentRef={editorContentRef}
            onSelectionUpdateHandlers={onSelectionUpdateHandlers}
          />
        ))}
      </div>

      <div className={cn(styles.toolbarBlock, styles.toolbarBlock_right, styles[`_full`])}>
        {right.map((Component) => {
          return (
            <Component
              key={getKey()}
              disabled={disabled}
              editorContentRef={editorContentRef}
              onSelectionUpdateHandlers={onSelectionUpdateHandlers}
            />
          );
        })}
      </div>
    </div>
  );
});

export { Toolbar };
