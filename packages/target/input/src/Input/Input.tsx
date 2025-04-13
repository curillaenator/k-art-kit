import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import cn from 'classnames';

import type { InputProps } from './interfaces';

//@ts-ignore
import styles from './input.module.scss';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { leftElement, rightElement, disabled, ...rest } = props;

  const internalRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => internalRef.current!, []);

  return (
    <div
      className={cn(styles.inputWrapper, {
        [styles.inputWrapper_db]: !!disabled,
      })}
      onClick={() => {
        internalRef.current?.focus();
      }}
    >
      {leftElement}

      <input {...rest} ref={internalRef} disabled={disabled} />

      {rightElement}
    </div>
  );
});

export { Input };
