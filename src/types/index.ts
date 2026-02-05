import type { BackgroundColorId, BackgroundColorValue, IconId } from "../config/constants";

export type PillPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface Notch {
  corner: PillPosition;
  width: number;
  height: number;
}

export interface PillConfig {
  enabled: boolean;
  text: string;
  icon: IconId;
  color: BackgroundColorId;
}

export interface LogoConfig {
  enabled: boolean;
}

export interface FrameConfig {
  backgroundColor: BackgroundColorId;
  imageUrl: string;
  imageFile?: File;
  pills: {
    topLeft: PillConfig;
    bottomRight: PillConfig;
  };
  logo: LogoConfig;
  headline: string;
  subhead: string;
}

export interface GeometryCalculation {
  width: number;
  height: number;
  cornerRadius: number;
  shapeHeight: number;
  textAreaHeight: number;
}
