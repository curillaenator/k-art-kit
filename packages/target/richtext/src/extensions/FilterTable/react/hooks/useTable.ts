import { useEffect, useState } from 'react';
import { Node as ProseMirroNode } from '@tiptap/pm/model';

import { TABLE_COL_CSSV_PREFIX } from '../constants';

import type { UiWidgetProps } from '../interfaces';

interface ColgroupItem {
  colWidthCssv: string;
}

const useTable = (props: UiWidgetProps) => {
  const {
    node: { content },
  } = props;

  const [colgroup, setColgroup] = useState<ColgroupItem[] | null>(null);

  useEffect(() => {
    const tableAllRows: ProseMirroNode[] = [];
    content.forEach((rNode) => tableAllRows.push(rNode));

    const expectedColWidthCount = tableAllRows.reduce(
      (colsCnt, row) => (row.content.childCount > colsCnt ? row.content.childCount : colsCnt),
      0,
    );

    setColgroup(
      [...new Array(expectedColWidthCount).fill(null)].map((_, colIdx) => ({
        colWidthCssv: `${TABLE_COL_CSSV_PREFIX}-${colIdx}`,
      })),
    );
  }, [content]);

  return { colgroup };
};

export { useTable };
