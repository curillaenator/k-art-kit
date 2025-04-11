import type { JSONContent } from '@tiptap/core';

export const isNotEmptyTextContent = (v: JSONContent): boolean => v.type !== 'text' || (v.text ?? '').trim().length > 0;
