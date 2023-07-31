import { SVGProps } from './SVGTypes';

export interface ISupportingElement {
  src: string,
  srcDark?: string,
  sponsorUrl?: string,
  lightStyles?: SVGProps,
  darkStyles?: SVGProps,
}
