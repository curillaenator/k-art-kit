import React, { FC, memo, Fragment } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { Button } from '@k-art/button';
import { Dropable } from '@k-art/dropable';

import { useSelect } from '../hooks/useSelect';
import { TABLE_EDIT_ITEMS, TABLE_COLOR_ITEMS } from './table.edit';

import TableColorFill from '../svg/color-palette.svg';

import { DEFAULT_CAPTIONS } from '../../../../components/constants';

//@ts-ignore
import styles from './toolbar.module.scss';

const Toolbar: FC = memo(() => {
  const { isOpen: isBgcOpen = false, closeDropdown: closeBgc, ...bgcRest } = useSelect();

  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar_block}>
        {TABLE_EDIT_ITEMS.map(
          ({
            id,
            Icon,
            command,
            // shouldBeDisabled
          }) => {
            if (id.includes('splitter')) return <div key={id} className={styles.splitter} />;

            return (
              <Button key={id} onClick={() => command?.(editor.chain())} className={styles.button}>
                {Icon && <Icon />}
              </Button>
            );
          },
        )}
      </div>

      <div className={styles.toolbar_block}>
        <Dropable
          {...bgcRest}
          offset={[0, 4]}
          openNode={
            <div>
              <Button
                active={isBgcOpen}
                onClick={() => setTimeout(() => editor?.commands.focus(), 20)}
                className={styles.button}
              >
                <TableColorFill />
              </Button>
            </div>
          }
        >
          {[TABLE_COLOR_ITEMS]
            .filter((group) => !!group.length)
            .map((group, groupIdx) => (
              <Fragment key={group.map((el) => el.id).join('_')}>
                {groupIdx > 0 && <div className={styles.divider} />}

                {group.map(
                  ({
                    id,
                    command,
                    // Icon
                  }) => (
                    <Button
                      key={id}
                      // height={32}
                      // LeftIcon={Icon}
                      // @ts-expect-error
                      title={DEFAULT_CAPTIONS[id]}
                      onClick={() => {
                        if (!!editor) {
                          command?.(editor.chain());
                          closeBgc?.();
                        }
                      }}
                    />
                  ),
                )}
              </Fragment>
            ))}
        </Dropable>
      </div>
    </div>
  );
});

export { Toolbar };
