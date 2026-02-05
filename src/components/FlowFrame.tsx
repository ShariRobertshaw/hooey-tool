/**
 * FlowFrame - The main shape component
 * Renders the frame with fill, notches, pills, and text below
 */

import React, { useMemo } from "react";
import {
  BACKGROUND_COLOR_MAP,
  CANVAS_PADDING,
  CANVAS_SIZE,
  HEADLINE_RULES,
  LOGO_RULES,
  PILL_RULES,
  SHAPE_HEIGHT_RATIO,
  SHAPE_TEXT_GAP,
  SUBHEAD_RULES,
  TEXT_AREA_PADDING,
} from "../config/constants";
import type { FrameConfig, Notch } from "../types";
import { calculateCornerRadius, generateFramePath } from "../utils/geometry";
import { fitTextToRules } from "../utils/text";
import { Pill } from "./Pill";

interface FlowFrameProps {
  config: FrameConfig;
  onExportReady?: (element: HTMLDivElement) => void;
}

export const FlowFrame: React.FC<FlowFrameProps> = ({ config, onExportReady }) => {
  const width = CANVAS_SIZE;
  const height = CANVAS_SIZE;
  const padding = CANVAS_PADDING;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const shapeHeight = innerHeight * SHAPE_HEIGHT_RATIO;
  const textAreaHeight = innerHeight - shapeHeight;
  const cornerRadius = calculateCornerRadius(shapeHeight);

  const backgroundColor = BACKGROUND_COLOR_MAP[config.backgroundColor];
  const textColor = config.backgroundColor === "DARK_TEAL" ? "#FFFFFF" : "#004041";
  const logoColor = config.backgroundColor === "DARK_TEAL" ? "#FFFFFF" : "#004041";

  const pillFont = `600 ${PILL_RULES.fontSize}px system-ui, -apple-system, sans-serif`;
  const topLeftTextWidth = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    ctx.font = pillFont;
    return ctx.measureText(config.pills.topLeft.text).width;
  }, [config.pills.topLeft.text, pillFont]);

  const bottomRightTextWidth = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    ctx.font = pillFont;
    return ctx.measureText(config.pills.bottomRight.text).width;
  }, [config.pills.bottomRight.text, pillFont]);

  const topLeftPillWidth =
    PILL_RULES.padding * 2 +
    (config.pills.topLeft.icon === "NONE" ? 0 : PILL_RULES.iconSize + PILL_RULES.iconGap) +
    topLeftTextWidth;
  const bottomRightPillWidth =
    PILL_RULES.padding * 2 +
    (config.pills.bottomRight.icon === "NONE" ? 0 : PILL_RULES.iconSize + PILL_RULES.iconGap) +
    bottomRightTextWidth;
  const pillHeight = PILL_RULES.height;

  const logoHeight = LOGO_RULES.height;
  const logoWidth = LOGO_RULES.width;

  const notchGap = PILL_RULES.notchGap;
  const topLeftNotchHeight = config.pills.topLeft.enabled ? pillHeight + notchGap * 2 : 0;
  const bottomRightNotchHeight = config.pills.bottomRight.enabled ? pillHeight + notchGap * 2 : 0;
  const logoNotchHeight = config.logo.enabled ? logoHeight + notchGap * 2 : 0;
  const uniformNotchHeight = Math.max(topLeftNotchHeight, bottomRightNotchHeight, logoNotchHeight);

  const notches: Notch[] = [];
  if (config.pills.topLeft.enabled) {
    notches.push({
      corner: "top-left",
      width: topLeftPillWidth + notchGap * 2,
      height: uniformNotchHeight,
    });
  }
  if (config.pills.bottomRight.enabled) {
    notches.push({
      corner: "bottom-right",
      width: bottomRightPillWidth + notchGap * 2,
      height: uniformNotchHeight,
    });
  }
  if (config.logo.enabled) {
    notches.push({
      corner: "top-right",
      width: logoWidth + notchGap * 2,
      height: uniformNotchHeight,
    });
  }

  const framePath = generateFramePath(innerWidth, shapeHeight, cornerRadius, notches);

  const topLeftPosition = useMemo(() => {
    const notch = notches.find(n => n.corner === "top-left");
    if (!notch) return { x: 0, y: 0 };
    const gapX = notchGap;
    const gapY = (notch.height - pillHeight) / 2;
    return { x: gapX, y: gapY };
  }, [notches, notchGap, pillHeight]);

  const bottomRightPosition = useMemo(() => {
    const notch = notches.find(n => n.corner === "bottom-right");
    if (!notch) return { x: 0, y: 0 };
    const gapX = notchGap;
    const gapY = (notch.height - pillHeight) / 2;
    return { x: innerWidth - notch.width + gapX, y: shapeHeight - notch.height + gapY };
  }, [innerWidth, shapeHeight, notches, notchGap, pillHeight]);

  const logoPosition = useMemo(() => {
    const notch = notches.find(n => n.corner === "top-right");
    if (!notch) return { x: 0, y: 0 };
    const gapX = notchGap;
    const gapY = (notch.height - logoHeight) / 2;
    return { x: innerWidth - notch.width + gapX, y: gapY };
  }, [innerWidth, notches, notchGap, logoHeight]);

  const headlineFit = useMemo(
    () =>
      fitTextToRules(
        config.headline,
        innerWidth - TEXT_AREA_PADDING * 2,
        HEADLINE_RULES,
        "Georgia, \"Times New Roman\", serif",
        400,
        "italic"
      ),
    [config.headline, innerWidth]
  );

  const headlineLines = useMemo(() => {
    const clean = headlineFit.lines.filter(line => line.trim().length > 0);
    if (clean.length <= HEADLINE_RULES.maxLines) return clean;
    return [clean[0], clean.slice(1).join(" ")];
  }, [headlineFit.lines]);

  const subheadFit = useMemo(
    () =>
      fitTextToRules(
        config.subhead,
        innerWidth - TEXT_AREA_PADDING * 2,
        SUBHEAD_RULES,
        "system-ui, -apple-system, sans-serif",
        400
      ),
    [config.subhead, innerWidth]
  );

  const subheadLines = useMemo(() => {
    const clean = subheadFit.lines.filter(line => line.trim().length > 0);
    if (clean.length <= SUBHEAD_RULES.maxLines) return clean;
    return [clean[0], clean.slice(1).join(" ")];
  }, [subheadFit.lines]);

  return (
    <div
      ref={onExportReady ? (node) => node && onExportReady(node) : undefined}
      style={{
        width,
        height,
        position: "relative",
        backgroundColor,
        padding,
        boxSizing: "border-box",
      }}
    >
      {/* Shape with pills (75% height) */}
      <svg
        width={innerWidth}
        height={shapeHeight}
        viewBox={`0 0 ${innerWidth} ${shapeHeight}`}
        style={{ display: "block" }}
      >
        {/* Frame with fill */}
        <>
          <defs>
            <clipPath id="frame-clip">
              <path d={framePath} />
            </clipPath>
          </defs>
          <image
            href={config.imageUrl}
            width={innerWidth}
            height={shapeHeight}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#frame-clip)"
          />
        </>

        {/* Top-left pill */}
        {config.pills.topLeft.enabled && (
          <g transform={`translate(${topLeftPosition.x}, ${topLeftPosition.y})`}>
            <Pill
              icon={config.pills.topLeft.icon}
              text={config.pills.topLeft.text}
              colorId={config.pills.topLeft.color}
              fontSize={PILL_RULES.fontSize}
              padding={PILL_RULES.padding}
              width={topLeftPillWidth}
              height={pillHeight}
              iconSize={PILL_RULES.iconSize}
              iconGap={PILL_RULES.iconGap}
              forceWhiteText={config.backgroundColor === "DARK_TEAL"}
            />
          </g>
        )}

        {/* Bottom-right pill */}
        {config.pills.bottomRight.enabled && (
          <g transform={`translate(${bottomRightPosition.x}, ${bottomRightPosition.y})`}>
            <Pill
              icon={config.pills.bottomRight.icon}
              text={config.pills.bottomRight.text}
              colorId={config.pills.bottomRight.color}
              fontSize={PILL_RULES.fontSize}
              padding={PILL_RULES.padding}
              width={bottomRightPillWidth}
              height={pillHeight}
              iconSize={PILL_RULES.iconSize}
              iconGap={PILL_RULES.iconGap}
              forceWhiteText={config.backgroundColor === "DARK_TEAL"}
            />
          </g>
        )}

        {/* Logo */}
        {config.logo.enabled && (
          <g transform={`translate(${logoPosition.x}, ${logoPosition.y})`}>
            <svg
              width={LOGO_RULES.width}
              height={LOGO_RULES.height}
              viewBox="0 0 56 18"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.26057 11.7196L7.00321 14.1304C6.90243 14.8466 6.6877 15.491 6.3625 16.0397C6.09312 16.5172 5.70473 16.9706 5.18147 17.3287C4.65549 17.7108 3.97758 17.9255 3.10392 17.9255C2.23065 17.9255 1.57406 17.7108 1.12986 17.3287C0.682957 16.9706 0.415901 16.5172 0.248456 16.0397C0.0403141 15.491 -0.0364363 14.8466 0.0158903 14.1304L1.11978 3.79505C1.21824 3.10293 1.43258 2.45847 1.75817 1.90935C2.02755 1.4323 2.39383 0.954864 2.91748 0.59679C3.44075 0.238716 4.14541 0 5.01907 0C5.89234 0 6.52181 0.238716 6.9691 0.59679C7.41601 0.954864 7.70438 1.4323 7.87182 1.90935C8.07997 2.45847 8.15671 3.10293 8.1071 3.79505L7.84973 6.20586H5.39931L5.65667 3.79505C5.70784 3.31762 5.62218 2.98357 5.38574 2.69719C5.27722 2.57783 5.06674 2.50614 4.79968 2.50614C4.33882 2.50614 4.08495 2.84057 3.93029 3.1506C3.83727 3.34165 3.78998 3.55634 3.73998 3.79505L2.63609 14.1304C2.60663 14.6315 2.71671 14.9659 2.93105 15.2283C3.03958 15.3476 3.20199 15.4193 3.42021 15.4193C3.97836 15.4193 4.22719 15.1329 4.38689 14.7749C4.47759 14.6078 4.52449 14.3928 4.55278 14.1304L4.81015 11.7196H7.26057ZM9.70519 0.191048H12.3254L10.706 15.3476H14.1754L13.9204 17.7344H7.83074L9.70519 0.191048ZM16.6096 0.191048H19.2297L17.3557 17.7344H14.7355L16.6096 0.191048ZM22.1895 8.59264L22.0581 7.78116H21.9123L20.8492 17.7344H18.4472L20.3212 0.191048H22.6503L24.2213 9.33281L24.3531 10.1443H24.4984L25.5616 0.191048H27.9636L26.0895 17.7344H23.7604L22.1895 8.59264ZM29.1764 0.191048H31.7966L29.9225 17.7344H27.3024L29.1764 0.191048ZM36.5071 6.49224L36.7955 3.79505C36.8463 3.31762 36.785 2.98357 36.573 2.69719C36.4645 2.57783 36.2781 2.50614 36.0598 2.50614C35.5986 2.50614 35.3447 2.84057 35.2145 3.1506C35.1215 3.34165 35.0742 3.55634 35.0486 3.79505L33.9214 14.3451C33.868 14.8465 33.9536 15.1806 34.168 15.443C34.2765 15.5623 34.4389 15.634 34.6571 15.634C35.118 15.634 35.3672 15.3476 35.5025 14.9896C35.5932 14.8225 35.6401 14.6078 35.6684 14.3451L36.0075 11.1705H34.9641L35.1963 8.99838H38.8595L37.9265 17.7344H36.3738L36.1474 16.8993C35.5986 17.4957 34.849 17.9255 34.0001 17.9255C33.1509 17.9255 32.5916 17.7108 32.1954 17.3287C31.797 16.9706 31.5544 16.5172 31.4113 16.0397C31.2516 15.491 31.2233 14.8466 31.3241 14.1304L32.4284 3.79505C32.5265 3.10293 32.7408 2.45847 33.0664 1.90935C33.3358 1.4323 33.7021 0.954864 34.2257 0.59679C34.7494 0.238716 35.454 0 36.3273 0C37.201 0 37.8304 0.238716 38.2773 0.59679C38.7242 0.954864 39.013 1.4323 39.1804 1.90935C39.3886 2.45847 39.4653 3.10293 39.4157 3.79505L39.1273 6.49224H36.5071ZM40.8677 0.191048H46.8604L46.5771 2.84057H43.2049L42.7127 7.44711H45.1387L44.8379 10.2637H42.4119L41.8968 15.0853H45.2689L44.986 17.7344H38.9936L40.8677 0.191048ZM49.8201 8.59264L49.6884 7.78116H49.5426L48.4794 17.7344H46.0774L47.9519 0.191048H50.281L51.8516 9.33281L51.9833 10.1443H52.1287L53.1923 0.191048H55.5939L53.7198 17.7344H51.3907L49.8201 8.59264Z"
                fill={logoColor}
              />
            </svg>
          </g>
        )}
      </svg>

      {/* Text area below the shape (25% height) */}
      <div
        style={{
          width: innerWidth,
          height: textAreaHeight,
          padding: `${TEXT_AREA_PADDING}px`,
          paddingTop: SHAPE_TEXT_GAP,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: headlineFit.fontSize,
            fontWeight: 400,
            fontFamily: "Georgia, \"Times New Roman\", serif",
            fontStyle: "italic",
            lineHeight: `${HEADLINE_RULES.lineHeight}px`,
            color: textColor,
            marginBottom: 8,
            maxHeight: HEADLINE_RULES.lineHeight * HEADLINE_RULES.maxLines,
            overflow: "hidden",
          }}
        >
          {headlineLines.map((line, index) => (
            <div key={`headline-${index}`} style={{ whiteSpace: "nowrap" }}>
              {line}
            </div>
          ))}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: subheadFit.fontSize,
            fontWeight: 400,
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: `${SUBHEAD_RULES.lineHeight}px`,
            color: textColor,
            maxHeight: SUBHEAD_RULES.lineHeight * SUBHEAD_RULES.maxLines,
            overflow: "hidden",
          }}
        >
          {subheadLines.map((line, index) => (
            <div key={`subhead-${index}`} style={{ whiteSpace: "nowrap" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
