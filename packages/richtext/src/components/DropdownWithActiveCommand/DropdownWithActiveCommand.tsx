import React, { FC, useState, useCallback, useMemo, useEffect, memo } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { noop } from 'lodash';

import { Dropdown } from '../Dropdown';

import { DEFAULT_CAPTIONS } from '../constants';
import type { ControlCaption, ToolbarActiveComponentDropdownProps } from '../Toolbar/interfaces';

const WATCH_IDS_FOR_ACTIVE_COMMAND = [
  'text-items-commands',
  'text-align-commands',
  'text-color-commands',
  'text-background-commands',
];

const WATCH_IDS_FOR_FOCUSED_CONTENT = ['table-items-commands', 'macros-items-commands'];

const DropdownWithActiveCommand: FC<ToolbarActiveComponentDropdownProps> = memo((props) => {
  const { id, items, defaultValue, editorContentRef, onSelectionUpdateHandlers, ...rest } = props;

  const { editor } = useCurrentEditor();

  const [activeCommand, setActiveCommand] = useState<string | null>(defaultValue || null);

  const itemsWithCaptions = useMemo(
    () => items?.map((g) => g.map((v) => ({ ...v, caption: DEFAULT_CAPTIONS[v.id as ControlCaption] ?? '' }))),
    [items],
  );

  const onUpdate = useCallback(() => {
    if (!editor || !id) return;

    if (WATCH_IDS_FOR_FOCUSED_CONTENT.includes(id)) {
      setActiveCommand(`${Date.now()}`);
      return;
    }

    if (!WATCH_IDS_FOR_ACTIVE_COMMAND.includes(id)) return;

    const flatten = (items ?? []).flat().filter((v) => v.id !== 'paragraph');
    const theActiveCommand =
      flatten.find((v) => v.isActive?.(editor) || editor?.isActive(v.id))?.id || defaultValue || null;

    setActiveCommand(theActiveCommand);
  }, [id, editor, items, defaultValue]);

  useEffect(() => {
    onSelectionUpdateHandlers.current.push(onUpdate);
  }, [onUpdate]);

  return <Dropdown {...rest} items={itemsWithCaptions} value={activeCommand} onChange={noop} closeOnItemClick />;
});

export { DropdownWithActiveCommand };
