import { useEffect } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { noop } from 'lodash';

import type { UpdatePayload } from '../interfaces';

interface UseToolbarActiveCommandProps {
  // onUpdate?: (props: { editor: UpdatePayload['editor'] }) => unknown;
  onUpdate?: () => unknown;
}

const useToolbarActiveCommand = (props: UseToolbarActiveCommandProps) => {
  const { onUpdate = noop } = props;
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor) {
      editor.on('selectionUpdate', onUpdate).on('update', onUpdate);
      onUpdate({ editor });
    }

    return () => {
      editor?.off('selectionUpdate', onUpdate).off('update', onUpdate);
    };
  }, [editor, onUpdate]);
};

export { useToolbarActiveCommand };
