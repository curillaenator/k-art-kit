import type { JSONContent } from '@tiptap/core';
import { isNotEmptyParagraph } from './isNotEmptyParagraph';

/**
 * @description Editor's document has a semi-empty content when array of root elements doesn't contain at least one non-empty paragraph
 */
export const isContentSemiEmpty = ({ content = [] }: JSONContent): boolean => {
  const firstNonEmptyParagraph = content.find(isNotEmptyParagraph);
  return !firstNonEmptyParagraph;
};
