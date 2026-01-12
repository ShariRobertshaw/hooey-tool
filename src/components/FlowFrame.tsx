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
  const logoRef = useRef<SVGGElement>(null);
  const [pillDimensions, setPillDimensions] = useState<Map<string, { width: number; height: number }>>(new Map());
  const [logoDimensions, setLogoDimensions] = useState<{ width: number; height: number } | null>(null);
  const [notchesWithSizes, setNotchesWithSizes] = useState<Notch[]>(config.notches);
  const [uniformNotchHeight, setUniformNotchHeight] = useState<number>(0);

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

  // Measure pill and logo dimensions and update notch sizes
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
    
    // Measure logo if visible
    if (config.logo?.visible && logoRef.current) {
      try {
        const bbox = logoRef.current.getBBox();
        setLogoDimensions({ width: bbox.width, height: bbox.height });
      } catch (e) {
        // BBox not available yet
      }
    }
    
    // Calculate notch dimensions for pills and logo
    const gap = responsiveSizes.notchGap;
    const notchHeights: number[] = [];
    const tempNotches = config.notches.map(notch => {
      // Check if this is a logo notch (always TOP_RIGHT)
      if (config.logo?.visible && notch.corner === 'TOP_RIGHT' && logoDimensions) {
        const notchWidth = logoDimensions.width + (gap * 2);
        const notchHeight = logoDimensions.height + (gap * 2);
        notchHeights.push(notchHeight);
        return { ...notch, width: notchWidth, height: notchHeight };
      }
      
      // Find pill that should sit in this notch
      const pill = config.pills.find(p => {
        const pillCorner = p.position.toUpperCase().replace('-', '_');
        return pillCorner === notch.corner;
      });
      
      if (pill && pillDimensions.has(pill.id)) {
        const dims = pillDimensions.get(pill.id)!;
        const notchWidth = dims.width + (gap * 2);
        const notchHeight = dims.height + (gap * 2);
        notchHeights.push(notchHeight);
        return { ...notch, width: notchWidth, height: notchHeight };
      }
      
      return { ...notch, width: notch.width || 260, height: notch.height || 80 };
    });
    
    // Find maximum notch height and apply to all notches
    const maxHeight = notchHeights.length > 0 ? Math.max(...notchHeights) : 0;
    setUniformNotchHeight(maxHeight);
    
    const updatedNotches = tempNotches.map(notch => ({
      ...notch,
      height: maxHeight > 0 ? maxHeight : notch.height,
    }));
    
    setNotchesWithSizes(updatedNotches);
  }, [config.pills, config.notches, config.logo, pillDimensions.size, logoDimensions]);

  // Generate frame path with dynamically sized notches (using inner width)
  const framePath = generateFramePath(innerWidth, shapeHeight, cornerRadius, notchesWithSizes);

  // Calculate logo position (always top-right)
  const getLogoPosition = () => {
    if (!config.logo) return { x: 0, y: 0 };
    
    const notch = notchesWithSizes.find(n => n.corner === 'TOP_RIGHT');
    if (!notch) return { x: 0, y: 0 };
    
    const gap = responsiveSizes.notchGap;
    return { x: innerWidth - notch.width + gap, y: gap };
  };

  // Determine logo color based on background
  const logoColor = ['DARK_TEAL', 'BLACK'].includes(config.backgroundColor)
    ? BRAND_COLORS.BEIGE
    : BRAND_COLORS.DARK_TEAL;

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
    
    // Pill sits inside notch with equal gap all around
    const gap = responsiveSizes.notchGap;
    
    switch (pill.position) {
      case 'top-left':
        return { x: gap, y: gap };
      case 'top-right':
        return { x: innerWidth - notch.width + gap, y: gap };
      case 'bottom-left':
        return { x: gap, y: shapeHeight - notch.height + gap };
      case 'bottom-right':
        return { x: innerWidth - notch.width + gap, y: shapeHeight - notch.height + gap };
      default:
        return { x: gap, y: gap };
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
        padding: padding, // Use responsive padding (24px or 40px)
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
          
          // Scale pill to fill uniform notch height if needed
          const notch = notchesWithSizes.find(n => n.corner === pill.position.toUpperCase().replace('-', '_'));
          const pillDims = pillDimensions.get(pill.id);
          let scaleY = 1;
          if (notch && pillDims && uniformNotchHeight > 0) {
            const availableHeight = uniformNotchHeight - (responsiveSizes.notchGap * 2);
            scaleY = availableHeight / pillDims.height;
          }
          
          return (
            <g 
              key={pill.id} 
              ref={(el) => {
                if (el) {
                  pillRefs.current.set(pill.id, el);
                }
              }}
              transform={`translate(${position.x}, ${position.y}) scale(1, ${scaleY})`}
            >
              <Pill
                icon={pill.icon}
                text={pill.text}
                backgroundColor={config.backgroundColor === 'DARK_TEAL' ? 'TEAL' : pill.backgroundColor}
                fontSize={responsiveSizes.pillFontSize}
                padding={responsiveSizes.pillPadding}
                iconSize={responsiveSizes.iconSize}
                forceWhiteText={config.backgroundColor === 'DARK_TEAL'}
              />
            </g>
          );
        })}
        
        {/* Logo */}
        {config.logo?.visible && (
          <g
            ref={logoRef}
            transform={`translate(${getLogoPosition().x}, ${getLogoPosition().y})`}
          >
            {/* Logo scaled to 55px height for large formats, 18px for email */}
            <svg 
              width={width <= 600 ? "56" : "170"} 
              height={width <= 600 ? "18" : "55"} 
              viewBox="0 0 56 18" 
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M7.26057 11.7196L7.00321 14.1304C6.90243 14.8466 6.6877 15.491 6.3625 16.0397C6.09312 16.5172 5.70473 16.9706 5.18147 17.3287C4.65549 17.7108 3.97758 17.9255 3.10392 17.9255C2.23065 17.9255 1.57406 17.7108 1.12986 17.3287C0.682957 16.9706 0.415901 16.5172 0.248456 16.0397C0.0403141 15.491 -0.0364363 14.8466 0.0158903 14.1304L1.11978 3.79505C1.21824 3.10293 1.43258 2.45847 1.75817 1.90935C2.02755 1.4323 2.39383 0.954864 2.91748 0.59679C3.44075 0.238716 4.14541 0 5.01907 0C5.89234 0 6.52181 0.238716 6.9691 0.59679C7.41601 0.954864 7.70438 1.4323 7.87182 1.90935C8.07997 2.45847 8.15671 3.10293 8.1071 3.79505L7.84973 6.20586H5.39931L5.65667 3.79505C5.70784 3.31762 5.62218 2.98357 5.38574 2.69719C5.27722 2.57783 5.06674 2.50614 4.79968 2.50614C4.33882 2.50614 4.08495 2.84057 3.93029 3.1506C3.83727 3.34165 3.78998 3.55634 3.73998 3.79505L2.63609 14.1304C2.60663 14.6315 2.71671 14.9659 2.93105 15.2283C3.03958 15.3476 3.20199 15.4193 3.42021 15.4193C3.97836 15.4193 4.22719 15.1329 4.38689 14.7749C4.47759 14.6078 4.52449 14.3928 4.55278 14.1304L4.81015 11.7196H7.26057ZM9.70519 0.191048H12.3254L10.706 15.3476H14.1754L13.9204 17.7344H7.83074L9.70519 0.191048ZM16.6096 0.191048H19.2297L17.3557 17.7344H14.7355L16.6096 0.191048ZM22.1895 8.59264L22.0581 7.78116H21.9123L20.8492 17.7344H18.4472L20.3212 0.191048H22.6503L24.2213 9.33281L24.3531 10.1443H24.4984L25.5616 0.191048H27.9636L26.0895 17.7344H23.7604L22.1895 8.59264ZM29.1764 0.191048H31.7966L29.9225 17.7344H27.3024L29.1764 0.191048ZM36.5071 6.49224L36.7955 3.79505C36.8463 3.31762 36.785 2.98357 36.573 2.69719C36.4645 2.57783 36.2781 2.50614 36.0598 2.50614C35.5986 2.50614 35.3447 2.84057 35.2145 3.1506C35.1215 3.34165 35.0742 3.55634 35.0486 3.79505L33.9214 14.3451C33.868 14.8465 33.9536 15.1806 34.168 15.443C34.2765 15.5623 34.4389 15.634 34.6571 15.634C35.118 15.634 35.3672 15.3476 35.5025 14.9896C35.5932 14.8225 35.6401 14.6078 35.6684 14.3451L36.0075 11.1705H34.9641L35.1963 8.99838H38.8595L37.9265 17.7344H36.3738L36.1474 16.8993C35.5986 17.4957 34.849 17.9255 34.0001 17.9255C33.1509 17.9255 32.5916 17.7108 32.1954 17.3287C31.797 16.9706 31.5544 16.5172 31.4113 16.0397C31.2516 15.491 31.2233 14.8466 31.3241 14.1304L32.4284 3.79505C32.5265 3.10293 32.7408 2.45847 33.0664 1.90935C33.3358 1.4323 33.7021 0.954864 34.2257 0.59679C34.7494 0.238716 35.454 0 36.3273 0C37.201 0 37.8304 0.238716 38.2773 0.59679C38.7242 0.954864 39.013 1.4323 39.1804 1.90935C39.3886 2.45847 39.4653 3.10293 39.4157 3.79505L39.1273 6.49224H36.5071ZM40.8677 0.191048H46.8604L46.5771 2.84057H43.2049L42.7127 7.44711H45.1387L44.8379 10.2637H42.4119L41.8968 15.0853H45.2689L44.986 17.7344H38.9936L40.8677 0.191048ZM49.8201 8.59264L49.6884 7.78116H49.5426L48.4794 17.7344H46.0774L47.9519 0.191048H50.281L51.8516 9.33281L51.9833 10.1443H52.1287L53.1923 0.191048H55.5939L53.7198 17.7344H51.3907L49.8201 8.59264Z" fill={logoColor}/>
            </svg>
          </g>
        )}
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
            fontSize: responsiveSizes.titleFontSize,
            fontWeight: TYPOGRAPHY.TITLE.fontWeight,
            fontFamily: TYPOGRAPHY.TITLE.fontFamily,
            fontStyle: TYPOGRAPHY.TITLE.fontStyle,
            lineHeight: TYPOGRAPHY.TITLE.lineHeight,
            color: textColor,
            marginBottom: 8,
          }}
        >
          {config.textContent.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: responsiveSizes.descriptionFontSize,
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
