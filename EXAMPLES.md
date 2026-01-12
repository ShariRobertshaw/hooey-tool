# Flow Frame Generator - Examples & Patterns

This document provides concrete examples of how to use the Flow Frame Generator for common marketing scenarios.

## Example 1: Product Launch Announcement

**Use Case:** Announcing a new product on Instagram

**Configuration:**
- **Output Size:** Instagram Square (1080×1080)
- **Corner Radius:** MEDIUM
- **Fill:** Primary Blue
- **Notches:** Top Right
- **Pill:** ⭐ "NEW"
- **Title:** "Introducing FlowPro"
- **Description:** "The next generation of workflow automation. Available now."

**Why This Works:**
- Square format perfect for Instagram feed
- Single notch creates visual interest without complexity
- "NEW" pill with star icon draws attention
- Blue background conveys trust and professionalism
- Clear, concise copy

**Visual Pattern:**
```
┌─────────────────────────┐
│                    ╱────┤  ← Notch (top-right)
│                         │
│              [⭐ NEW]    │  ← Pill (right-aligned)
│                         │
│                         │
│  Introducing FlowPro   │  ← Title
│  The next generation   │  ← Description
│  of workflow...        │
└─────────────────────────┘
```

---

## Example 2: Limited-Time Sale

**Use Case:** Promoting a flash sale on Facebook

**Configuration:**
- **Output Size:** Facebook Post (1200×630)
- **Corner Radius:** LARGE
- **Fill:** Accent Coral
- **Notches:** Top Right, Bottom Left
- **Pill:** 🔥 "SALE"
- **Title:** "48 Hour Flash Sale"
- **Description:** "Up to 50% off selected items. Don't miss out!"

**Why This Works:**
- Horizontal format fits Facebook feed
- Coral color creates urgency and excitement
- Two notches add dynamic energy
- Fire emoji reinforces urgency
- Large radius softens the urgent message

**Visual Pattern:**
```
┌──────────────────────────────────┐
│                             ╱────┤
│                                  │
│                     [🔥 SALE]    │
│                                  │
│  48 Hour Flash Sale             │
│  Up to 50% off...               │
└────╲────────────────────────────┘
```

---

## Example 3: Event Registration

**Use Case:** Web banner for conference registration

**Configuration:**
- **Output Size:** Web Banner (1920×600)
- **Corner Radius:** SMALL
- **Fill:** Image (conference venue photo)
- **Notches:** Top Right
- **Pill:** → "REGISTER"
- **Title:** "TechConf 2026"
- **Description:** "Join industry leaders. March 15-17, San Francisco."

**Why This Works:**
- Wide banner fits website header
- Image fill shows venue, creates context
- Arrow pill points to action
- Small radius keeps it professional
- White text contrasts with photo

**Visual Pattern:**
```
┌─────────────────────────────────────────────────┐
│  [Photo of conference venue]              ╱────┤
│                                                 │
│                              [→ REGISTER]      │
│  TechConf 2026                                 │
│  Join industry leaders...                      │
└─────────────────────────────────────────────────┘
```

---

## Example 4: Minimalist Announcement

**Use Case:** Clean, simple Instagram story

**Configuration:**
- **Output Size:** Instagram Story (1080×1920)
- **Corner Radius:** MEDIUM
- **Fill:** White
- **Notches:** None
- **Pill:** ✓ "CONFIRMED"
- **Title:** "We're Hiring"
- **Description:** "Multiple positions open. Apply today at careers.company.com"

**Why This Works:**
- Vertical format for Stories
- White background = clean, professional
- No notches = minimal distraction
- Check mark = positive reinforcement
- Plenty of breathing room

**Visual Pattern:**
```
┌──────────────┐
│              │
│              │
│              │
│ [✓CONFIRMED] │
│              │
│              │
│              │
│              │
│ We're Hiring │
│ Multiple...  │
│              │
└──────────────┘
```

---

## Example 5: Bold Brand Statement

**Use Case:** Twitter post with strong visual impact

**Configuration:**
- **Output Size:** Twitter Post (1200×675)
- **Corner Radius:** LARGE
- **Fill:** Black
- **Notches:** Top Right, Bottom Right, Bottom Left (3 notches)
- **Pill:** ⚡ "POWER"
- **Title:** "Built Different"
- **Description:** "Performance that speaks for itself."

**Why This Works:**
- Twitter card format
- Black background = bold, confident
- Maximum notches = maximum impact
- Lightning bolt = energy, power
- Short, punchy copy

**Visual Pattern:**
```
┌──────────────────────────────────┐
│                             ╱────┤
│                                  │
│                      [⚡ POWER]  │
│                                  │
│  Built Different                │
│  Performance that...        ────╲┤
└────╲────────────────────────────┘
```

---

## Example 6: Email Header

**Use Case:** Newsletter header image

**Configuration:**
- **Output Size:** Email Header (600×400)
- **Corner Radius:** SMALL
- **Fill:** Secondary Teal
- **Notches:** Top Right
- **Pill:** ✨ "MONTHLY"
- **Title:** "Newsletter"
- **Description:** "Your monthly dose of industry insights and updates."

**Why This Works:**
- Email-safe dimensions
- Teal is calming, professional
- Single notch adds interest
- Sparkle emoji = valuable content
- Small radius = traditional, trustworthy

**Visual Pattern:**
```
┌─────────────────────┐
│                ╱────┤
│                     │
│        [✨ MONTHLY] │
│                     │
│  Newsletter        │
│  Your monthly...   │
└─────────────────────┘
```

---

## Pattern Library

### Notch Patterns

**Single Notch (Subtle)**
- Best for: Professional, clean designs
- Placement: Top Right (most common)
- Effect: Gentle asymmetry

**Two Notches (Balanced)**
- Best for: Dynamic but controlled
- Placement: Diagonal (Top Right + Bottom Left)
- Effect: Visual movement

**Three Notches (Bold)**
- Best for: Maximum impact
- Placement: Avoid adjacent corners
- Effect: Strong geometric statement

### Color Strategies

**High Contrast (Dark bg + White text)**
- Primary Blue, Neutral Dark, Black
- Best for: Bold statements, calls to action
- Readability: Excellent

**Light & Airy (Light bg + Dark text)**
- White, Neutral Light
- Best for: Minimalist, professional
- Readability: Excellent

**Vibrant (Bright bg + White text)**
- Accent Coral, Secondary Teal
- Best for: Sales, events, excitement
- Readability: Good

**Image Fill**
- Best for: Context, storytelling
- Tip: Choose images with clear focal point
- Readability: Varies (add text shadow if needed)

### Pill Strategies

**Call to Action**
- Icons: → (arrow), ⚡ (bolt)
- Text: "REGISTER", "SHOP", "LEARN"
- Best for: Driving action

**Status Indicator**
- Icons: ✓ (check), ⭐ (star), 🏆 (trophy)
- Text: "NEW", "VERIFIED", "WINNER"
- Best for: Announcements, achievements

**Urgency**
- Icons: 🔥 (fire), ⚡ (bolt)
- Text: "SALE", "LIMITED", "NOW"
- Best for: Promotions, deadlines

**Category Tag**
- Icons: None or subtle
- Text: "MONTHLY", "FEATURED", "PREMIUM"
- Best for: Content categorization

### Typography Guidelines

**Title Length**
- Ideal: 2-4 words
- Maximum: ~30 characters
- Style: Short, punchy, memorable

**Description Length**
- Ideal: 1-2 sentences
- Maximum: ~120 characters
- Style: Clear, benefit-focused

**Pill Text Length**
- Ideal: 3-8 characters
- Maximum: 12 characters
- Style: ALL CAPS, single word

---

## Common Mistakes to Avoid

### ❌ Too Many Notches
**Problem:** Three notches on adjacent corners
**Why It Fails:** Visually chaotic, hard to read
**Solution:** Space notches apart (diagonal pattern)

### ❌ Wrong Aspect Ratio
**Problem:** Using square format for web banner
**Why It Fails:** Doesn't fit the space
**Solution:** Match output size to platform

### ❌ Low Contrast
**Problem:** Light text on light image fill
**Why It Fails:** Unreadable
**Solution:** Choose darker images or use solid fill

### ❌ Too Much Text
**Problem:** Paragraph in description field
**Why It Fails:** Overwhelms the design
**Solution:** Keep it concise, 1-2 sentences max

### ❌ Competing Elements
**Problem:** Three notches + busy image + long pill text
**Why It Fails:** No clear focal point
**Solution:** Simplify - pick 1-2 focal elements

### ❌ Wrong Pill Placement
**Problem:** Pill text too long, overlaps frame
**Why It Fails:** Looks broken
**Solution:** Keep pill text short (3-8 chars)

---

## Platform-Specific Best Practices

### Instagram
**Feed Posts (Square):**
- Use: Instagram Square (1080×1080)
- Notches: 1-2 maximum
- Text: Keep it short (mobile viewing)
- Colors: Bold, eye-catching

**Stories (Vertical):**
- Use: Instagram Story (1080×1920)
- Notches: 0-1 (keep it clean)
- Text: Centered or bottom-aligned
- Colors: High contrast for quick viewing

### Facebook
**Feed Posts:**
- Use: Facebook Post (1200×630)
- Notches: 1-2 for interest
- Text: Benefit-focused
- Colors: Professional but engaging

### Twitter
**Cards:**
- Use: Twitter Post (1200×675)
- Notches: 1-2 maximum
- Text: Punchy, quotable
- Colors: Bold statements work well

### Email
**Headers:**
- Use: Email Header (600×400)
- Notches: 0-1 (keep it simple)
- Text: Clear subject line style
- Colors: Brand colors, professional

### Web
**Banners:**
- Use: Web Banner (1920×600)
- Notches: 1-2 for visual interest
- Text: Clear value proposition
- Colors: Match website theme

---

## Seasonal Templates

### Holiday Sale
- Fill: Accent Coral or Primary Blue
- Notches: 2-3 (festive energy)
- Pill: 🔥 "SALE" or 🎁 (if added to icon set)
- Radius: LARGE (friendly, approachable)

### Professional Announcement
- Fill: Neutral Dark or Primary Blue
- Notches: 0-1 (clean, focused)
- Pill: ✓ "CONFIRMED" or → "LEARN"
- Radius: SMALL (traditional, trustworthy)

### Event Promotion
- Fill: Image (event venue/theme)
- Notches: 1-2 (dynamic)
- Pill: → "REGISTER" or ⭐ "FEATURED"
- Radius: MEDIUM (balanced)

### Product Launch
- Fill: Primary Blue or Secondary Teal
- Notches: 1 (subtle asymmetry)
- Pill: ⭐ "NEW" or ⚡ "POWER"
- Radius: MEDIUM (modern, clean)

---

## A/B Testing Ideas

### Test 1: Notch Count
- **Variant A:** No notches
- **Variant B:** 1 notch (top right)
- **Variant C:** 2 notches (diagonal)
- **Measure:** Click-through rate

### Test 2: Color Psychology
- **Variant A:** Primary Blue (trust)
- **Variant B:** Accent Coral (urgency)
- **Variant C:** Secondary Teal (calm)
- **Measure:** Engagement rate

### Test 3: Pill Icon
- **Variant A:** ⭐ (achievement)
- **Variant B:** → (action)
- **Variant C:** 🔥 (urgency)
- **Measure:** Conversion rate

### Test 4: Corner Radius
- **Variant A:** SMALL (traditional)
- **Variant B:** MEDIUM (balanced)
- **Variant C:** LARGE (friendly)
- **Measure:** Brand perception

---

## Quick Reference Chart

| Use Case | Size | Radius | Notches | Pill | Color |
|----------|------|--------|---------|------|-------|
| Instagram Post | Square | Medium | 1-2 | ⭐ NEW | Blue |
| Facebook Ad | FB Post | Large | 2 | 🔥 SALE | Coral |
| Web Banner | Banner | Small | 1 | → LEARN | Image |
| Email Header | Email | Small | 0-1 | ✨ MONTHLY | Teal |
| Twitter Card | Twitter | Medium | 1-2 | ⚡ POWER | Dark |
| Story | IG Story | Medium | 0-1 | ✓ CONFIRMED | White |

---

## Inspiration Sources

When creating frames, consider:
- **Brand Guidelines:** Stay consistent with existing materials
- **Platform Context:** Match the platform's visual language
- **Audience:** Professional vs. casual tone
- **Goal:** Awareness vs. conversion vs. engagement
- **Competition:** Stand out but stay on-brand

---

## Getting Started Checklist

- [ ] Choose platform/output size
- [ ] Select corner radius (start with MEDIUM)
- [ ] Pick fill (solid color or image)
- [ ] Add 0-2 notches (start simple)
- [ ] Configure pill (icon + short text)
- [ ] Write title (2-4 words)
- [ ] Write description (1-2 sentences)
- [ ] Preview on actual device/platform
- [ ] Export and test
- [ ] Iterate based on performance

---

## Need More Examples?

The best way to learn is to experiment! Try creating frames for:
1. Your next product launch
2. A fictional sale event
3. An upcoming webinar
4. A company milestone
5. A seasonal greeting

**Remember:** The constraints are there to help you create consistent, professional graphics quickly. Embrace them!
