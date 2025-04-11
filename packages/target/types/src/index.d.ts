import "styled-components";
import type { LaunchColors } from "@k-art/theme";

declare module "styled-components" {
  export interface DefaultTheme extends LaunchColors {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.png" {
  const path: string;
  export default path;
}

declare module "*.jpg" {
  const path: string;
  export default path;
}
