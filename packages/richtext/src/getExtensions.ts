import { Document } from '@tiptap/extension-document';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { History } from '@tiptap/extension-history';

import { TextStyle } from '@tiptap/extension-text-style';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { Strike } from '@tiptap/extension-strike';
import { Bold } from '@tiptap/extension-bold';
import { Code } from '@tiptap/extension-code';
import { Underline } from '@tiptap/extension-underline';
import { Italic } from '@tiptap/extension-italic';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';

import { TextAlign } from '@tiptap/extension-text-align';
import { Blockquote } from '@tiptap/extension-blockquote';
import { HardBreak } from '@tiptap/extension-hard-break';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { Placeholder } from '@tiptap/extension-placeholder';

import { FilterTable, TableHeader, TableCell } from './extensions/FilterTable';
import { TableRow } from '@tiptap/extension-table-row';

import { Link } from './extensions/Link';
import { LinkRoute } from './extensions/LinkRoute';
import { Highlight } from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';

import { BulletList } from '@tiptap/extension-bullet-list';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';

import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from './extensions/TaskItem';

import { Image } from './extensions/Image';

import { UniqueId } from './extensions/UniqId/UniqueId';

import { Heading } from './extensions/Heading';

import { Info } from './extensions/Info';
import { Emoji } from './extensions/Emoji';
import {
  ToC,
  // TOC_EXTENSION_NAME
} from './extensions/ToC';
import {
  DrawIO,
  getDrawioEditorURL,
  // DRAWIO_EXTENSION_NAME
} from './extensions/DrawIO';
import {
  BlocksGrid,
  BlocksGridColumn,
  // EXTENSION_NAME as GRIDS_EXTENSION_NAME
} from './extensions/BlocksGrid';

// import { Draggable } from './extensions/Draggable';
import { BackspaceDeletePreventerPlugin } from './extensions/BackspaceDelete';
// import { Indent } from './extensions/Indent';

import { all, createLowlight } from 'lowlight';

import { PLACEHOLDER_TEXT, DRAWIO_SERVICE_URL } from './constants';
import type { GetRichTextExtensionsOptions } from './interfaces';

const lowlight = createLowlight(all);

const STATIC_EXTS = [
  Document,

  Dropcursor,
  Gapcursor,
  History,

  HardBreak,
  Blockquote,
  HorizontalRule,
  Code.extend({ excludes: 'link italic bold strike underline highlight textStyle' }).configure({
    HTMLAttributes: { 'data-set': 'inline' },
  }),

  BulletList,
  OrderedList,
  ListItem,

  Superscript,
  Subscript,
  Placeholder.configure({ placeholder: ({ editor }) => (!editor.getText().length ? PLACEHOLDER_TEXT : '') }),

  Bold,
  Italic,
  Strike,
  Underline,

  Text,
  Heading,
  Paragraph,
  Color,
  TextStyle,
  TextAlign.configure({ types: ['heading', 'paragraph', 'taskList'], defaultAlignment: 'justify' }),

  TaskList,
  TaskItem,

  Image,

  Info,
  Emoji,

  Link.configure({ openOnClick: true, autolink: true }),

  FilterTable,
  TableRow,
  TableHeader,
  TableCell,

  Highlight.configure({ multicolor: true }),

  CodeBlockLowlight.configure({ lowlight }),

  DrawIO.configure({ drawIoLink: getDrawioEditorURL(DRAWIO_SERVICE_URL) }),

  BackspaceDeletePreventerPlugin,
  // Draggable.configure({ types: [DRAWIO_EXTENSION_NAME, GRIDS_EXTENSION_NAME, TOC_EXTENSION_NAME] }),
];

function getExtensions(options: GetRichTextExtensionsOptions) {
  const { internalScrollContainerId, editorContentRef, enableEditorOnChangeFn, extensionsOptions } = options;

  const exts = [...STATIC_EXTS];

  exts.push(LinkRoute.configure(extensionsOptions?.linkRoute));

  exts.push(ToC.configure({ scrollContainerId: internalScrollContainerId }));

  exts.push(BlocksGrid);
  exts.push(BlocksGridColumn.configure({ editorContentRef }));

  exts.push(UniqueId.configure({ enableEditorOnChangeFn, types: ['heading'] }));

  return exts;
}

export { getExtensions };
