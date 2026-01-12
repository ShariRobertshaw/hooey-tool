# Flow Frame Generator

A constrained shape-generation tool for creating branded marketing graphics with strict geometric rules.

## Purpose

This tool enables non-designers (marketing teams) to generate consistent, on-brand image assets using a predefined "Flow Frame" shape system. It prioritizes consistency, predictability, and guardrails over creative freedom.

## Features

### 1. Predefined Output Sizes
- Instagram Square (1080×1080)
- Instagram Story (1080×1920)
- Facebook Post (1200×630)
- Twitter Post (1200×675)
- Email Header (600×400)
- Web Banner (1920×600)

### 2. Controlled Base Frame
- Rectangle base with algorithm-driven corner radii
- Radius = 10% of shortest side (Small/Medium/Large tokens)
- No freeform radius editing allowed

### 3. Fill Options
- **Solid Color**: Fixed brand palette
- **Image Upload**: Proportionally filled and clipped to shape

### 4. Notch System
- Corner-only placement (never mid-edge)
- Maximum 3 notches total
- Maximum 1 notch per corner
- Notch curvature matches frame corner radius
- No overlapping or stacking allowed

### 5. Pill Component
- Auto-layout behavior (grows horizontally to the left)
- Optional icon (fixed icon set)
- Editable text
- Maintains constant gap from adjacent notch
- Right edge stays visually fixed

### 6. Text Area
- Fixed bottom area
- Title + Description support
- Locked typography tokens
- Auto text reflow

### 7. Export
- PNG (high quality, 2× pixel ratio)
- SVG (vector format)

## Design System

### Corner Radius Tokens
- **Small**: 8% of shortest side (max 40px)
- **Medium**: 10% of shortest side (max 60px)
- **Large**: 12% of shortest side (max 80px)

### Brand Colors
- Primary Blue: `#0066CC`
- Secondary Teal: `#00B8A9`
- Accent Coral: `#FF6B6B`
- Neutral Dark: `#2D3748`
- Neutral Light: `#F7FAFC`
- White: `#FFFFFF`
- Black: `#000000`

### Typography
- **Title**: 32px, Bold (700)
- **Description**: 16px, Regular (400)
- **Pill Text**: 14px, Semibold (600)

## Architecture

### Tech Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **html-to-image** - Export functionality

### Key Design Decisions

1. **Centralized Geometry Logic** (`src/utils/geometry.ts`)
   - All shape calculations in one place
   - Deterministic rules prevent visual inconsistency
   - Radius, notch, and spacing calculations are formulaic

2. **Design Tokens** (`src/tokens/design-tokens.ts`)
   - Single source of truth for all visual properties
   - Prevents arbitrary values
   - Easy to update brand guidelines

3. **Type Safety**
   - TypeScript ensures only valid configurations
   - Exhaustive type checking on corners, colors, icons
   - Compile-time validation

4. **Component Separation**
   - `FlowFrame`: Shape rendering logic
   - `Pill`: Auto-layout sub-component
   - `ControlPanel`: Safe UI controls
   - Each component has single responsibility

5. **Validation**
   - Notch limit enforcement (max 3)
   - Corner uniqueness validation
   - No duplicate notches allowed

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Usage

1. **Choose Output Size** - Select from preset dimensions
2. **Set Corner Radius** - Pick Small/Medium/Large
3. **Choose Fill**:
   - Click a color swatch for solid fill
   - Upload an image for image fill
4. **Add Notches** (optional) - Click corner buttons (max 3)
5. **Configure Pill** (optional):
   - Toggle visibility
   - Select icon
   - Enter text
6. **Add Text Content**:
   - Enter title
   - Enter description
7. **Export**:
   - Click "Export PNG" or "Export SVG"
   - File downloads automatically

## Constraints (By Design)

Users **cannot**:
- Manually edit vector paths
- Resize masks independently
- Create custom corner radii
- Place notches on edges
- Add more than 3 notches
- Add multiple notches to one corner
- Use colors outside the palette
- Use custom fonts or sizes

All changes are implemented via deterministic rules and predefined variants.

## Future Enhancements (v2+)

Potential additions without breaking core constraints:
- Gradient fills (preset gradients only)
- Pattern fills (preset patterns only)
- Additional output size presets
- More icon options (still from fixed set)
- Multiple text area layouts (predefined templates)
- Batch export for multiple sizes
- Preset "template" starting points

## License

Proprietary - Internal tool for Clinigen marketing team.
