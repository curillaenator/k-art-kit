import { useEffect, useRef, useCallback } from 'react';
import { Editor } from '@tiptap/core';

import type { FilterTableAtributes } from '../../core/interfaces';
import { MIN_CELL_WIDTH, TABLE_WIDTH_CSSV, TABLE_COL_CSSV_PREFIX } from '../../react/constants';

interface UseResizersOptions {
  resizersTableId: string;
  attrs: FilterTableAtributes;
  colgroup: { colWidthCssv: string }[] | null;
  editor: Editor;
  updateAttributes: (attrs: FilterTableAtributes) => void;
}

/**
 * @description
 * - хук генерирует обработчики ширин колонок ячеек и прокидывает их в extension.storage TableHeader и TableCell,
 * чтобы экстеншены ячеек могли привязать нужный обработчик к своему UI-тогглеру изменения ширины
 * - все пляски вокруг управления шириной колонок в colgroup таблиц через cssv,
 * (а не, например, напрямую прокидыванием знаений ширин из стейта в элементы col) из-за того, что colgroup
 * находится внутри ноды ProseMirror, которая не разрешает как либо мутировать управляемые ею узлы DOM.
 * - жирный "плюс" управеления через cssv - намного меньше ререндеров
 */
const useResizers = (options: UseResizersOptions) => {
  const { resizersTableId, editor, attrs, colgroup, updateAttributes } = options;

  const resizersDomRef = useRef<HTMLDivElement | null>(null);

  const updateTableWidthsCssv = useCallback((colWs: number[]) => {
    colWs.forEach((cw, gColIdx) => {
      resizersDomRef.current?.style.setProperty(`${TABLE_COL_CSSV_PREFIX}-${gColIdx}`, `${cw}px`);
    });

    resizersDomRef.current?.style.setProperty(
      TABLE_WIDTH_CSSV,
      `${colWs.reduce((tblW, tblCol) => tblW + tblCol, 0)}px`,
    );
  }, []);

  const onColumnResize = useCallback(
    (event: MouseEvent) => {
      if (!colgroup || !resizersDomRef.current) return;

      const cell = (event.target as HTMLElement).closest<HTMLTableCellElement>('th, td');
      if (!cell) return;

      const cellsColspans: [number, number][] = [];

      (cell.parentElement as HTMLTableRowElement)
        ?.querySelectorAll<HTMLTableCellElement>('th, td')
        .forEach((thtd, cellIdx) => cellsColspans.push([cellIdx, +(thtd.getAttribute('colspan') || 1) - 1]));

      // вычисление индекса целевой для ресайза колонки
      const accumulatedColSpans = cellsColspans.slice(0, cell.cellIndex || 0).reduce((acc, itr) => acc + itr[1], 0);
      const collIdxViaColspans = (cell.cellIndex || 0) + accumulatedColSpans;

      const startX = event.clientX;
      const startWidth = resizersDomRef.current.querySelectorAll('col')[collIdxViaColspans]?.offsetWidth || 0;
      const updatedColumnWidths = colgroup.map((_, colIdx) => attrs.columnWidths[colIdx] || MIN_CELL_WIDTH * 2);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        updatedColumnWidths[collIdxViaColspans] = Math.max(MIN_CELL_WIDTH, startWidth + moveEvent.clientX - startX);
        updateTableWidthsCssv(updatedColumnWidths);
      };

      const handleMouseUp = () => {
        updateAttributes({ ...attrs, columnWidths: updatedColumnWidths });
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [colgroup, attrs, updateAttributes, updateTableWidthsCssv],
  );

  useEffect(() => {
    if (!editor.isEditable) return;

    editor.extensionManager.extensions.forEach((ext) => {
      if (ext.name === 'tableHeader' || ext.name === 'tableCell') {
        ext.storage.rezisers[resizersTableId] = onColumnResize;
      }
    });

    return () => {
      editor.extensionManager.extensions.forEach((ext) => {
        if (ext.name === 'tableHeader' || ext.name === 'tableCell') {
          ext.storage.rezisers[resizersTableId] = null;
        }
      });
    };
  }, [resizersTableId, onColumnResize]);

  useEffect(() => {
    if (!colgroup || !resizersDomRef.current) return;
    updateTableWidthsCssv(colgroup.map((_, colIdx) => attrs.columnWidths[colIdx] || MIN_CELL_WIDTH * 2));
  }, [attrs, colgroup, updateTableWidthsCssv]);

  return {
    resizersDomRef,
  };
};

export { useResizers };
