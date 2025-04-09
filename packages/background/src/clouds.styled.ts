import styled from 'styled-components';

export const CloudsStyled = styled.div`
  /* position: absolute;
  top: 0;
  left: 0; */
  width: 100vw;
  height: 100vh;

  .svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -54%);
    width: 128%;
    height: 128%;

    .fill {
      fill: ${({ theme }) => theme.backgrounds.light};
    }

    &_cloud1 {
      fill: ${({ theme }) => theme.primary[500]};
    }

    &_cloud2 {
      fill: ${({ theme }) => theme.primary[800]};
    }

    &_cloud3 {
      fill: ${({ theme }) => theme.primary[700]};
    }

    &_cloud4 {
      fill: ${({ theme }) => theme.primary[800]};
    }
  }
`;
