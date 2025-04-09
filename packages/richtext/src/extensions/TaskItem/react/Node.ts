import { ReactNodeViewRenderer } from '@tiptap/react';

import { TaskItemView } from './TaskItemView';
import { TaskItem as CoreTaskItem } from '../core/Node';
import styles from './styles.module.scss';

const TaskItem = CoreTaskItem.extend({
  addNodeView() {
    return ReactNodeViewRenderer(TaskItemView, {
      as: 'li',
      className: styles.li,
      attrs: { 'data-extension': 'taskItem' },
    });
  },
});

export { TaskItem };
