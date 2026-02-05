export const CANVAS_SIZE = 1080;
export const SHAPE_HEIGHT_RATIO = 0.75;
export const CANVAS_PADDING = 40;
export const TEXT_AREA_PADDING = 24;
export const SHAPE_TEXT_GAP = 24;

export const BACKGROUND_COLORS = [
  { id: "DARK_TEAL", value: "#004041" },
  { id: "BEIGE", value: "#EFEBE2" },
  { id: "TEAL", value: "#00BB8E" },
  { id: "MINT", value: "#CBEB9F" },
  { id: "SEAFOAM", value: "#BFEBE1" },
] as const;

export type BackgroundColorId = (typeof BACKGROUND_COLORS)[number]["id"];
export type BackgroundColorValue = (typeof BACKGROUND_COLORS)[number]["value"];

export const BACKGROUND_COLOR_MAP = BACKGROUND_COLORS.reduce(
  (acc, color) => {
    acc[color.id] = color.value;
    return acc;
  },
  {} as Record<BackgroundColorId, BackgroundColorValue>
);

export const ICON_OPTIONS = [
  { id: "NONE", label: "None" },
  { id: "EVENT_PIN", label: "Event pin" },
  { id: "LOCATION_PIN", label: "Location pin" },
] as const;

export type IconId = (typeof ICON_OPTIONS)[number]["id"];

export const PILL_RULES = {
  fontSize: 28,
  padding: 12,
  iconSize: 28,
  iconGap: 4,
  notchGap: 34,
  height: 54,
} as const;

export const HEADLINE_RULES = {
  baseSize: 48,
  minSize: 34,
  lineHeight: 54,
  maxLines: 2,
  maxChars: 113,
} as const;

export const SUBHEAD_RULES = {
  baseSize: 28,
  minSize: 22,
  lineHeight: 34,
  maxLines: 2,
  maxChars: 178,
} as const;

export const LOGO_RULES = {
  height: 42,
  width: 131,
} as const;
