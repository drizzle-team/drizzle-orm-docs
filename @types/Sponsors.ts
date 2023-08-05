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
  createdAt: string;
  isActive: boolean;
  imageType?: ImageType;
}

export enum ImageType {
  IMAGE = 'image',
  SVG = 'svg',
}
