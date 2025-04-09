import React, { FC } from "react";
import { useClickHandler } from "@k-art/dropable";

import { ToolbarButton } from "../ToolbarButton";

import type { ToolbarItemProps } from "../Toolbar";
import styles from "./dropdown.module.scss";

export const DropdownItem: FC<ToolbarItemProps> = (props) => {
  const { id, closeOnClick, onClick, active, disabled, Icon, caption } = props;
  const { clickHandler } = useClickHandler(
    () => onClick?.(props),
    closeOnClick
  );

  return (
    <ToolbarButton
      data-itemid={id}
      active={active}
      disabled={disabled}
      onClick={clickHandler}
      fullwidth
    >
      {Icon && <Icon />}
      <div className={styles.itemCaption}>{caption}</div>
    </ToolbarButton>
  );
};
