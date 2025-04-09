import React, { FC } from "react";

import { Shape, Corners } from "@k-art/shape";
import { Typography } from "@k-art/typography";

import { SwitchStyled, SWITCH_BDRS } from "./switch.styled";
import { SwitchProps } from "./interfaces";

const Switch: FC<SwitchProps> = (props) => {
  const {
    checked,
    captions = { checked: "On", unchecked: "Off" },
    onChange,
    onClick,
    ...rest
  } = props;
  const { checked: checkedVal, unchecked: uncheckedVal } = captions;

  return (
    <SwitchStyled
      {...rest}
      contentEditable={false}
      checked={checked}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
        onClick?.(e);
      }}
    >
      <Corners borderRadius={SWITCH_BDRS} stroke={1} />

      <div className="switch-toggler">
        <Shape className="switch-toggler-shape" borderRadius={13.3} />

        <Typography type="RoundedBold14" className="switch-toggler-title">
          {checked ? checkedVal : uncheckedVal}
        </Typography>
      </div>
    </SwitchStyled>
  );
};

export { Switch };
