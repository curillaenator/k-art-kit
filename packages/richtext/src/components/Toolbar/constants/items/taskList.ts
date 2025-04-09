import TasklistIcon from '../svg/tasklist.svg';

import type { ToolbarItemProps } from '../interfaces';

const TASK_LIST_ITEMS: ToolbarItemProps[] = [
  {
    id: 'checkbox',
    Icon: TasklistIcon,
    command: (chain) => chain.focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive('taskList'),
  },
];

export { TASK_LIST_ITEMS };
