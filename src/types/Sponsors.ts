import { type CSSProperties } from "react";

export interface ISponsor {
  tier: {
    name: string;
    isOneTime: boolean;
  };
  sponsorEntity: {
    __typename: string;
    login: string;
    name: string;
    avatarUrl: string;
  };
  followLink?: boolean;
  popover?: string;
  createdAt: string;
  isActive: boolean;
  imageType?: ImageType;
  lightStyle?: CSSProperties;
  darkStyle?: CSSProperties;
}

export enum ImageType {
  IMAGE = "image",
  SVG = "svg",
}
