import React, { FC, useEffect, useId } from 'react';
import cn from 'classnames';
import { useCurrentEditor, EditorContent } from '@tiptap/react';
import { debounce } from 'lodash';

import { Toolbar } from './components/Toolbar';
// import { TocAside, useAsideToc } from './components/TocAside';

import { TOOLBAR_HEIGHT } from './constants';

import type { RichtextContainerProps } from './interfaces';

import styles from './styles.module.scss';
import 'highlight.js/styles/base16/material-darker.min.css';

interface RichTextViewProps extends RichtextContainerProps {
  editorContentRef: React.MutableRefObject<HTMLDivElement | null>;
  internalScrollContainerId: string;
}

export const RichTextView: FC<RichTextViewProps> = (props) => {
  const {
    internalScrollContainerId,
    editorContentRef,

    disabled = false,
    editable = true,

    placeholder,

    maxHeight = 'auto',
    className,

    onEditorInstanceChange,
    onEditorContentWidthChange,
  } = props;

  const { editor } = useCurrentEditor();

  // Resize observer
  useEffect(() => {
    const editorContent = editorContentRef?.current;

    if (!editorContent) return;

    const resizeObs = new ResizeObserver(
      debounce(([entry]: ResizeObserverEntry[]) => {
        onEditorContentWidthChange?.([entry?.contentRect.width || 0, entry?.contentRect.height || 0]);
        // autoscrollCfg?.autoscroll?.();
      }, 200),
    );

    resizeObs.observe(editorContent);

    return () => {
      resizeObs.unobserve(editorContent);
    };
  }, [editorContentRef, onEditorContentWidthChange]);

  useEffect(() => {
    if (editor) onEditorInstanceChange?.(editor);
  }, [editor, onEditorInstanceChange]);

  // ToC
  // const { tableOfContent } = useAsideToc(editor, {
  //   ...tocCfg,
  //   updateTocOnChange: [...(tocCfg?.updateTocOnChange || []), initialValue],
  // });
  // const { view: tocView, setView: setTocView } = tocCfg || {};
  // const hasToc = !!tocCfg?.scrollContainerId && (tocView === 'aside' || tocView === 'popup');

  // Toolbar
  const richtextViewId = useId();
  const maxHeightWithToolbar = typeof maxHeight === 'number' ? maxHeight - TOOLBAR_HEIGHT : maxHeight;

  if (!editor) return null;

  return (
    <div
      id={richtextViewId}
      className={cn(
        //
        styles._cssv,
        styles.editor,
        styles.editor_toolbarTop,
        className,
        {
          [styles._disabled]: disabled,
          [styles.editor_isFocused]: editor?.isEditable && editor?.isFocused,
        },
      )}
    >
      <div
        id={internalScrollContainerId}
        style={{ maxHeight: editable ? maxHeightWithToolbar : maxHeight }}
        className={styles.scrollbar}
      >
        <EditorContent placeholder={placeholder} editor={editor} className={styles.content} ref={editorContentRef} />
      </div>

      {editor?.isEditable && (
        <Toolbar
          // editor={editor}
          disabled={disabled}
          richtextViewId={richtextViewId}
          editorContentRef={editorContentRef}
        />
      )}
    </div>
  );
};
