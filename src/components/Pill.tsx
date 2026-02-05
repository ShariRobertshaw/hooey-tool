/**
 * Pill Component - Rounded badge with icon and text
 * 4px gap between icon and text
 * Responsive sizing based on frame width
 */

import React from "react";
import { BACKGROUND_COLOR_MAP, IconId } from "../config/constants";
import { Icon } from "./Icon";

interface PillProps {
  icon: IconId;
  text: string;
  colorId: keyof typeof BACKGROUND_COLOR_MAP;
  fontSize: number;
  padding: number;
  width: number;
  height: number;
  iconSize: number;
  iconGap: number;
  forceWhiteText?: boolean;
}

export const Pill: React.FC<PillProps> = ({
  icon,
  text,
  colorId,
  fontSize,
  padding,
  width,
  height,
  iconSize,
  iconGap,
  forceWhiteText = false,
}) => {
  const hasIcon = icon !== "NONE";
  const textColor = forceWhiteText ? "#FFFFFF" : "#8CDB1F";
  
  const iconWidth = hasIcon ? iconSize : 0;
  const gap = hasIcon ? iconGap : 0;

  const cornerRadius = height / 2; // Fully rounded ends
  
  return (
    <g>
      {/* Pill background */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={cornerRadius}
        ry={cornerRadius}
        fill={BACKGROUND_COLOR_MAP[colorId]}
      />
      
      {/* Icon (if present) */}
      {hasIcon && (
        <g transform={`translate(${padding}, ${height / 2 - iconSize / 2})`}>
          <Icon icon={icon} size={iconSize} color={textColor} />
        </g>
      )}
      
      {/* Text */}
      <text
        x={padding + iconWidth + gap}
        y={height / 2}
        dominantBaseline="middle"
        style={{
          fontSize: fontSize,
          fontWeight: 600,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fill: textColor,
        }}
      >
        {text}
      </text>
    </g>
  );
};
