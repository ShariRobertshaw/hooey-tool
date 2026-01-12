/**
 * Responsive sizing utilities
 * Calculates sizes based on image width breakpoints
 */

export interface ResponsiveSizes {
  padding: number;
  pillFontSize: number;
  pillPadding: number;
  iconSize: number;
}

/**
 * Get responsive sizes based on width
 */
export function getResponsiveSizes(width: number): ResponsiveSizes {
  if (width <= 600) {
    return {
      padding: 24,
      pillFontSize: 14,
      pillPadding: 8,
      iconSize: 14,
    };
  } else if (width <= 900) {
    return {
      padding: 32,
      pillFontSize: 16,
      pillPadding: 10,
      iconSize: 16,
    };
  } else {
    // 1400px and under (and above)
    return {
      padding: 40,
      pillFontSize: 18,
      pillPadding: 12,
      iconSize: 18,
    };
  }
}
