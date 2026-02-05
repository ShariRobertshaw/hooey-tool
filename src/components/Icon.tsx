/**
 * Icon Component - Renders SVG icons for pills
 */

import React from "react";
import type { IconId } from "../config/constants";

interface IconProps {
  icon: IconId;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size = 20, color = "#8CDB1F" }) => {
  if (icon === "NONE") {
    return null;
  }

  // Location pin icon
  if (icon === "LOCATION_PIN") {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="1.3762" stroke={color} strokeWidth="1.24761"/>
        <circle cx="14" cy="14" r="5.3762" stroke={color} strokeWidth="1.24761"/>
      </svg>
    );
  }

  // Event pin icon (location pin with target)
  if (icon === "EVENT_PIN") {
    return (
      <svg width={size} height={size * 1.2} viewBox="0 0 28 34" fill="none">
        <circle cx="14" cy="11.5" r="1.45541" stroke={color} strokeWidth="1.24761"/>
        <path 
          d="M14 7.624C16.105 7.624 17.951 9.3361 17.9512 11.3662C17.9512 11.8228 17.713 12.5943 17.2754 13.5762C16.851 14.5285 16.2817 15.5891 15.708 16.5869C15.1355 17.5828 14.5644 18.5055 14.1416 19.1826C14.0925 19.2613 14.0452 19.3369 14 19.4092C13.9548 19.3369 13.9075 19.2613 13.8584 19.1826C13.4357 18.5055 12.8655 17.5827 12.293 16.5869C11.7193 15.589 11.1491 14.5285 10.7246 13.5762C10.287 12.5943 10.0498 11.8228 10.0498 11.3662C10.05 9.3362 11.8952 7.6242 14 7.624Z" 
          stroke={color} 
          strokeWidth="1.24761"
        />
      </svg>
    );
  }

  return null;
};
