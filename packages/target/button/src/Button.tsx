import React, { FC, ElementType } from 'react';
import cn from 'classnames';

import { ButtonProps } from './interfaces';

//@ts-ignore
import styles from './button.module.scss';

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    size = 'medium',
    appearance = 'secondary',
    component,
    href,
    fullwidth,
    centered,
    active,
    type = 'button',
    ...rest
  } = props;

  const Component = component ? component : ('button' as ElementType);
  const compProps = component ? { href } : { type };

  return (
    <Component
      {...rest}
      {...compProps}
      className={cn(styles.button, styles[`button_${size}`], styles[`button_${appearance}`], {
        [styles.button_fullwidth]: !!fullwidth,
        [styles.button_centered]: !!centered,
        [styles.button_active]: !!active,
      })}
    >
      {children}
    </Component>
  );
};

export { Button };
