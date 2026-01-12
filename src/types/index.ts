import type { OutputSizeKey, RadiusScale, BrandColor, CornerPosition, IconKey } from '../tokens/design-tokens';

export type FillType = 'solid' | 'image';

export interface SolidFill {
  type: 'solid';
  color: BrandColor;
}

export interface ImageFill {
  type: 'image';
  imageUrl: string;
  imageFile?: File;
}

export type Fill = SolidFill | ImageFill;

export interface Notch {
  corner: CornerPosition;
  id: string;
  width: number;
  height: number;
}

export type PillPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface PillConfig {
  id: string;
  icon: IconKey;
  text: string;
  visible: boolean;
  position: PillPosition;
  backgroundColor: BrandColor;
}

export interface TextContent {
  title: string;
  description: string;
}

export interface FrameConfig {
  // Output settings
  outputSize: OutputSizeKey;
  
  // Background color (behind everything)
  backgroundColor: BrandColor;
  
  // Base frame (radius is auto-calculated at 10% of height)
  fill: Fill;
  
  // Notches (max 3, corners only)
  notches: Notch[];
  
  // Pill components (multiple pills)
  pills: PillConfig[];
  
  // Text area
  textContent: TextContent;
}

export interface GeometryCalculation {
  width: number;
  height: number;
  cornerRadius: number;
  shortestSide: number;
  textAreaHeight: number;
}
