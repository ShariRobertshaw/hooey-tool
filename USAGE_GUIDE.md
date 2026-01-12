# Flow Frame Generator - Usage Guide

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown (typically `http://localhost:5173`)

## Interface Overview

The tool has two main areas:

### Left Side: Canvas Area
- Displays your Flow Frame in real-time
- Shows exactly what will be exported
- Scales to fit the viewport while maintaining aspect ratio

### Right Side: Control Panel
- All editing controls
- Organized into logical sections
- Only exposes safe, constrained options

## Step-by-Step Workflow

### Step 1: Choose Output Size

In the **Output Size** section, select from the dropdown:
- Instagram Square (1080×1080) - Perfect for Instagram posts
- Instagram Story (1080×1920) - Vertical story format
- Facebook Post (1200×630) - Standard Facebook image
- Twitter Post (1200×675) - Twitter card format
- Email Header (600×400) - Email-friendly size
- Web Banner (1920×600) - Wide banner format

**The canvas automatically resizes to match your selection.**

### Step 2: Set Corner Radius

In the **Corner Radius** section, choose one of three options:
- **SMALL** - Subtle rounded corners (8% of shortest side, max 40px)
- **MEDIUM** - Balanced roundness (10% of shortest side, max 60px)
- **LARGE** - Pronounced curves (12% of shortest side, max 80px)

**The radius is calculated automatically based on your frame size. You cannot enter custom values.**

### Step 3: Choose Fill

In the **Fill** section, you have two options:

#### Option A: Solid Color
Click any color swatch to apply:
- Primary Blue
- Secondary Teal
- Accent Coral
- Neutral Dark
- Neutral Light
- White
- Black

**The selected color will have a blue border.**

#### Option B: Image
1. Click "Upload Image"
2. Select an image file from your computer
3. The image will automatically fill the frame and be clipped to the shape

**Images are proportionally scaled and centered (no distortion).**

### Step 4: Add Notches (Optional)

In the **Notches** section, click corner buttons to add/remove notches:
- **TOP LEFT** - Notch in upper-left corner
- **TOP RIGHT** - Notch in upper-right corner
- **BOTTOM RIGHT** - Notch in lower-right corner
- **BOTTOM LEFT** - Notch in lower-left corner

**Rules:**
- Maximum 3 notches total
- Maximum 1 notch per corner
- Notch curvature automatically matches your corner radius
- Buttons disable when limit is reached

**Counter shows current notches: "Notches (2/3)"**

### Step 5: Configure Pill (Optional)

In the **Pill Component** section:

1. **Toggle Visibility**
   - Check/uncheck "Show Pill" to enable/disable

2. **Choose Icon** (when pill is visible)
   - Select from dropdown:
     - ⭐ STAR
     - ❤️ HEART
     - ✓ CHECK
     - → ARROW
     - ✨ SPARKLE
     - 🔥 FIRE
     - ⚡ BOLT
     - 🏆 TROPHY
     - Or NONE for text-only

3. **Enter Text** (when pill is visible)
   - Type your pill text (e.g., "NEW", "SALE", "LIMITED")
   - **Pill grows horizontally to the left as you type**
   - Right edge stays fixed
   - Gap from adjacent notch is maintained automatically

### Step 6: Add Text Content

In the **Text Content** section:

1. **Title**
   - Enter your main headline
   - Uses bold, large typography (32px)
   - Single line recommended

2. **Description**
   - Enter supporting text
   - Uses regular typography (16px)
   - **Automatically wraps to multiple lines**
   - Textarea expands as needed

**Text color automatically adjusts for readability:**
- Dark text on light backgrounds
- Light text on dark backgrounds

### Step 7: Export

Below the canvas, click either:

**Export PNG**
- High-quality raster image
- 2× pixel ratio for crisp display
- Best for social media and email

**Export SVG**
- Vector format
- Scalable without quality loss
- Best for web and print

**File downloads automatically with timestamp in filename.**

## Tips & Best Practices

### For Best Results

1. **Start with output size** - This affects all other proportions
2. **Choose fill first** - Helps visualize the rest
3. **Add notches sparingly** - 1-2 notches often looks better than 3
4. **Keep pill text short** - 3-8 characters works best
5. **Test title length** - Long titles may need manual line breaks

### Common Use Cases

**Product Launch Announcement**
- Output: Instagram Square
- Fill: Primary Blue
- Notch: Top Right
- Pill: ⭐ "NEW"
- Title: "Introducing [Product]"

**Sale Promotion**
- Output: Facebook Post
- Fill: Accent Coral
- Notches: Top Right, Bottom Left
- Pill: 🔥 "SALE"
- Title: "Limited Time Offer"

**Event Banner**
- Output: Web Banner
- Fill: Image (event photo)
- Notch: Top Right
- Pill: → "REGISTER"
- Title: "Join Us [Date]"

### Understanding Auto-Layout

The **pill component** uses "auto-layout" behavior:

1. **Content determines size**
   - Icon + text + padding = pill width
   - You don't set width manually

2. **Grows to the left**
   - Right edge position is fixed
   - Adding text pushes left edge outward
   - Mimics right-aligned text behavior

3. **Smart positioning**
   - Automatically avoids top-right notch
   - Maintains consistent gap (16px)
   - Never overlaps frame edge

### Geometry Rules Explained

**Why can't I edit the radius freely?**
- Consistency across all marketing materials
- Ensures brand recognition
- Prevents visual chaos from arbitrary values

**Why do notches match corner radius?**
- Visual harmony and balance
- Predictable, professional appearance
- Easier for non-designers to use correctly

**Why is the pill right-aligned?**
- Western reading pattern (left-to-right)
- Draws eye to call-to-action
- Balances with text area at bottom

## Troubleshooting

### "Export failed" error
- Try a different browser (Chrome/Edge recommended)
- Ensure image is fully loaded before exporting
- Check browser console for specific errors

### Pill overlaps frame edge
- This shouldn't happen due to auto-positioning
- If it does, reduce pill text length
- Or remove top-right notch to create more space

### Text is cut off
- Description auto-wraps, but very long text may overflow
- Keep description under ~150 characters
- Use concise marketing copy

### Image looks stretched
- Images are never stretched - they're cropped
- Try a different image with better composition
- Or adjust frame aspect ratio (output size)

### Colors don't match brand
- Update `src/tokens/design-tokens.ts`
- Modify `BRAND_COLORS` object
- Restart dev server to see changes

## Keyboard Shortcuts

Currently none - all interactions are point-and-click for simplicity.

## Browser Support

**Recommended:**
- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+

**Export functionality requires modern browser with Canvas API support.**

## File Naming

Exported files use this pattern:
```
flow-frame-[timestamp].png
flow-frame-[timestamp].svg
```

Example: `flow-frame-1704835200000.png`

**Tip:** Rename files immediately after export for better organization.

## Need Help?

For technical issues or feature requests, contact the development team.

For design guidance or brand questions, contact the marketing team.
