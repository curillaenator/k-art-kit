import styled from "styled-components";
import { BDRS } from "@k-art/shape";

const SWITCH_BDRS = BDRS[16];

const SwitchStyled = styled.button<{ checked?: boolean }>`
  position: relative;
  width: 108px;
  height: 40px;
  background-color: transparent;
  z-index: 100;
  flex: 0 0 auto;

  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.backgrounds.light};
  border-radius: calc(${SWITCH_BDRS}px * 1.25 + 3px);

  svg[data-svg-corner="true"] {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};
    --shp-bdc: ${({ theme }) => theme.backgrounds.light};
  }

  .switch-toggler {
    will-change: filter;
    overflow: visible;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 40px;
    z-index: 50;
    background-color: transparent;
    border-radius: calc(${SWITCH_BDRS}px * 1.25 + 3px);
    transition: 0.12s ease-in-out;
    transform: ${({ checked }) =>
      checked ? "translateX(100%)" : "translateX(0)"};
    filter: drop-shadow(
      ${({ theme, checked }) => (checked ? theme.shadows.primary : "none")}
    );

    &-shape {
      fill: ${({ theme, checked }) =>
        checked ? theme.primary[500] : theme.backgrounds.light};
    }

    &-title {
      transition: 0.12s linear;
      color: ${({ theme, checked }) =>
        checked ? theme.white : theme.texts.base};
    }

    &:active {
      .switch-toggler-shape {
        fill: ${({ theme, checked }) =>
          checked ? theme.primary[700] : theme.backgrounds.light};
      }

      .switch-toggler-title {
        color: ${({ theme, checked }) =>
          checked ? theme.white : theme.primary[800]};
      }
    }
  }

  &:hover {
    .switch-toggler {
      &-shape {
        fill: ${({ theme, checked }) =>
          checked ? theme.primary[300] : theme.backgrounds.light};
      }

      &-title {
        color: ${({ theme, checked }) =>
          checked ? theme.white : theme.primary[500]};
      }
    }
  }
`;

export { SwitchStyled, SWITCH_BDRS };
