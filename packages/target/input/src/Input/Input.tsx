import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';

import { Typography } from '@k-art/typography';

import { InputStyled } from './input.styled';
import { InputProps } from './interfaces';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    state = 'normal',
    type = 'text',
    icon: Icon,
    name,
    description,
    value,
    limitSymbols,
    onChange,
    onFocusOut,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputButtonRef = useRef<HTMLButtonElement | null>(null);

  //@ts-expect-error
  useImperativeHandle(ref, () => (ref = inputRef.current));

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    !!inputRef.current && inputRef.current.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    inputRef.current?.blur();
    onFocusOut?.();
    setIsFocused(false);
  };

  return (
    <InputStyled
      data-input-container
      state={state}
      isIcon={!!Icon}
      tabIndex={0}
      isFocused={isFocused}
      hasValue={!!value.length}
      buttonWidth={inputButtonRef.current?.clientWidth || 0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className='input'>
        {!!Icon && <Icon />}

        <input
          {...rest}
          ref={inputRef}
          className='input-input'
          type={type}
          name={name}
          autoComplete='off'
          value={value}
          onChange={(e) => {
            if (e.target.value?.length >= (limitSymbols || Infinity)) return;
            onChange?.(e);
          }}
        />
      </div>

      {(description || limitSymbols) && (
        <div className='subinput'>
          <Typography type='TextRegular11' className='subinput-text'>
            {description || ''}
          </Typography>

          {limitSymbols && (
            <Typography type='TextRegular11' className='subinput-text'>
              {`${value.length}/${limitSymbols}`}
            </Typography>
          )}
        </div>
      )}
    </InputStyled>
  );
});

export { Input };
