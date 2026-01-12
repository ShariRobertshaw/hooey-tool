/**
 * Responsive sizing utilities
 * Calculates sizes based on image width breakpoints
 */

export interface ResponsiveSizes {
  padding: number;
  pillFontSize: number;
  pillPadding: number;
  iconSize: number;
  titleFontSize: number;
  descriptionFontSize: number;
  notchGap: number; // Fixed gap around pill in notch
}

/**
 * Get responsive sizes based on width
 * Small sizes (≤600px): Email Header - smaller pills, tighter notch gap
 * Instagram (1080px): Larger headlines (40px)
 * Other social media: Standard headlines (28px)
 */
export function getResponsiveSizes(width: number): ResponsiveSizes {
  if (width <= 600) {
    // Small sizes: Email Header (600x400)
    return {
      padding: 24,
      pillFontSize: 14,
      pillPadding: 8,
      iconSize: 14,
      titleFontSize: 20, // Increased from 18px
      descriptionFontSize: 14,
      notchGap: 8, // Reduced gap for email
    };
  } else if (width === 1080) {
    // Instagram Square & Story (1080px width)
    // Larger headline (40px) for Instagram
    return {
      padding: 40,
      pillFontSize: 18,
      pillPadding: 12,
      iconSize: 20,
      titleFontSize: 40,
      descriptionFontSize: 18,
      notchGap: 12,
    };
  } else {
    // Other social: Facebook, Twitter, Web Banner
    return {
      padding: 40,
      pillFontSize: 18,
      pillPadding: 12,
      iconSize: 20,
      titleFontSize: 28,
      descriptionFontSize: 18,
      notchGap: 12,
    };
  }
}
