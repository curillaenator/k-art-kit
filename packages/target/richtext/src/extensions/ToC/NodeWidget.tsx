import React, { FC, useCallback, useState, useEffect } from 'react';
import { Editor as CoreEditor } from '@tiptap/core';
import { NodeViewWrapper } from '@tiptap/react';
import { scroller } from 'react-scroll';
import { debounce } from 'lodash';
import cn from 'classnames';

import type { Transaction } from '@tiptap/pm/state';
import type { ReplaceStep } from '@tiptap/pm/transform';

import { Button } from '@k-art/button';

// import { getHeadingScrollHash } from '../Heading';
import {
  DeleteIcon,
  CarretDownIcon,
  // LinkIcon
} from './icons';

import { TOC_MAX_TITLE_LENGTH } from './constants';
import type { TocReactNodeViewProps, TocNodeAttributes, TocNodeItem } from './interfaces';
import styles from './toc.module.scss';

const TocNodeWidget: FC<TocReactNodeViewProps> = (props) => {
  const { editor, node, updateAttributes, extension, deleteNode } = props;
  const { attrs } = node;
  const { timestamp } = attrs;

  const [tocItems, setTocItems] = useState<TocNodeItem[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calcTocItems = useCallback(
    debounce((ed: CoreEditor, nodeAttrs: TocNodeAttributes) => {
      const toc: TocNodeItem[] = [];
      const { maxLevel, minLevel } = nodeAttrs;

      ed.state.doc.descendants((descNode, descPos) => {
        // const isHeadingElement = descNode.type.name === 'heading' && !!descNode.attrs['id'];
        const isHeadingElement = descNode.type.name === 'heading';

        if (!isHeadingElement) return;

        const isInRange = descNode.attrs['level'] >= minLevel && descNode.attrs['level'] <= maxLevel;
        if (!isInRange) return;

        toc.push({ node: descNode, pos: descPos });
      });

      setTocItems(toc);
    }, 200),
    [],
  );

  useEffect(() => calcTocItems(editor, attrs), [editor, attrs, calcTocItems, timestamp]);

  const scrollOpts = {
    smooth: true,
    containerId: extension.options.scrollContainerId,
    offset: extension.options.scrollOffset,
    duration: extension.options.scrollDuration,
  };

  useEffect(() => {
    const onTransaction = ({ transaction: tr }: { editor: CoreEditor; transaction: Transaction }) => {
      if (!tr.steps.some((st) => (st as ReplaceStep & { structure: boolean })?.structure)) return;
      updateAttributes({ ...attrs, timestamp: Date.now() });
    };

    editor.on('transaction', onTransaction);

    return () => {
      editor.off('transaction', onTransaction);
    };
  }, [editor, attrs, updateAttributes]);

  return (
    <NodeViewWrapper as='nav' className={styles.toctainer}>
      <div className={styles.tochead}>
        <input
          readOnly={!editor.isEditable}
          className={styles.tocTitleInput}
          value={node.attrs.title}
          type='text'
          onChange={(e) => {
            if (e.target.value.length >= TOC_MAX_TITLE_LENGTH) return;
            updateAttributes({ ...attrs, title: e.target.value });
          }}
        />

        {editor.isEditable && (
          <div className={styles.tocbar}>
            <Button
              onClick={() => setCollapsed((prev) => !prev)}
              className={cn(styles.carretLeft, {
                [styles.carretLeft_collapsed]: collapsed,
              })}
            >
              <CarretDownIcon />
            </Button>

            <Button onClick={() => deleteNode()}>
              <DeleteIcon />
            </Button>
          </div>
        )}
      </div>

      {!collapsed && (
        <ul className={styles.toclist}>
          {tocItems.map(({ node: { attrs: headingAttrs, textContent: headingContent }, pos: headingPos }) => (
            <li
              key={`toc-li-${headingAttrs['id']}-${headingPos || ''}`}
              className={cn(
                styles.tocitem,
                styles[`tocitem_level${(headingAttrs['level'] || 1) - attrs['minLevel']}`],
                {
                  [styles.tocitem_invisible]: (headingAttrs['level'] || 1) - attrs['minLevel'] < 0,
                },
              )}
            >
              <span
                className={styles.tocitemCaption}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const skip =
                    !headingAttrs['id'] ||
                    !extension.options.scrollContainerId ||
                    !document.getElementById(extension.options.scrollContainerId);

                  if (!skip) scroller.scrollTo(headingAttrs['id'], scrollOpts);
                }}
              >
                {headingContent}
              </span>

              {/* <ButtonGhost
                LeftIcon={LinkIcon}
                height={24}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  const url = new URL(window.location.href);
                  url.hash = getHeadingScrollHash(headingContent, headingAttrs['id']);
                  navigator.clipboard.writeText(url.href);
                }}
              /> */}
            </li>
          ))}
        </ul>
      )}
    </NodeViewWrapper>
  );
};

export { TocNodeWidget };
