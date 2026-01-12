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
 * Larger sizes (>600px): Social media - larger pills (28px type)
 */
export function getResponsiveSizes(width: number): ResponsiveSizes {
  if (width <= 600) {
    // Small sizes: Email Header (600x400)
    return {
      padding: 24,
      pillFontSize: 14,
      pillPadding: 8,
      iconSize: 14,
      titleFontSize: 18,
      descriptionFontSize: 14,
      notchGap: 8, // Reduced gap for email
    };
  } else {
    // Larger sizes: Instagram, Facebook, Twitter, Web Banner (all >600px)
    // Pills use 28px type with 12px padding
    return {
      padding: 40,
      pillFontSize: 28,
      pillPadding: 12,
      iconSize: 28,
      titleFontSize: 28,
      descriptionFontSize: 18,
      notchGap: 12,
    };
  }
}
