/**
 * Geometry Engine - Centralized calculation logic for all shape rules
 * All dimensions are computed deterministically from design tokens
 */

import {
  OUTPUT_SIZES,
  SHAPE_HEIGHT_RATIO,
  SPACING,
} from '../tokens/design-tokens';
import type { FrameConfig, GeometryCalculation, Notch } from '../types';

/**
 * Calculate corner radius - Fixed at 10% of shape height
 */
export function calculateCornerRadius(
  width: number,
  shapeHeight: number
): number {
  return shapeHeight * 0.10; // 10% of shape height
}

/**
 * Calculate all geometric properties for a frame
 */
export function calculateGeometry(config: FrameConfig): GeometryCalculation {
  const size = OUTPUT_SIZES[config.outputSize];
  const { width, height } = size;
  const shapeHeight = height * SHAPE_HEIGHT_RATIO;
  const shortestSide = Math.min(width, shapeHeight);
  const cornerRadius = calculateCornerRadius(width, shapeHeight);
  const textAreaHeight = height * (1 - SHAPE_HEIGHT_RATIO);
  
  return {
    width,
    height,
    cornerRadius,
    shortestSide,
    textAreaHeight,
  };
}

/**
 * Get notch corner radius - same as main corner radius
 * Padding is calculated to ensure notches are always large enough
 */
function getNotchCornerRadius(notch: Notch, mainRadius: number): number {
  // All corners use the same radius (10% of height)
  return mainRadius;
}

/**
 * Generate the complete frame path with rectangular notch cutouts
 * Notch corner radii adjust to fit notch size (try to match main corners)
 */
export function generateFramePath(
  width: number,
  height: number,
  radius: number,
  notches: Notch[]
): string {
  const r = radius;
  
  // Find notches by position (use actual calculated sizes)
  const tlNotch = notches.find(n => n.corner === 'TOP_LEFT');
  const trNotch = notches.find(n => n.corner === 'TOP_RIGHT');
  const brNotch = notches.find(n => n.corner === 'BOTTOM_RIGHT');
  const blNotch = notches.find(n => n.corner === 'BOTTOM_LEFT');
  
  // Calculate appropriate corner radius for each notch
  const nrTL = tlNotch ? getNotchCornerRadius(tlNotch, r) : 0;
  const nrTR = trNotch ? getNotchCornerRadius(trNotch, r) : 0;
  const nrBR = brNotch ? getNotchCornerRadius(brNotch, r) : 0;
  const nrBL = blNotch ? getNotchCornerRadius(blNotch, r) : 0;
  
  let path = [];
  
  // Start at top-left
  if (tlNotch) {
    path.push(`M ${tlNotch.width} 0`);
  } else {
    path.push(`M ${r} 0`);
  }
  
  // === TOP EDGE ===
  if (trNotch) {
    // Go to start of top-right notch
    path.push(`L ${width - trNotch.width - nrTR} 0`);
    // Enter notch (curve down)
    path.push(`Q ${width - trNotch.width} 0 ${width - trNotch.width} ${nrTR}`);
    // Down inside notch
    path.push(`L ${width - trNotch.width} ${trNotch.height - nrTR}`);
    // Exit notch (curve right and out)
    path.push(`Q ${width - trNotch.width} ${trNotch.height} ${width - trNotch.width + nrTR} ${trNotch.height}`);
    // Continue to top-right corner of main frame
    path.push(`L ${width - r} ${trNotch.height}`);
    // Main frame corner
    path.push(`Q ${width} ${trNotch.height} ${width} ${trNotch.height + r}`);
  } else {
    // Normal top-right corner
    path.push(`L ${width - r} 0`);
    path.push(`Q ${width} 0 ${width} ${r}`);
  }
  
  // === RIGHT EDGE ===
  if (brNotch) {
    // Go down to bottom-right notch
    path.push(`L ${width} ${height - brNotch.height - r}`);
    // Main frame corner before notch
    path.push(`Q ${width} ${height - brNotch.height} ${width - r} ${height - brNotch.height}`);
    // Enter notch (curve left)
    path.push(`L ${width - brNotch.width + nrBR} ${height - brNotch.height}`);
    path.push(`Q ${width - brNotch.width} ${height - brNotch.height} ${width - brNotch.width} ${height - brNotch.height + nrBR}`);
    // Down inside notch
    path.push(`L ${width - brNotch.width} ${height - nrBR}`);
    // Exit notch (curve down and left)
    path.push(`Q ${width - brNotch.width} ${height} ${width - brNotch.width - nrBR} ${height}`);
  } else {
    // Normal bottom-right corner
    path.push(`L ${width} ${height - r}`);
    path.push(`Q ${width} ${height} ${width - r} ${height}`);
  }
  
  // === BOTTOM EDGE ===
  if (blNotch) {
    // Go left to bottom-left notch
    path.push(`L ${blNotch.width + nrBL} ${height}`);
    // Enter notch (curve up)
    path.push(`Q ${blNotch.width} ${height} ${blNotch.width} ${height - nrBL}`);
    // Up inside notch
    path.push(`L ${blNotch.width} ${height - blNotch.height + nrBL}`);
    // Exit notch (curve left and out)
    path.push(`Q ${blNotch.width} ${height - blNotch.height} ${blNotch.width - nrBL} ${height - blNotch.height}`);
    // Continue to bottom-left corner of main frame
    path.push(`L ${r} ${height - blNotch.height}`);
    // Main frame corner
    path.push(`Q 0 ${height - blNotch.height} 0 ${height - blNotch.height - r}`);
  } else {
    // Normal bottom-left corner
    path.push(`L ${r} ${height}`);
    path.push(`Q 0 ${height} 0 ${height - r}`);
  }
  
  // === LEFT EDGE ===
  if (tlNotch) {
    // Go up to top-left notch
    path.push(`L 0 ${tlNotch.height + r}`);
    // Main frame corner before notch
    path.push(`Q 0 ${tlNotch.height} ${r} ${tlNotch.height}`);
    // Enter notch (curve right)
    path.push(`L ${tlNotch.width - nrTL} ${tlNotch.height}`);
    path.push(`Q ${tlNotch.width} ${tlNotch.height} ${tlNotch.width} ${tlNotch.height - nrTL}`);
    // Up inside notch
    path.push(`L ${tlNotch.width} ${nrTL}`);
    // Exit notch (curve up and right)
    path.push(`Q ${tlNotch.width} 0 ${tlNotch.width + nrTL} 0`);
  } else {
    // Normal top-left corner
    path.push(`L 0 ${r}`);
    path.push(`Q 0 0 ${r} 0`);
  }
  
  path.push('Z');
  
  return path.join(' ');
}

/**
 * Validate notch configuration
 */
export function validateNotches(notches: Notch[]): boolean {
  if (notches.length > 3) return false;
  
  // Check for duplicates
  const corners = notches.map(n => n.corner);
  const uniqueCorners = new Set(corners);
  if (uniqueCorners.size !== corners.length) return false;
  
  return true;
}

/**
 * Calculate notch dimensions based on pill content
 * Notch should have equal padding around the pill
 */
export function calculateNotchDimensions(
  pillWidth: number,
  pillHeight: number,
  padding: number = 16
): { width: number; height: number } {
  return {
    width: pillWidth + padding * 2,
    height: pillHeight + padding * 2,
  };
}

/**
 * Calculate pill position - pills sit INSIDE notches with equal padding
 */
export function calculatePillPositionInNotch(
  padding: number = 16
): { x: number; y: number } {
  return {
    x: padding,
    y: padding,
  };
}

/**
 * Calculate text area position and dimensions
 */
export function calculateTextAreaDimensions(
  width: number,
  height: number,
  textAreaHeight: number
): { x: number; y: number; width: number; height: number } {
  const padding = SPACING.TEXT_AREA_PADDING;
  
  return {
    x: padding,
    y: height - textAreaHeight,
    width: width - padding * 2,
    height: textAreaHeight - padding,
  };
}
