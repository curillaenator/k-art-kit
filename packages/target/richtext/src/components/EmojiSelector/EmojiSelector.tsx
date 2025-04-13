import React, { FC } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { toPairs } from 'lodash';

import { Dropable } from '@k-art/dropable';
import { Button } from '@k-art/button';
import { ToolbarButton } from '../ToolbarButton';

import { useDropdown } from './hooks/useDropdown';

import { namesToEmoji } from './emojis';

import type { EmojiSelectorProps } from './interfaces';
//@ts-ignore
import styles from './emojiselector.module.scss';

export const EmojiSelector: FC<EmojiSelectorProps> = (props) => {
  const { editor } = useCurrentEditor();

  const {
    id,
    disabled,
    offset = [0, 4],
    isOpen,
    closeDropdown,
    editorContentRef,

    //guard
    onSelectionUpdateHandlers,

    ...rest
  } = useDropdown(props);

  console.log('EmojiSelector', id, disabled, editorContentRef, onSelectionUpdateHandlers);

  if (!editor) return null;

  return (
    <Dropable
      {...rest}
      offset={offset}
      closeDropdown={closeDropdown}
      closeOnItemClick
      openNode={
        <div>
          <ToolbarButton active={isOpen} onClick={() => setTimeout(() => editor.commands.focus(), 20)}>
            <span style={{ width: '24px', textAlign: 'center' }}>{namesToEmoji['smile']}</span>
          </ToolbarButton>
        </div>
      }
    >
      <div className={styles.emoji}>
        {toPairs(namesToEmoji).map(([shortName, emojiVal]) => (
          <Button
            // height={32}
            key={shortName}
            title={emojiVal}
            onClick={() => {
              editor.commands.setEmoji({ shortName });
              closeDropdown?.();
            }}
          />
        ))}
      </div>
    </Dropable>
  );
};
