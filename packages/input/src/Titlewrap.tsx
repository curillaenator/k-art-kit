import React, { FC, PropsWithChildren } from "react";
import cn from "classnames";
import styled from "styled-components";

import { Typography, type ITypographyTypes } from "@k-art/typography";

const TitlewrapStyled = styled.div`
  width: 100%;
  min-width: 356px;

  .titlewrap-title {
    margin-bottom: 16px;
  }

  .titlewrap-children {
    padding-left: 16px;
  }
`;

interface ITitlewrap extends PropsWithChildren {
  title: string;
  titleColor?: string;
  titleType?: ITypographyTypes;
  noOffset?: boolean;
  className?: string;
}

export const Titlewrap: FC<ITitlewrap> = (props) => {
  const {
    title,
    titleType = "RoundedBold20",
    children,
    noOffset = false,
    titleColor,
    className,
  } = props;

  return (
    <TitlewrapStyled className={className || "titlewrap"}>
      <Typography
        as="h2"
        type={titleType}
        className="titlewrap-title"
        color={titleColor || "inherit"}
      >
        {title}
      </Typography>

      <div className={cn({ "titlewrap-children": !noOffset })}>{children}</div>
    </TitlewrapStyled>
  );
};
