# 👋 Welcome to Flow Frame Generator

**A constrained shape-generation tool for creating consistent, branded marketing graphics.**

---

## 🚀 Get Started in 3 Steps

### 1️⃣ Install
```bash
npm install
```

### 2️⃣ Run
```bash
npm run dev
```

### 3️⃣ Open
Navigate to `http://localhost:5173` in your browser

**That's it!** You're ready to create branded graphics.

---

## 📚 Documentation Guide

Choose your path based on your role:

### 👤 I'm a Marketing User (Non-Technical)

**Start here:**
1. 📖 **[QUICK_START.md](QUICK_START.md)** - 5-minute tutorial
2. 📘 **[USAGE_GUIDE.md](USAGE_GUIDE.md)** - Complete user manual
3. 🎨 **[EXAMPLES.md](EXAMPLES.md)** - Real-world examples & patterns

**You'll learn:**
- How to create frames step-by-step
- What each control does
- Best practices for different platforms
- Common mistakes to avoid

---

### 👨‍💻 I'm a Developer

**Start here:**
1. 📄 **[README.md](README.md)** - Project overview
2. 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical deep-dive
3. 📊 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project details

**You'll learn:**
- How the geometry engine works
- Design token system
- Component architecture
- How to extend the tool

---

### 🎯 I'm a Project Manager

**Start here:**
1. 📊 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview
2. 📘 **[USAGE_GUIDE.md](USAGE_GUIDE.md)** - User capabilities
3. 🎨 **[EXAMPLES.md](EXAMPLES.md)** - Use cases

**You'll learn:**
- What the tool can and cannot do
- Project status and metrics
- Training resources for team
- Future enhancement possibilities

---

## 🎯 What This Tool Does

### ✅ You Can:
- Choose from 6 predefined output sizes (Instagram, Facebook, Twitter, etc.)
- Select from 3 corner radius sizes (Small, Medium, Large)
- Pick from 7 brand colors or upload an image
- Add 0-3 notches to corners for visual interest
- Include an optional pill with icon and text
- Add title and description text
- Export as PNG or SVG

### ❌ You Cannot:
- Create custom dimensions
- Edit vector paths manually
- Use colors outside the brand palette
- Place notches on edges (corners only)
- Add more than 3 notches
- Use custom fonts or sizes
- Distort or skew shapes

**Why?** These constraints ensure visual consistency across all marketing materials.

---

## 🎨 Quick Example

**Goal:** Create an Instagram post announcing a new product

**Steps:**
1. Output Size → "Instagram Square"
2. Fill → Click blue color swatch
3. Notches → Click "TOP RIGHT"
4. Pill → Icon: ⭐, Text: "NEW"
5. Title → "Introducing FlowPro"
6. Description → "The next generation of workflow automation."
7. Click "Export PNG"

**Done!** You have a consistent, branded graphic ready to post.

---

## 📖 Documentation Index

| Document | Purpose | Audience | Time |
|----------|---------|----------|------|
| **START_HERE.md** | You are here! | Everyone | 2 min |
| **QUICK_START.md** | 5-minute tutorial | New users | 5 min |
| **README.md** | Project overview | Developers | 10 min |
| **USAGE_GUIDE.md** | Complete user manual | Marketing users | 30 min |
| **EXAMPLES.md** | Real-world examples | Marketing users | 20 min |
| **ARCHITECTURE.md** | Technical deep-dive | Developers | 45 min |
| **PROJECT_SUMMARY.md** | Complete project details | Everyone | 15 min |

---

## 🔧 System Requirements

- **Node.js:** 16.0 or higher
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- **OS:** macOS, Windows, or Linux
- **RAM:** 4GB minimum
- **Disk Space:** 500MB for dependencies

---

## 🎓 Learning Path

### For Marketing Users (Non-Technical)

**Day 1: Basics (30 minutes)**
1. Read `QUICK_START.md`
2. Create 3 test frames
3. Export and review

**Day 2: Best Practices (1 hour)**
1. Read `USAGE_GUIDE.md`
2. Review `EXAMPLES.md`
3. Create frames for actual campaigns

**Day 3: Mastery (30 minutes)**
1. Experiment with all options
2. Test on actual platforms
3. Share with team

**Total time investment:** ~2 hours to full proficiency

---

### For Developers (Technical)

**Phase 1: Understanding (1 hour)**
1. Read `README.md`
2. Run the app locally
3. Explore the UI

**Phase 2: Architecture (2 hours)**
1. Read `ARCHITECTURE.md`
2. Review `src/tokens/design-tokens.ts`
3. Study `src/utils/geometry.ts`
4. Examine components

**Phase 3: Extension (varies)**
1. Identify extension points
2. Make modifications
3. Test thoroughly

**Total time investment:** ~3 hours to full understanding

---

## 🎯 Common Use Cases

### 1. Social Media Posts
- **Sizes:** Instagram Square, Facebook Post, Twitter Post
- **Best for:** Product announcements, promotions, quotes

### 2. Instagram Stories
- **Size:** Instagram Story
- **Best for:** Behind-the-scenes, polls, quick updates

### 3. Email Marketing
- **Size:** Email Header
- **Best for:** Newsletter headers, promotional emails

### 4. Website Banners
- **Size:** Web Banner
- **Best for:** Hero sections, promotional banners

---

## 🎨 Design Philosophy

### Constraints Enable Creativity

This tool intentionally limits options to ensure:
- **Consistency** - All graphics look like they're from the same brand
- **Speed** - No decision paralysis from too many options
- **Quality** - Impossible to create off-brand materials
- **Accessibility** - Non-designers can create professional graphics

### The "Flow Frame" System

- **Flow** - Smooth, organic shapes with notches and curves
- **Frame** - Structured, predictable geometry
- **System** - Repeatable rules that scale

---

## 🆘 Getting Help

### Quick Questions
- Check the relevant documentation file
- See "Troubleshooting" sections in guides

### Technical Issues
- Review `ARCHITECTURE.md` for technical details
- Check browser console for errors

### Feature Requests
- Review "Future Enhancements" in `PROJECT_SUMMARY.md`
- Consider if it aligns with constraint-first philosophy

---

## ✅ Project Status

**Status:** ✅ **COMPLETE & PRODUCTION-READY**

All v1.0 requirements delivered:
- ✅ Constrained shape generation
- ✅ Strict geometry system
- ✅ Safe UI controls
- ✅ PNG/SVG export
- ✅ Comprehensive documentation

**Ready to use immediately!**

---

## 🎯 Next Steps

### If You're a User:
1. Run `npm install` and `npm run dev`
2. Read `QUICK_START.md`
3. Create your first frame
4. Review `EXAMPLES.md` for inspiration

### If You're a Developer:
1. Run `npm install` and `npm run dev`
2. Read `ARCHITECTURE.md`
3. Explore the codebase
4. Consider extensions or customizations

### If You're a Manager:
1. Review `PROJECT_SUMMARY.md`
2. Plan team training (use `USAGE_GUIDE.md`)
3. Identify first use cases
4. Schedule rollout

---

## 📞 Support Resources

### Documentation
- All documentation is in this folder
- Start with the file that matches your role
- Follow the learning path above

### Code
- Well-commented source code
- TypeScript provides inline documentation
- Centralized design tokens for easy customization

### Examples
- 6 complete examples in `EXAMPLES.md`
- Pattern library for common scenarios
- Platform-specific guidelines

---

## 🎉 Welcome Aboard!

You now have a powerful tool for creating consistent, branded marketing graphics.

**Remember:**
- Constraints are your friend
- Start simple, then experiment
- Export and test on actual platforms
- Share your creations with the team

**Happy frame-making! 🚀**

---

## 📋 Quick Reference Card

```
┌─────────────────────────────────────────┐
│  FLOW FRAME GENERATOR QUICK REFERENCE   │
├─────────────────────────────────────────┤
│                                         │
│  📐 Output Sizes: 6 presets             │
│  🎨 Colors: 7 brand colors              │
│  ⚙️  Radius: Small / Medium / Large     │
│  ✂️  Notches: 0-3, corners only         │
│  💊 Pill: Icon + Text (optional)        │
│  📝 Text: Title + Description           │
│  💾 Export: PNG or SVG                  │
│                                         │
│  🚫 No custom dimensions                │
│  🚫 No freeform editing                 │
│  🚫 No arbitrary values                 │
│                                         │
│  ✅ Consistency guaranteed              │
│                                         │
└─────────────────────────────────────────┘
```

---

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Status:** Production Ready ✅
