import styled from 'styled-components';

export const CornersContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  & > svg {
    display: block;
    position: absolute;
    top: var(--shp-top);
    left: var(--shp-left);
    transform: var(--shp-transform);
    transform-origin: center;
  }

  .corner-tl {
    --shp-top: 0;
    --shp-left: 0;
    --shp-transform: rotate(0deg) translate(0, 0);
  }

  .corner-tr {
    --shp-top: 0;
    --shp-left: 100%;
    --shp-transform: rotate(90deg) translate(0, 100%);
  }

  .corner-br {
    --shp-top: 100%;
    --shp-left: 100%;
    --shp-transform: rotate(180deg) translate(100%, 100%);
  }

  .corner-bl {
    --shp-top: 100%;
    --shp-left: 0;
    --shp-transform: rotate(270deg) translate(100%, 0);
  }
`;
