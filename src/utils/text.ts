import { HEADLINE_RULES, SUBHEAD_RULES } from "../config/constants";

type TextRules = typeof HEADLINE_RULES | typeof SUBHEAD_RULES;

function getTextContext(
  fontSize: number,
  fontFamily: string,
  fontWeight: number,
  fontStyle?: string
): CanvasRenderingContext2D | null {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.font = `${fontStyle ? `${fontStyle} ` : ""}${fontWeight} ${fontSize}px ${fontFamily}`;
  return ctx;
}

function splitToTwoLines(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight: number,
  fontStyle?: string
): string[] | null {
  const ctx = getTextContext(fontSize, fontFamily, fontWeight, fontStyle);
  if (!ctx) return [text];

  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const spaceWidth = ctx.measureText(" ").width;
  const wordWidths = words.map(word => ctx.measureText(word).width);
  const hasOversizedWord = wordWidths.some(width => width > maxWidth);
  if (hasOversizedWord) {
    return null;
  }

  const totalWidth =
    wordWidths.reduce((sum, width) => sum + width, 0) + spaceWidth * (words.length - 1);
  if (totalWidth <= maxWidth) {
    return [words.join(" ")];
  }

  let bestSplit: number | null = null;
  let bestScore = Infinity;
  let bestBalance = Infinity;

  for (let i = 0; i < words.length - 1; i += 1) {
    const line1Width =
      wordWidths.slice(0, i + 1).reduce((sum, w) => sum + w, 0) + spaceWidth * i;
    const line2Width =
      wordWidths.slice(i + 1).reduce((sum, w) => sum + w, 0) +
      spaceWidth * (words.length - i - 2);

    if (line1Width > maxWidth || line2Width > maxWidth) continue;

    const maxLeftover = maxWidth - Math.max(line1Width, line2Width);
    const balance = Math.abs(line1Width - line2Width);
    if (maxLeftover < bestScore || (maxLeftover === bestScore && balance < bestBalance)) {
      bestScore = maxLeftover;
      bestBalance = balance;
      bestSplit = i;
    }
  }

  if (bestSplit === null) return null;

  const line1 = words.slice(0, bestSplit + 1).join(" ");
  const line2 = words.slice(bestSplit + 1).join(" ");
  return [line1, line2];
}

function breakToTwoLinesByChar(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight: number,
  fontStyle?: string
): string[] {
  const ctx = getTextContext(fontSize, fontFamily, fontWeight, fontStyle);
  if (!ctx) return [text];
  const chars = [...text];
  let line1 = "";
  let line2 = "";
  let onSecond = false;

  for (const char of chars) {
    if (!onSecond) {
      const nextLine1 = line1 + char;
      if (ctx.measureText(nextLine1).width <= maxWidth || line1.length === 0) {
        line1 = nextLine1;
        continue;
      }
      onSecond = true;
      if (char === " ") continue;
    }

    const nextLine2 = line2 + char;
    if (ctx.measureText(nextLine2).width <= maxWidth || line2.length === 0) {
      line2 = nextLine2;
    } else {
      break;
    }
  }

  return [line1.trimEnd(), line2.trimEnd()];
}

function wrapTextToLines(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight: number,
  fontStyle?: string
): string[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return [text];
  }
  ctx.font = `${fontStyle ? `${fontStyle} ` : ""}${fontWeight} ${fontSize}px ${fontFamily}`;
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const wordWidth = ctx.measureText(word).width;
    if (wordWidth > maxWidth) {
      if (current) {
        lines.push(current);
        current = "";
      }
      let segment = "";
      for (const char of word) {
        const nextSegment = segment + char;
        if (ctx.measureText(nextSegment).width <= maxWidth || segment.length === 0) {
          segment = nextSegment;
        } else {
          lines.push(segment);
          segment = char;
        }
      }
      if (segment) {
        current = segment;
      }
      continue;
    }

    const next = current ? `${current} ${word}` : word;
    const width = ctx.measureText(next).width;
    if (width <= maxWidth || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

export function fitTextToRules(
  text: string,
  maxWidth: number,
  rules: TextRules,
  fontFamily: string,
  fontWeight: number,
  fontStyle?: string
): { fontSize: number; lines: string[] } {
  const clampedText = text.slice(0, rules.maxChars);
  if (rules.maxLines === 2) {
    for (let size = rules.baseSize; size >= rules.minSize; size -= 1) {
      const lines = splitToTwoLines(clampedText, maxWidth, size, fontFamily, fontWeight, fontStyle);
      if (lines) {
        return { fontSize: size, lines };
      }
    }
    const forced = breakToTwoLinesByChar(
      clampedText,
      maxWidth,
      rules.minSize,
      fontFamily,
      fontWeight,
      fontStyle
    );
    return { fontSize: rules.minSize, lines: forced };
  }

  for (let size = rules.baseSize; size >= rules.minSize; size -= 1) {
    const lines = wrapTextToLines(clampedText, maxWidth, size, fontFamily, fontWeight, fontStyle);
    if (lines.length <= rules.maxLines) {
      return { fontSize: size, lines };
    }
  }
  const lines = wrapTextToLines(clampedText, maxWidth, rules.minSize, fontFamily, fontWeight, fontStyle);
  return { fontSize: rules.minSize, lines: lines.slice(0, rules.maxLines) };
}
