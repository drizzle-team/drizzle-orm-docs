import type { SVGProps } from "./SVGTypes";

type ImageSrc =
  | string
  | {
      darkThemeSrc: string;
      lightThemeSrc: string;
    };

export interface ISupportingElement {
  imageSrc: ImageSrc;
  sponsorUrl?: string;
  lightStyle?: SVGProps;
  darkStyle?: SVGProps;
}
