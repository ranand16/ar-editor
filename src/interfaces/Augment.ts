export type AugmentType = "image" | "video" | "carousel";
export interface AugmentObject {
  name: string;
  augmentType: AugmentType;
  scale: number;
  xPos: number;
  yPos: number;
  offset: string;
  zIndex: number;
  size: number | null;
  sourceURL: string | null;
  imageType: string | null;
  link: string | null;
}
