/**
 * Design Tokens - Single source of truth for all visual properties
 * These tokens enforce consistency and prevent arbitrary values
 */

// Output size presets (width x height in pixels)
export const OUTPUT_SIZES = {
  INSTAGRAM_SQUARE: { width: 1080, height: 1080, label: 'Instagram Square' },
  INSTAGRAM_STORY: { width: 1080, height: 1920, label: 'Instagram Story' },
  FACEBOOK_POST: { width: 1200, height: 630, label: 'Facebook Post' },
  TWITTER_POST: { width: 1200, height: 675, label: 'Twitter Post' },
  EMAIL_HEADER: { width: 600, height: 400, label: 'Email Header' },
  WEB_BANNER: { width: 1920, height: 600, label: 'Web Banner' },
} as const;

export type OutputSizeKey = keyof typeof OUTPUT_SIZES;

// Corner radius tokens - Based on 10% of shortest side
export const RADIUS_SCALE = {
  SMALL: 0.08,   // 8% of shortest side
  MEDIUM: 0.10,  // 10% of shortest side
  LARGE: 0.12,   // 12% of shortest side
} as const;

export type RadiusScale = keyof typeof RADIUS_SCALE;

// Maximum radius caps (in pixels)
export const RADIUS_CAPS = {
  SMALL: 40,
  MEDIUM: 60,
  LARGE: 80,
} as const;

// Brand color palette (fixed colors only)
export const BRAND_COLORS = {
  BEIGE: '#EFEBE2',
  TEAL: '#00BB8E',
  DARK_TEAL: '#004041',
  LIME_GREEN: '#8CDB1F',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;

// Spacing system (in pixels)
export const SPACING = {
  NOTCH_TO_PILL_GAP: 16,  // Constant gap between notch and pill
  TEXT_AREA_PADDING: 24,
  PILL_PADDING: 8,  // 8px padding on all sides
  ICON_TEXT_GAP: 4,  // 4px gap between icon and text
} as const;

// Typography tokens
export const TYPOGRAPHY = {
  TITLE: {
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1.3,
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontStyle: 'italic',
  },
  DESCRIPTION: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  PILL_TEXT: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.2,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
} as const;

// Shape takes 75% of height, text area takes remaining 25%
export const SHAPE_HEIGHT_RATIO = 0.75;
export const TEXT_AREA_HEIGHT_RATIO = 0.25;

// Icon set (SVG-based icons)
export const ICON_SET = {
  NONE: '',
  LOCATION_PIN: 'location-pin',
  EVENT_PIN: 'event-pin',
  CIRCLE: '●',
} as const;

export type IconKey = keyof typeof ICON_SET;

// Corner positions for notch placement
export const CORNER_POSITIONS = ['TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_RIGHT', 'BOTTOM_LEFT'] as const;
export type CornerPosition = typeof CORNER_POSITIONS[number];

// Maximum notch constraints
export const MAX_NOTCHES = 3;
