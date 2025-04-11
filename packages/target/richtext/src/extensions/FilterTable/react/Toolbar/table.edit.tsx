import React from 'react';
import type { ToolbarItemProps } from './interfaces';

import IconSplitCell from '../svg/split.svg';
import IconMergeCells from '../svg/merge.svg';

// import IconColumnHeader from '../svg/header-col.svg';
// import IconRowHeader from '../svg/header-row.svg';

import IconRowDelete from '../svg/delete-row.svg';
import IconAddRowAfter from '../svg/add-row.svg';

import IconColumnDelete from '../svg/delete-column.svg';
import IconAddColumnAfter from '../svg/add-column.svg';

import { TableCellFillIcon } from '../svg/TableColorFillSquareIcon';

const enum TABLE_COLOR_FILL {
  LIGHT_GREEN = 'var(--theme-backgrounds-succes)',
  LIGHT_YELLOW = 'var(--theme-backgrounds-warn)',
  LIGHT_RED = 'var(--theme-backgrounds-error)',
  LIGHT_BLUE = 'var(--theme-backgrounds-info)',
  MODERATE_GRAY = 'var(--theme-backgrounds-dark)',
  LIGHT_GRAY = 'var(--theme-backgrounds-light)',
  NO_FILL = 'transparent',
}

const TABLE_MAX_ROWS = 5000;

const isRowsCountAtMaxOrTableNotActive: ToolbarItemProps['shouldBeDisabled'] = (editor) => {
  const selectedNode = editor.view.domAtPos(editor.state.selection.anchor).node;

  const closestTable =
    'closest' in selectedNode
      ? (selectedNode as HTMLElement).closest('table')
      : selectedNode.parentElement?.closest('table');

  return !editor.isActive('table') || closestTable?.querySelectorAll('tr:not(tr table tr)').length === TABLE_MAX_ROWS;
};

const TABLE_EDIT_ITEMS: ToolbarItemProps[] = [
  // {
  //   id: 'addColumnBefore',
  //   Icon: IconAddColumnBefore,
  //   command: (chain) => chain.focus().addColumnBefore().run(),
  //   shouldBeDisabled: (editor) => !editor.isActive('table'),
  // },
  {
    id: 'addColumnAfter',
    Icon: IconAddColumnAfter,
    command: (chain) => chain.focus().addColumnAfter().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'deleteColumn',
    Icon: IconColumnDelete,
    command: (chain) => chain.focus().deleteColumn().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'splitter-1',
  },
  // {
  //   id: 'addRowBefore',
  //   Icon: IconAddRowBefore,
  //   command: (chain) => chain.focus().addRowBefore().run(),
  //   shouldBeDisabled: isRowsCountAtMaxOrTableNotActive,
  // },
  {
    id: 'addRowAfter',
    Icon: IconAddRowAfter,
    command: (chain) => chain.focus().addRowAfter().run(),
    shouldBeDisabled: isRowsCountAtMaxOrTableNotActive,
  },
  {
    id: 'deleteRow',
    Icon: IconRowDelete,
    command: (chain) => chain.focus().deleteRow().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'splitter-2',
  },
  {
    id: 'mergeCells',
    Icon: IconMergeCells,
    command: (chain) => chain.focus().mergeCells().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'splitCell',
    Icon: IconSplitCell,
    command: (chain) => chain.focus().splitCell().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  // {
  //   id: 'splitter-3',
  // },
  // {
  //   id: 'toggleHeaderColumn',
  //   Icon: IconColumnHeader,
  //   command: (chain) => chain.focus().toggleHeaderColumn().run(),
  //   shouldBeDisabled: (editor) => !editor.isActive('table'),
  // },
  // {
  //   id: 'toggleHeaderRow',
  //   Icon: IconRowHeader,
  //   command: (chain) => chain.focus().toggleHeaderRow().run(),
  //   shouldBeDisabled: (editor) => !editor.isActive('table'),
  // },
];

const TABLE_COLOR_ITEMS: ToolbarItemProps[] = [
  {
    id: 'colorFillLightGreen',
    Icon: () => <TableCellFillIcon color={TABLE_COLOR_FILL.LIGHT_GREEN} />,
    command: (chain) => chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_GREEN).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_GREEN),
  },
  {
    id: 'colorFillLightYellow',
    Icon: () => <TableCellFillIcon color={TABLE_COLOR_FILL.LIGHT_YELLOW} />,
    command: (chain) => chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_YELLOW).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_YELLOW),
  },
  {
    id: 'colorFillLightRed',
    Icon: () => <TableCellFillIcon color={TABLE_COLOR_FILL.LIGHT_RED} />,
    command: (chain) => chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_RED).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_RED),
  },
  {
    id: 'colorFillLightBlue',
    Icon: () => <TableCellFillIcon color={TABLE_COLOR_FILL.LIGHT_BLUE} />,
    command: (chain) => chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_BLUE).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_BLUE),
  },
  {
    id: 'colorFillModerateGray',
    Icon: () => <TableCellFillIcon color={TABLE_COLOR_FILL.MODERATE_GRAY} />,
    command: (chain) => chain.focus().colorFill(TABLE_COLOR_FILL.MODERATE_GRAY).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.MODERATE_GRAY),
  },
  {
    id: 'colorFillLightGray',
    Icon: () => <TableCellFillIcon color={TABLE_COLOR_FILL.LIGHT_GRAY} />,
    command: (chain) => chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_GRAY).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_GRAY),
  },
  {
    id: 'colorFillNoFill',
    Icon: () => <TableCellFillIcon color={TABLE_COLOR_FILL.NO_FILL} />,
    command: (chain) => chain.focus().colorFill(TABLE_COLOR_FILL.NO_FILL).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.NO_FILL),
  },
];

export { TABLE_COLOR_ITEMS, TABLE_EDIT_ITEMS };
