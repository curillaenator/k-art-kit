import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { Node as ExtensionNode, Editor as CoreEditor } from '@tiptap/core';

interface TocNodeItem {
  /** ProseMirrorNode */
  node: ProseMirrorNode;
  /** позиция в типтап документе */
  pos: number;
  /** обработчик для скролла к заголовку в документе */
  scrollTo?: () => void;
}

interface TocNodeConfig {
  /** заголовок для обоих представлений ТоС - aside, proseMirror node */
  title?: string;
  /** id контейнера с прокручивающимся контентом, в котором должен произойти скролл при нажатии на элемент ТоС */
  scrollContainerId?: string;
  /** длительность прокрутки */
  scrollDuration?: number;
  /** вертикальный сдвиг */
  scrollOffset?: number;
}

interface TocNodeAttributes {
  /** заголовок */
  title?: string;
  /** отображать заголовки H с указанного, 1-5 */
  minLevel: number;
  /** отображать заголовки H по указанный, 2-6 */
  maxLevel: number;
  /** технический проп, обновляя который через updateAttributes можно принуджительно перендерить PM-ноду, предполагается Date.now() */
  timestamp?: number;
}

interface ProseMirrorTocNode extends ProseMirrorNode {
  attrs: TocNodeAttributes;
}

interface TocReactNodeViewProps {
  extension: ExtensionNode<TocNodeConfig, {}>;
  node: ProseMirrorTocNode;
  editor: CoreEditor;
  selected: boolean;
  deleteNode: () => void;
  updateAttributes: (attrs: TocNodeAttributes) => void;
  getPos: () => number;
}

export type { TocNodeConfig, TocNodeAttributes, TocNodeItem, TocReactNodeViewProps };
