/**
 * FlowFrame - The main shape component
 * Renders the frame with fill, notches, pills, and text below
 */

import React, { useRef, useEffect, useState } from 'react';
import { BRAND_COLORS, SPACING, TYPOGRAPHY, SHAPE_HEIGHT_RATIO } from '../tokens/design-tokens';
import type { FrameConfig, PillConfig, Notch } from '../types';
import {
  calculateGeometry,
  generateFramePath,
  calculateNotchDimensions,
} from '../utils/geometry';
import { getResponsiveSizes } from '../utils/responsive';
import { Pill } from './Pill';

interface FlowFrameProps {
  config: FrameConfig;
  onExportReady?: (element: HTMLDivElement) => void;
}

// Notch padding is now calculated based on responsive sizes

export const FlowFrame: React.FC<FlowFrameProps> = ({ config, onExportReady }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, SVGGElement>>(new Map());
  const [pillDimensions, setPillDimensions] = useState<Map<string, { width: number; height: number }>>(new Map());
  const [notchesWithSizes, setNotchesWithSizes] = useState<Notch[]>(config.notches);

  const geometry = calculateGeometry(config);
  const { width, height, cornerRadius } = geometry;
  
  // Get responsive sizes based on width
  const responsiveSizes = getResponsiveSizes(width);
  const padding = responsiveSizes.padding;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  
  // Shape takes 75% of inner height
  const shapeHeight = innerHeight * SHAPE_HEIGHT_RATIO;
  const textAreaHeight = innerHeight - shapeHeight;

  // Measure pill dimensions and update notch sizes
  useEffect(() => {
    const newDimensions = new Map<string, { width: number; height: number }>();
    
    pillRefs.current.forEach((ref, pillId) => {
      if (ref) {
        try {
          const bbox = ref.getBBox();
          newDimensions.set(pillId, { width: bbox.width, height: bbox.height });
        } catch (e) {
          // BBox not available yet
        }
      }
    });
    
    setPillDimensions(newDimensions);
    
    // Update notches with calculated sizes based on pill dimensions
    const updatedNotches = config.notches.map(notch => {
      // Find pill that should sit in this notch
      const pill = config.pills.find(p => {
        const pillCorner = p.position.toUpperCase().replace('-', '_');
        return pillCorner === notch.corner;
      });
      
      if (pill && pillDimensions.has(pill.id)) {
        const dims = pillDimensions.get(pill.id)!;
        
        // Calculate gap: no more than 75% of pill height
        const maxGap = dims.height * 0.75;
        
        // Ensure notch is large enough for corner radius
        // Notch dimension must be >= 2 × corner radius for proper geometry
        const minNotchSize = cornerRadius * 2;
        const minGapForRadius = (minNotchSize - dims.height) / 2;
        
        // Use the larger of the two constraints
        const gap = Math.max(maxGap, minGapForRadius);
        
        const notchDims = calculateNotchDimensions(dims.width, dims.height, gap);
        return {
          ...notch,
          width: notchDims.width,
          height: notchDims.height,
        };
      }
      
      // Default size if no pill
      return {
        ...notch,
        width: notch.width || 260,
        height: notch.height || 80,
      };
    });
    
    setNotchesWithSizes(updatedNotches);
  }, [config.pills, config.notches, pillDimensions.size]);

  // Generate frame path with dynamically sized notches (using inner width)
  const framePath = generateFramePath(innerWidth, shapeHeight, cornerRadius, notchesWithSizes);

  // Calculate pill positions - pills sit INSIDE notches with equal padding
  const getPillPosition = (pill: PillConfig) => {
    const notch = notchesWithSizes.find(n => n.corner === pill.position.toUpperCase().replace('-', '_'));
    
    if (!notch) {
      // No notch, position normally with gap
      const gap = SPACING.NOTCH_TO_PILL_GAP;
      switch (pill.position) {
        case 'top-left':
          return { x: gap, y: gap };
        case 'top-right':
          return { x: innerWidth - 200 - gap, y: gap };
        case 'bottom-left':
          return { x: gap, y: shapeHeight - 60 - gap };
        case 'bottom-right':
          return { x: innerWidth - 200 - gap, y: shapeHeight - 60 - gap };
        default:
          return { x: gap, y: gap };
      }
    }
    
    // Calculate gap based on the notch size (it's centered)
    const pillDims = pillDimensions.get(pill.id);
    if (!pillDims) {
      return { x: 16, y: 16 }; // Fallback
    }
    
    const gapX = (notch.width - pillDims.width) / 2;
    const gapY = (notch.height - pillDims.height) / 2;
    
    switch (pill.position) {
      case 'top-left':
        return { x: gapX, y: gapY };
      case 'top-right':
        return { x: innerWidth - notch.width + gapX, y: gapY };
      case 'bottom-left':
        return { x: gapX, y: shapeHeight - notch.height + gapY };
      case 'bottom-right':
        return { x: innerWidth - notch.width + gapX, y: shapeHeight - notch.height + gapY };
      default:
        return { x: gapX, y: gapY };
    }
  };

  // Get fill properties
  const getFillElement = () => {
    if (config.fill.type === 'solid') {
      return <path d={framePath} fill={BRAND_COLORS[config.fill.color]} />;
    } else {
      // Image fill with clipping
      return (
        <>
          <defs>
            <clipPath id="frame-clip">
              <path d={framePath} />
            </clipPath>
          </defs>
          <image
            href={config.fill.imageUrl}
            width={innerWidth}
            height={shapeHeight}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#frame-clip)"
          />
        </>
      );
    }
  };

  // Determine text color based on background
  const textColor = ['WHITE', 'BEIGE'].includes(config.backgroundColor)
    ? BRAND_COLORS.BLACK
    : BRAND_COLORS.WHITE;

  // Expose ref for export
  useEffect(() => {
    if (frameRef.current && onExportReady) {
      onExportReady(frameRef.current);
    }
  }, [onExportReady]);

  return (
    <div
      ref={frameRef}
      style={{
        width,
        height,
        position: 'relative',
        backgroundColor: BRAND_COLORS[config.backgroundColor],
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      {/* Shape with pills (75% height) */}
      <svg
        width={innerWidth}
        height={shapeHeight}
        viewBox={`0 0 ${innerWidth} ${shapeHeight}`}
        style={{ display: 'block' }}
      >
        {/* Frame with fill */}
        {getFillElement()}

        {/* Pills */}
        {config.pills.map((pill) => {
          if (!pill.visible) return null;
          
          const position = getPillPosition(pill);
          
          return (
            <g 
              key={pill.id} 
              ref={(el) => {
                if (el) {
                  pillRefs.current.set(pill.id, el);
                }
              }}
              transform={`translate(${position.x}, ${position.y})`}
            >
              <Pill
                icon={pill.icon}
                text={pill.text}
                backgroundColor={pill.backgroundColor}
                fontSize={responsiveSizes.pillFontSize}
                padding={responsiveSizes.pillPadding}
                iconSize={responsiveSizes.iconSize}
              />
            </g>
          );
        })}
      </svg>

      {/* Text area below the shape (25% height) */}
      <div
        style={{
          width: innerWidth - SPACING.TEXT_AREA_PADDING * 2,
          height: textAreaHeight,
          padding: `${SPACING.TEXT_AREA_PADDING}px`,
          paddingTop: SPACING.TEXT_AREA_PADDING * 1.5,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: TYPOGRAPHY.TITLE.fontSize,
            fontWeight: TYPOGRAPHY.TITLE.fontWeight,
            fontFamily: TYPOGRAPHY.TITLE.fontFamily,
            fontStyle: TYPOGRAPHY.TITLE.fontStyle,
            lineHeight: TYPOGRAPHY.TITLE.lineHeight,
            color: textColor,
            marginBottom: 12,
          }}
        >
          {config.textContent.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: TYPOGRAPHY.DESCRIPTION.fontSize,
            fontWeight: TYPOGRAPHY.DESCRIPTION.fontWeight,
            fontFamily: TYPOGRAPHY.DESCRIPTION.fontFamily,
            lineHeight: TYPOGRAPHY.DESCRIPTION.lineHeight,
            color: textColor,
          }}
        >
          {config.textContent.description}
        </div>
      </div>
    </div>
  );
};
