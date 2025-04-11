import type { TableOptions } from '@tiptap/extension-table';

interface FilterTableAtributes {
  columnWidths: number[];

  style: string | null;
}

interface FilterTableStorage {}

interface FilterTableConfig extends TableOptions {}

interface TableCellAttributes {
  colspan: number;
  rowspan: number;
  colwidth: number;
  backgroundColor: string;
}

type TableCellOnResizeFn = ((event: MouseEvent) => void) | undefined;

export type { TableCellAttributes, TableCellOnResizeFn, FilterTableAtributes, FilterTableStorage, FilterTableConfig };
