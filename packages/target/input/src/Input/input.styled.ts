import styled from 'styled-components';

import { InputStyledProps } from './interfaces';

const InputStyled = styled.div<InputStyledProps>`
  position: relative;
  width: 100%;

  .input {
    position: relative;
    display: flex;
    width: 100%;
    gap: 8px;
    margin-bottom: 4px;

    & > svg {
      color: ${({ theme, isFocused }) => (isFocused ? theme.primary[500] : theme.texts.base)};
      margin-top: 4px;
      flex: 0 0 auto;
    }

    &-button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    &-input {
      width: 100%;
      height: 36px;
      padding: 4px ${({ buttonWidth }) => (buttonWidth ? `${buttonWidth + 4}px` : '4px')} 8px 4px;
      transition: 0.08s ease-in-out;
      font-style: normal;
      font-variation-settings:
        'GRAD' 400,
        'wght' 500;
      letter-spacing: 0.002em;
      font-size: 14px;
      line-height: 24px;
      background: none;
      color: ${({ theme }) => theme.texts.inputColor};
      border-bottom: 1px solid
        ${({ theme, isFocused, state }) => {
          switch (true) {
            case isFocused:
              return theme.primary[700];
            case state === 'error':
              return theme.texts.error;
            default:
              return theme.borders.base;
          }
        }};

      &::placeholder {
        color: ${({ theme, state }) => {
          switch (true) {
            case state === 'error':
              return theme.texts.error;
            default:
              return theme.texts.placeholder;
          }
        }};
      }
    }
  }

  .subinput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1rem;
    padding-left: ${({ isIcon }) => (isIcon ? '40px' : 'none')};

    &-text {
      color: ${({ theme, state }) => {
        switch (true) {
          case state === 'error':
            return theme.texts.error;
          default:
            return theme.texts.placeholder;
        }
      }};
      padding: 0 4px;
    }
  }
`;

export { InputStyled };
