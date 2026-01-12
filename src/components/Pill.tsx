/**
 * Pill Component - Rounded badge with icon and text
 * 4px gap between icon and text
 * Responsive sizing based on frame width
 */

import React from 'react';
import { SPACING, TYPOGRAPHY, BRAND_COLORS } from '../tokens/design-tokens';
import type { IconKey, BrandColor } from '../tokens/design-tokens';
import { Icon } from './Icon';

interface PillProps {
  icon: IconKey;
  text: string;
  backgroundColor: BrandColor;
  fontSize: number;
  padding: number;
  iconSize: number;
  forceWhiteText?: boolean;
}

export const Pill: React.FC<PillProps> = ({ 
  icon, 
  text, 
  backgroundColor,
  fontSize,
  padding,
  iconSize,
  forceWhiteText = false,
}) => {
  const hasIcon = icon !== 'NONE' && icon !== '';
  const textColor = forceWhiteText ? BRAND_COLORS.BEIGE : BRAND_COLORS.LIME_GREEN;
  
  // Calculate pill dimensions
  const textWidth = text.length * fontSize * 0.55; // Approximate
  const iconWidth = hasIcon ? iconSize : 0;
  const iconGap = hasIcon ? SPACING.ICON_TEXT_GAP : 0; // 4px gap
  
  // Width: padding + icon + gap (4px) + text + padding
  const pillWidth = padding * 2 + iconWidth + iconGap + textWidth;
  
  // Height: padding + text height + padding
  const pillHeight = padding * 2 + fontSize;
  
  const cornerRadius = pillHeight / 2; // Fully rounded ends
  
  return (
    <g>
      {/* Pill background */}
      <rect
        x={0}
        y={0}
        width={pillWidth}
        height={pillHeight}
        rx={cornerRadius}
        ry={cornerRadius}
        fill={BRAND_COLORS[backgroundColor]}
      />
      
      {/* Icon (if present) */}
      {hasIcon && (
        <g transform={`translate(${padding}, ${pillHeight / 2 - iconSize / 2})`}>
          <Icon icon={icon} size={iconSize} color={textColor} />
        </g>
      )}
      
      {/* Text */}
      <text
        x={padding + iconWidth + iconGap}
        y={pillHeight / 2}
        dominantBaseline="middle"
        style={{
          fontSize: fontSize,
          fontWeight: TYPOGRAPHY.PILL_TEXT.fontWeight,
          fontFamily: TYPOGRAPHY.PILL_TEXT.fontFamily,
          fill: textColor,
        }}
      >
        {text}
      </text>
    </g>
  );
};
