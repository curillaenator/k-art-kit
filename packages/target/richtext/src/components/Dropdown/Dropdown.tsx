import React, { Fragment } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { Dropable } from '@k-art/dropable';

import { useDropdownProps } from './hooks/useDropdownProps';

import { DropdownItem } from './DropdownItem';
import { ToolbarButton } from '../ToolbarButton';

import type { DropdownProps } from './interfaces';

import IconSelect from './svg/select.svg';
//@ts-ignore
import styles from './dropdown.module.scss';

export const Dropdown = (props: DropdownProps) => {
  const { editor } = useCurrentEditor();

  const {
    id,
    disabled,
    items = [],
    offset = [0, 4],
    selectedItem,
    selectedItems,
    onChange,
    isActive,
    openNodeIcon: OpenNodeIcon,
    ...rest
  } = useDropdownProps(props);

  return (
    <Dropable
      {...rest}
      offset={offset}
      disabled={disabled}
      className={styles.dropableVars}
      openNode={
        <div>
          <ToolbarButton
            id={!!id ? `${id}-opennode` : undefined}
            active={isActive}
            disabled={disabled}
            onClick={() => setTimeout(() => editor?.commands.focus(), 20)}
          >
            {OpenNodeIcon && <OpenNodeIcon />}
            <IconSelect />
          </ToolbarButton>
        </div>
      }
    >
      {items
        .filter((group) => !!group.length)
        .map((group, groupIdx) => (
          <Fragment key={group.map((el) => el.id).join('_')}>
            {groupIdx > 0 && <div className={styles.divider} />}

            {group.map((item) => (
              <DropdownItem
                {...item}
                key={item.id}
                active={selectedItems?.[item.id] || item.id === selectedItem?.id}
                disabled={item.shouldBeDisabled?.(editor!) || item.disabled || disabled}
                onClick={() => {
                  if (!!editor) item.command?.(editor.chain());
                  onChange(item.id);
                }}
              />
            ))}
          </Fragment>
        ))}
    </Dropable>
  );
};
