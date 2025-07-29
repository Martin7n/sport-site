import { Complex } from "./complex.model";

export interface ComplexWithImage extends Complex {
  randomImage: string;
  likedByUser: boolean;
  likeCount: number;
};
