import type { FC } from 'react';
import type { SingleCommands, Editor as CoreEditor } from '@tiptap/core';
import type { ToolbarButtonProps } from '../ToolbarButton';

import DryThreeIcon from './svg/drythree.svg';
import DryTwoIcon from './svg/drytwo.svg';
import DryOneIcon from './svg/dryone.svg';
import FattenTwoLeftIcon from './svg/fatTwoLeft.svg';
import FattenTwoRightIcon from './svg/fatTwoRight.svg';
import FattenThreeLeftIcon from './svg/fatThreeLeft.svg';
import FattenThreeMiddleIcon from './svg/fatThreeMiddle.svg';
import FattenThreeRightIcon from './svg/fatThreeRight.svg';

export const getInsertBlocksGridVariants: (commands: SingleCommands) => (ToolbarButtonProps & { icon: FC })[] = (
  commands,
) => [
  { id: 'DryOneIcon', icon: DryOneIcon, onClick: () => commands.insertBlocksGrid(1) },

  { id: 'DryTwoIcon', icon: DryTwoIcon, onClick: () => commands.insertBlocksGrid(2) },
  { id: 'DryThreeIcon', icon: DryThreeIcon, onClick: () => commands.insertBlocksGrid(3) },

  { id: 'FattenTwoLeftIcon', icon: FattenTwoLeftIcon, onClick: () => commands.insertBlocksGrid(2, 0) },
  { id: 'FattenTwoRightIcon', icon: FattenTwoRightIcon, onClick: () => commands.insertBlocksGrid(2, 1) },

  { id: 'FattenThreeLeftIcon', icon: FattenThreeLeftIcon, onClick: () => commands.insertBlocksGrid(3, 0) },
  { id: 'FattenThreeMiddleIcon', icon: FattenThreeMiddleIcon, onClick: () => commands.insertBlocksGrid(3, 1) },
  { id: 'FattenThreeRightIcon', icon: FattenThreeRightIcon, onClick: () => commands.insertBlocksGrid(3, 2) },
];

export const checkIsCarretInside = (editor: CoreEditor | null, avoidNodes: string[] = ['blocksGrid']) => {
  if (!editor) return;

  const { selection } = editor.view.state;
  const { $from } = selection;

  let depth = $from.depth;
  let isInsideAvoidedNode = false;

  while (depth > 0) {
    const node = $from.node(depth);

    if (avoidNodes.includes(node.type.name)) {
      isInsideAvoidedNode = true;
      break;
    }

    depth--;
  }

  return isInsideAvoidedNode;
};
