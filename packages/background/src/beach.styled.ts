import styled from 'styled-components';

export const BeachStyled = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  transform: scale(1) translateY(-32px);

  .cloud {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 16 / 9;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .cloud-4 {
    & > img {
      transform: scale(1.04);
    }
  }

  .cloud-3 {
    & > img {
      transform: translateY(-20px) scale(1.05);
    }
  }

  .cloud-2 {
    & > img {
      transform: translateY(-48px) scale(1.1);
    }
  }

  .cloud-1 {
    & > img {
      transform: translateY(-64px) scale(1.17);
    }

    .sand {
      position: absolute;
      content: '';
      width: 100%;
      height: 256px;
      top: 100%;
      left: 0;
      transform: translateY(-20px) scale(1.17);
    }
  }
`;
