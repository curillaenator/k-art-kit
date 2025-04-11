import React from "react";
import cn from "classnames";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Switch } from "@k-art/input";

import styles from "./styles.module.scss";

const TaskItemView: React.FC<NodeViewProps> = ({
  node,
  editor,
  updateAttributes,
}) => {
  return (
    <NodeViewWrapper className={styles.li} data-checked={node.attrs.checked}>
      <div className={styles.container}>
        <Switch
          captions={{ checked: "Done", unchecked: "Open" }}
          checked={node.attrs.checked}
          onChange={(checked) => {
            if (!editor.isEditable) return;
            updateAttributes({ checked });
          }}
        />

        <NodeViewContent
          className={cn(styles.content, {
            [styles.content_striked]: node.attrs.checked,
          })}
          as="div"
        />
      </div>
    </NodeViewWrapper>
  );
};

export { TaskItemView };
