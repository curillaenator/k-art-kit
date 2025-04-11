import React, { ElementType, FC, useMemo } from "react";
import { animated } from "react-spring";
import cn from "classnames";

import { Corners, BDRS } from "@k-art/shape";

import { DropableContext } from "./context";
import { _BaseMenuProps } from "./interfaces";

//@ts-expect-error
import styles from "./dropable.module.scss";

export const DropableMenu: FC<_BaseMenuProps> = (props) => {
  const {
    attrs,
    instance,
    maxWidth,
    minWidth,
    maxHeight,
    animationStyle,
    closeOnItemClick = false,
    closeDropdown,
    corners = { borderRadius: BDRS[16], stroke: 1 },
    headless,
    children,
  } = props;

  // меню вынесено в отдельный компонент ради мемоизации контекста, так как напрямую хук не вызвать в колбеке
  const contextValue = useMemo(
    () => ({
      closeOnItemClick,
      closeDropdown: closeDropdown || instance?.hide,
    }),
    [closeOnItemClick, closeDropdown, instance]
  );

  const Component = animationStyle ? animated.div : ("div" as ElementType);

  return (
    <Component
      {...attrs}
      className={cn(styles.content, {
        [styles.content_styled]: !headless,
      })}
      style={{
        "--dropable-content-bdrs": `${corners.borderRadius}px`,
        ...animationStyle,
        //
        minWidth,
        maxWidth,
        maxHeight,
      }}
    >
      {!headless && <Corners {...corners} />}

      <DropableContext.Provider value={contextValue}>
        {children}
      </DropableContext.Provider>
    </Component>
  );
};
