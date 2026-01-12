# Quick Start Guide

Get up and running with the Flow Frame Generator in 5 minutes.

## Step 1: Install Dependencies

Open your terminal and navigate to the project directory:

```bash
cd "/Users/sharipoirier/Documents/_1Freelance/Hooey/Clinigen TEST"
```

Install the required packages:

```bash
npm install
```

This will install:
- React (UI framework)
- TypeScript (type safety)
- Vite (build tool)
- html-to-image (export functionality)

**Expected time:** 1-2 minutes

---

## Step 2: Start Development Server

Run the development server:

```bash
npm run dev
```

You should see output like:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Open your browser to:** `http://localhost:5173`

---

## Step 3: Create Your First Frame

You'll see the Flow Frame Generator interface with two sections:

### Left Side: Canvas (Preview Area)
Shows your frame in real-time

### Right Side: Control Panel
All editing controls

### Try This:

1. **Change Output Size**
   - Dropdown at top → Select "Instagram Square"

2. **Pick a Color**
   - Click the blue color swatch (Primary Blue)

3. **Add a Notch**
   - Click "TOP RIGHT" button under Notches

4. **Configure Pill**
   - Make sure "Show Pill" is checked
   - Icon dropdown → Select "⭐ STAR"
   - Text field → Type "NEW"

5. **Add Text**
   - Title field → Type "Hello World"
   - Description → Type "This is my first Flow Frame!"

**You should now see a blue square with a notch, pill, and text!**

---

## Step 4: Export Your Frame

Below the canvas preview, you'll see two buttons:

- Click **"Export PNG"** to download a high-quality image
- Or click **"Export SVG"** for a vector version

The file will download automatically with a timestamp in the filename.

**Congratulations! You've created your first Flow Frame.**

---

## What's Next?

### Learn More
- **For detailed usage:** Read `USAGE_GUIDE.md`
- **For examples:** Read `EXAMPLES.md`
- **For technical details:** Read `ARCHITECTURE.md`

### Experiment
Try different combinations:
- Different output sizes
- Multiple notches (max 3)
- Upload an image as fill
- Different corner radius sizes
- Various icons and text

### Common Questions

**Q: Can I use custom colors?**  
A: No, only the 7 brand colors are available. This ensures consistency.

**Q: Can I add more than 3 notches?**  
A: No, the maximum is 3 to maintain visual balance.

**Q: Why can't I edit the corner radius manually?**  
A: The radius is calculated automatically to ensure consistency across all sizes.

**Q: Can I place notches on the edges?**  
A: No, notches can only be placed in corners.

**Q: The pill is overlapping the frame edge!**  
A: Keep pill text short (3-8 characters works best).

---

## Troubleshooting

### Issue: `npm install` fails
**Solution:** Make sure you have Node.js 16+ installed
```bash
node --version  # Should be v16 or higher
```

### Issue: Port 5173 is already in use
**Solution:** Stop other Vite servers or use a different port
```bash
npm run dev -- --port 3000
```

### Issue: Export button doesn't work
**Solution:** Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)

### Issue: Text is cut off
**Solution:** Keep descriptions under 120 characters

---

## Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

You can preview the production build:

```bash
npm run preview
```

---

## File Structure Overview

```
src/
├── tokens/design-tokens.ts    ← All colors, sizes, spacing
├── types/index.ts             ← TypeScript types
├── utils/geometry.ts          ← Shape calculations
├── components/
│   ├── FlowFrame.tsx          ← Main shape renderer
│   ├── Pill.tsx               ← Pill component
│   └── ControlPanel.tsx       ← UI controls
├── App.tsx                    ← Main app
└── main.tsx                   ← Entry point
```

---

## Keyboard Shortcuts

Currently none - all interactions are point-and-click.

---

## Need Help?

- **Usage questions:** See `USAGE_GUIDE.md`
- **Examples:** See `EXAMPLES.md`
- **Technical details:** See `ARCHITECTURE.md`
- **Project overview:** See `README.md`

---

## Tips for Success

1. **Start simple** - Begin with 0-1 notches
2. **Keep text short** - Titles: 2-4 words, Descriptions: 1-2 sentences
3. **Test on actual platforms** - Export and preview on Instagram, Facebook, etc.
4. **Use high-quality images** - For image fills, use 1080px+ width images
5. **Match the platform** - Use Instagram Square for Instagram, etc.

---

## That's It!

You're ready to create consistent, branded marketing graphics.

**Happy frame-making! 🎨**
