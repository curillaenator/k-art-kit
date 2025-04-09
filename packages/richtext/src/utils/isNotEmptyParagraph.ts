import type { JSONContent } from '@tiptap/core';
import { isNotEmptyTextContent } from './isNotEmptyTextContent';

export const isNotEmptyParagraph = (v: JSONContent): boolean => {
  //?? if it's not paragraph block, then it's not empty
  if (v.type !== 'paragraph') return true;

  //?? if a paragraph has a content, and this content has anything except for spaces, then it is not an empty paragraph
  if (v.type === 'paragraph' && v.content) return Boolean(v.content.find(isNotEmptyTextContent));

  //?? it's an empty paragraph, alright
  return false;
};
