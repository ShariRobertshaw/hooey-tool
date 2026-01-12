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
 * Small sizes (≤600px): 24px margin
 * Larger sizes (>600px): 40px margin
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
      notchGap: 10, // Tighter gap for small sizes
    };
  } else {
    // Larger sizes: Instagram, Facebook, Twitter, Web Banner (all >600px)
    return {
      padding: 40,
      pillFontSize: 18,
      pillPadding: 12,
      iconSize: 18,
      titleFontSize: 28,
      descriptionFontSize: 18,
      notchGap: 12, // Tighter gap - notches hug pills closely
    };
  }
}
