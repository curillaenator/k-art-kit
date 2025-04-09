import React, { FC, useRef, useState, useId, useEffect, useCallback } from 'react';
import { Editor, NodeViewWrapper, useReactNodeView } from '@tiptap/react';
import cn from 'classnames';

import { useTable } from './hooks/useTable';
import { useResizers } from './hooks/useResizers';

import { Toolbar } from './Toolbar';

import { TABLE_WIDTH_CSSV } from './constants';
import type { UiWidgetProps } from './interfaces';

import styles from './widget.module.scss';

export const ReactNodeViewWidget: FC<UiWidgetProps> = (props) => {
  const { editor, node, updateAttributes } = props;

  const { nodeViewContentRef } = useReactNodeView();
  const resizersTableId = useId();

  const { colgroup } = useTable(props);
  const { resizersDomRef } = useResizers({ resizersTableId, editor, colgroup, attrs: node.attrs, updateAttributes });

  const tiptapTableHeightRef = useRef<{ width: number; height: number } | null>(null);

  const [toolbar, setToolbar] = useState<boolean>(false);

  const setToolbarCanBeShown = useCallback(
    ({ editor: ed }: { editor: Editor }) => setToolbar(ed.isActive('table')),
    [],
  );

  useEffect(() => {
    editor.on('selectionUpdate', setToolbarCanBeShown);

    return () => {
      editor.off('selectionUpdate', setToolbarCanBeShown);
    };
  }, []);

  if (!colgroup) return null;

  return (
    <NodeViewWrapper as='section' className={cn(styles.nodeViewWrapper)}>
      <div
        ref={resizersDomRef}
        data-resizers-container
        data-resizers-table-id={resizersTableId}
        className={cn(styles.tableContainer, {
          [styles.tableContainer_hasToolbar]: !!toolbar,
        })}
      >
        <div
          className={styles.contentTable}
          ref={(inst) => {
            if (!inst) return;
            tiptapTableHeightRef.current = { width: inst.clientWidth, height: inst.clientHeight };
          }}
        >
          <table ref={nodeViewContentRef} style={{ width: `var(${TABLE_WIDTH_CSSV})` }}>
            <colgroup>
              {colgroup.map(({ colWidthCssv }) => (
                <col key={`${resizersTableId}-${colWidthCssv}`} style={{ width: `var(${colWidthCssv})` }} />
              ))}
            </colgroup>
          </table>
        </div>

        {toolbar && editor.isEditable && (
          <div className={styles.toolbar} contentEditable={false}>
            <Toolbar />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
