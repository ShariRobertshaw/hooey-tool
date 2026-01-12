# Flow Frame Generator - Technical Architecture

## Overview

This document explains the technical architecture, design decisions, and implementation details for developers maintaining or extending the Flow Frame Generator.

## Core Principles

1. **Constraint-First Design** - The system prevents invalid states rather than validating them
2. **Deterministic Geometry** - All calculations are pure functions with predictable outputs
3. **Single Source of Truth** - Design tokens are the only source for visual properties
4. **Type Safety** - TypeScript ensures compile-time correctness
5. **Separation of Concerns** - Clear boundaries between data, logic, and presentation

## Project Structure

```
src/
├── tokens/
│   └── design-tokens.ts      # Design system constants
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── geometry.ts           # Centralized geometry calculations
├── components/
│   ├── FlowFrame.tsx         # Main shape renderer
│   ├── Pill.tsx              # Auto-layout pill component
│   └── ControlPanel.tsx      # UI controls
├── App.tsx                   # Root component with state
├── main.tsx                  # React entry point
└── index.css                 # Global styles
```

## Design Tokens System

**File:** `src/tokens/design-tokens.ts`

### Purpose
Single source of truth for all visual properties. Prevents arbitrary values and ensures consistency.

### Token Categories

#### 1. Output Sizes
```typescript
OUTPUT_SIZES = {
  INSTAGRAM_SQUARE: { width: 1080, height: 1080, label: '...' },
  // ...
}
```
- Predefined dimensions only
- No custom sizes allowed
- Each has a human-readable label

#### 2. Radius Scale
```typescript
RADIUS_SCALE = {
  SMALL: 0.08,   // 8% of shortest side
  MEDIUM: 0.10,  // 10% of shortest side
  LARGE: 0.12,   // 12% of shortest side
}
```
- Percentages, not pixel values
- Applied to shortest side for consistency
- Capped by `RADIUS_CAPS` to prevent extreme values

#### 3. Brand Colors
```typescript
BRAND_COLORS = {
  PRIMARY_BLUE: '#0066CC',
  // ...
}
```
- Fixed palette
- Named semantically (not "blue1", "blue2")
- Easy to update brand colors globally

#### 4. Spacing
```typescript
SPACING = {
  NOTCH_TO_PILL_GAP: 16,
  TEXT_AREA_PADDING: 24,
  // ...
}
```
- Pixel values for internal spacing
- Constant across all output sizes
- Maintains visual rhythm

#### 5. Typography
```typescript
TYPOGRAPHY = {
  TITLE: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.2,
    fontFamily: '...',
  },
  // ...
}
```
- Complete text style definitions
- Locked to prevent arbitrary styling
- System font stack for reliability

### Extending Tokens

To add new options:

1. **New Output Size:**
   ```typescript
   LINKEDIN_POST: { width: 1200, height: 627, label: 'LinkedIn Post' }
   ```

2. **New Color:**
   ```typescript
   ACCENT_PURPLE: '#8B5CF6'
   ```

3. **New Icon:**
   ```typescript
   ROCKET: '🚀'
   ```

TypeScript will automatically enforce the new options throughout the app.

## Type System

**File:** `src/types/index.ts`

### Key Types

#### FrameConfig
Complete configuration state for a frame:
```typescript
interface FrameConfig {
  outputSize: OutputSizeKey;
  radiusScale: RadiusScale;
  fill: Fill;
  notches: Notch[];
  pill: PillConfig;
  textContent: TextContent;
}
```

This is the "single source of truth" for the current frame state.

#### Fill Union Type
Discriminated union for type-safe fill handling:
```typescript
type Fill = SolidFill | ImageFill;
```

TypeScript narrows the type based on `fill.type`, preventing invalid property access.

#### Notch
```typescript
interface Notch {
  corner: CornerPosition;
  id: string;  // For React key prop
}
```

Each notch has a unique ID for efficient React rendering.

### Type Safety Benefits

1. **Exhaustive Checking** - Switch statements must handle all cases
2. **Autocomplete** - IDE suggests valid options
3. **Refactor Safety** - Renaming propagates automatically
4. **Documentation** - Types serve as inline documentation

## Geometry Engine

**File:** `src/utils/geometry.ts`

### Philosophy

All shape calculations are **pure functions** - same inputs always produce same outputs. No side effects, no randomness, no external dependencies.

### Key Functions

#### `calculateCornerRadius()`
```typescript
function calculateCornerRadius(
  width: number,
  height: number,
  scale: RadiusScale
): number
```

**Algorithm:**
1. Find shortest side: `min(width, height)`
2. Calculate percentage: `shortestSide * RADIUS_SCALE[scale]`
3. Apply cap: `min(calculated, RADIUS_CAPS[scale])`

**Why shortest side?**
- Ensures radius never exceeds half the side length
- Consistent visual weight across different aspect ratios
- Prevents "pill-shaped" frames from extreme radii

#### `generateFramePath()`
```typescript
function generateFramePath(
  width: number,
  height: number,
  radius: number,
  notchCorners: Set<CornerPosition>
): string
```

**Algorithm:**
Generates SVG path data by walking the perimeter:
1. Start at top-left
2. For each corner:
   - If notched: Use inverted arc (concave)
   - If normal: Use standard arc (convex)
3. Connect with straight lines
4. Close path with `Z`

**Notch Implementation:**
```typescript
// Normal corner (convex)
path += ` Q ${width} 0 ${width} ${r}`;

// Notched corner (concave)
path += ` Q ${width - r} ${r} ${width} ${r}`;
```

The quadratic Bézier curve (`Q`) creates the arc. Notches invert the control point position.

#### `calculatePillPosition()`
```typescript
function calculatePillPosition(
  width: number,
  height: number,
  radius: number,
  hasTopRightNotch: boolean,
  pillWidth: number
): { x: number; y: number }
```

**Algorithm:**
1. Y position: `radius + gap` (below top edge + corner)
2. X position: `width - rightMargin - pillWidth`
   - If notch: `rightMargin = radius + gap`
   - If no notch: `rightMargin = gap`
3. Clamp X to minimum gap from left edge

**Why right-aligned?**
- Western reading pattern (left-to-right)
- Balances with left-aligned text area
- Creates visual hierarchy

### Validation Functions

#### `validateNotches()`
Enforces business rules:
- Maximum 3 notches
- No duplicate corners
- Returns boolean (pass/fail)

**Usage:**
```typescript
if (!validateNotches(newNotches)) {
  // Prevent invalid state
  return;
}
```

## Component Architecture

### FlowFrame Component

**Responsibilities:**
- Render SVG shape
- Apply fill (solid or image)
- Position pill
- Render text area
- Expose DOM ref for export

**Key Implementation Details:**

#### Fill Rendering
```typescript
if (config.fill.type === 'solid') {
  return <path d={framePath} fill={color} />;
} else {
  return (
    <>
      <defs>
        <clipPath id="frame-clip">
          <path d={framePath} />
        </clipPath>
      </defs>
      <image clipPath="url(#frame-clip)" ... />
    </>
  );
}
```

SVG `clipPath` ensures image respects frame shape, including notches.

#### Text Wrapping
Simple character-based approximation:
```typescript
const avgCharWidth = fontSize * 0.5;
const maxCharsPerLine = Math.floor(maxWidth / avgCharWidth);
```

**Limitation:** Doesn't account for variable-width fonts. Good enough for v1.

**Future:** Use `<foreignObject>` with HTML text for true wrapping.

#### Pill Width Measurement
```typescript
useEffect(() => {
  if (pillRef.current) {
    const bbox = pillRef.current.getBBox();
    setPillWidth(bbox.width);
  }
}, [config.pill.text, config.pill.icon]);
```

Uses SVG's `getBBox()` to measure actual rendered width. Re-measures when content changes.

### Pill Component

**Responsibilities:**
- Render pill background (rounded rect)
- Render icon (if present)
- Render text
- Calculate own dimensions

**Auto-Layout Implementation:**
```typescript
const iconWidth = hasIcon ? iconSize + SPACING.ICON_TEXT_GAP : 0;
const pillWidth = SPACING.PILL_PADDING_X * 2 + iconWidth + textWidth;
```

Width is **calculated**, not set. This is the essence of auto-layout.

**Positioning:**
Parent component positions the pill via `transform="translate(x, y)"`. The pill itself is always at (0, 0) in its local coordinate space.

### ControlPanel Component

**Responsibilities:**
- Render all UI controls
- Handle user input
- Emit configuration changes
- Enforce constraints

**Constraint Enforcement:**

1. **Notch Limit:**
   ```typescript
   disabled={!notchedCorners.has(corner) && config.notches.length >= MAX_NOTCHES}
   ```
   Button disables when limit reached (unless removing).

2. **Color Selection:**
   ```typescript
   {Object.entries(BRAND_COLORS).map(([key, value]) => (
     <button onClick={() => handleFillColorChange(key)} />
   ))}
   ```
   Only brand colors are available. No color picker.

3. **Icon Selection:**
   ```typescript
   <select>
     {Object.entries(ICON_SET).map(([key, emoji]) => (
       <option value={key}>{emoji} {key}</option>
     ))}
   </select>
   ```
   Dropdown limits to predefined icons.

**State Management:**
All state lives in `App.tsx`. ControlPanel is a "controlled component" - it receives config and emits changes, but doesn't own state.

## Export System

**File:** `src/App.tsx`

Uses `html-to-image` library to convert DOM to image.

### PNG Export
```typescript
const dataUrl = await toPng(exportElement, {
  quality: 1,
  pixelRatio: 2,  // 2x for retina displays
});
```

**Why 2× pixel ratio?**
- Crisp on high-DPI displays
- Standard for social media
- File size is acceptable

### SVG Export
```typescript
const dataUrl = await toSvg(exportElement, {
  quality: 1,
});
```

**Limitations:**
- Text may not embed fonts (browser-dependent)
- Complex filters may not export correctly
- Image fills export as embedded data URLs

**Alternative:** Direct SVG generation (bypassing DOM) for more control.

## State Management

**Current:** React `useState` in `App.tsx`

**Why not Redux/Zustand?**
- Single component owns state
- No complex async logic
- No need for global state
- Simple prop drilling is sufficient

**If the app grows:**
Consider Context API or Zustand for:
- Undo/redo functionality
- Multiple frames
- Collaborative editing

## Performance Considerations

### Current Performance

- **Rendering:** Fast (simple SVG)
- **Export:** Moderate (DOM-to-image conversion)
- **State Updates:** Fast (shallow config object)

### Potential Bottlenecks

1. **Large Images:**
   - Image fills can slow export
   - Solution: Resize images before upload

2. **Complex Text:**
   - Text wrapping is naive
   - Solution: Use `<foreignObject>` with CSS

3. **Multiple Frames:**
   - Not currently supported
   - Solution: Virtualization if needed

### Optimization Opportunities

1. **Memoization:**
   ```typescript
   const geometry = useMemo(
     () => calculateGeometry(config),
     [config.outputSize, config.radiusScale]
   );
   ```

2. **Debounced Text Input:**
   ```typescript
   const debouncedHandleTextChange = useMemo(
     () => debounce(handleTextChange, 300),
     []
   );
   ```

3. **Web Workers:**
   - Offload export to worker thread
   - Prevents UI freeze on large exports

## Testing Strategy

### Unit Tests (Recommended)

**Geometry Functions:**
```typescript
describe('calculateCornerRadius', () => {
  it('uses shortest side', () => {
    expect(calculateCornerRadius(1000, 500, 'MEDIUM')).toBe(50);
  });
  
  it('applies cap', () => {
    expect(calculateCornerRadius(1000, 1000, 'MEDIUM')).toBe(60);
  });
});
```

**Validation Functions:**
```typescript
describe('validateNotches', () => {
  it('rejects more than 3 notches', () => {
    expect(validateNotches([...4 corners])).toBe(false);
  });
});
```

### Integration Tests (Recommended)

**Component Rendering:**
```typescript
it('renders frame with notches', () => {
  render(<FlowFrame config={configWithNotches} />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
```

**User Interactions:**
```typescript
it('adds notch when button clicked', () => {
  render(<ControlPanel config={config} onConfigChange={onChange} />);
  fireEvent.click(screen.getByText('TOP LEFT'));
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      notches: expect.arrayContaining([
        expect.objectContaining({ corner: 'TOP_LEFT' })
      ])
    })
  );
});
```

### Visual Regression Tests (Optional)

Use tools like Percy or Chromatic to catch visual changes.

## Extension Points

### Adding New Features

#### 1. New Fill Type (e.g., Gradient)

**Step 1:** Add to types
```typescript
interface GradientFill {
  type: 'gradient';
  gradientId: GradientKey;
}

type Fill = SolidFill | ImageFill | GradientFill;
```

**Step 2:** Add to tokens
```typescript
export const GRADIENTS = {
  BLUE_PURPLE: { start: '#0066CC', end: '#8B5CF6' },
};
```

**Step 3:** Update FlowFrame
```typescript
if (config.fill.type === 'gradient') {
  return (
    <>
      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stopColor={start} />
          <stop offset="100%" stopColor={end} />
        </linearGradient>
      </defs>
      <path d={framePath} fill="url(#grad)" />
    </>
  );
}
```

**Step 4:** Update ControlPanel
Add gradient selector UI.

#### 2. New Notch Style (e.g., Square Notch)

**Step 1:** Add to tokens
```typescript
export const NOTCH_STYLES = ['ROUNDED', 'SQUARE'] as const;
```

**Step 2:** Update geometry
```typescript
function getNotchPath(corner, width, height, radius, style) {
  if (style === 'SQUARE') {
    // Generate square notch path
  } else {
    // Existing rounded notch
  }
}
```

**Step 3:** Update FrameConfig type
```typescript
interface FrameConfig {
  // ...
  notchStyle: NotchStyle;
}
```

#### 3. Multiple Text Areas

**Step 1:** Update types
```typescript
interface TextArea {
  id: string;
  position: 'top' | 'bottom';
  content: TextContent;
}

interface FrameConfig {
  // ...
  textAreas: TextArea[];
}
```

**Step 2:** Update geometry
Add `calculateTextAreaPositions()` for multiple areas.

**Step 3:** Update FlowFrame
Map over `textAreas` to render multiple.

### Customization for Different Brands

**File:** `src/tokens/design-tokens.ts`

1. **Update Colors:**
   ```typescript
   export const BRAND_COLORS = {
     PRIMARY: '#YOUR_COLOR',
     // ...
   };
   ```

2. **Update Typography:**
   ```typescript
   export const TYPOGRAPHY = {
     TITLE: {
       fontFamily: 'YourFont, sans-serif',
       // ...
     },
   };
   ```

3. **Update Sizes:**
   ```typescript
   export const OUTPUT_SIZES = {
     CUSTOM_SIZE: { width: 1500, height: 1000, label: 'Custom' },
   };
   ```

4. **Restart dev server** to see changes.

## Security Considerations

### Image Upload

**Current:** Client-side only (no server upload)

**Risks:**
- Large files can crash browser
- Malicious SVG files (if SVG upload enabled)

**Mitigations:**
1. File size limit:
   ```typescript
   if (file.size > 10 * 1024 * 1024) {
     alert('File too large (max 10MB)');
     return;
   }
   ```

2. File type validation:
   ```typescript
   if (!file.type.startsWith('image/')) {
     alert('Invalid file type');
     return;
   }
   ```

3. Disable SVG upload (XSS risk):
   ```html
   <input accept="image/png,image/jpeg,image/webp" />
   ```

### Export

**Current:** Client-side export (no server)

**Risks:**
- None (no data leaves browser)

**If adding server-side export:**
- Validate all inputs
- Sanitize text content
- Rate limit requests
- Scan uploaded images

## Browser Compatibility

### Required APIs

- **SVG 1.1** - All modern browsers
- **Canvas API** - For export (IE11+)
- **FileReader API** - For image upload (IE10+)
- **ES6 Features** - Vite transpiles for older browsers

### Tested Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Known Issues

- **Safari:** SVG text export may have font issues
- **Firefox:** `getBBox()` can be slow on complex SVG
- **Edge:** Older versions may have export quality issues

## Deployment

### Build for Production

```bash
npm run build
```

Outputs to `dist/` directory.

### Hosting Options

1. **Static Hosting** (Netlify, Vercel, GitHub Pages)
   - No server required
   - Deploy `dist/` folder
   - Automatic HTTPS

2. **CDN** (Cloudflare, AWS S3 + CloudFront)
   - Global distribution
   - Fast load times
   - Cache static assets

3. **Self-Hosted** (Nginx, Apache)
   - Full control
   - Custom domain
   - May require HTTPS setup

### Environment Variables

None required for v1 (all client-side).

**If adding analytics:**
```typescript
const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID;
```

## Maintenance

### Updating Dependencies

```bash
npm update
```

**Test thoroughly after updates:**
- Export functionality
- Image upload
- SVG rendering

### Monitoring

**Metrics to track:**
- Export success rate
- Average export time
- Most-used output sizes
- Most-used colors

**Tools:**
- Google Analytics (page views)
- Sentry (error tracking)
- LogRocket (session replay)

### Common Issues

**Issue:** Export fails
**Solution:** Update `html-to-image` library

**Issue:** Text doesn't wrap correctly
**Solution:** Adjust `wrapText()` function or use `<foreignObject>`

**Issue:** Pill overlaps frame
**Solution:** Review `calculatePillPosition()` logic

## Future Roadmap

### v2 Features
- Undo/redo
- Preset templates
- Batch export (multiple sizes)
- Copy/paste frames

### v3 Features
- Collaborative editing
- Component library
- Animation export
- Brand kit management

### Performance Goals
- < 100ms render time
- < 2s export time
- < 50KB bundle size (gzipped)

## Contributing

### Code Style

- Use TypeScript strict mode
- Prefer functional components
- Use const for immutable values
- Comment complex algorithms
- Keep functions pure when possible

### Pull Request Process

1. Create feature branch
2. Write tests
3. Update documentation
4. Submit PR with description
5. Address review feedback

### Questions?

Contact the development team or open an issue.
