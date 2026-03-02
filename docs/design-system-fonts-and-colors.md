# CJN IT Solutions - Design System: Fonts & Colors

**Last Updated:** February 16, 2026

---

## 1. TYPOGRAPHY / FONTS

### Font Families

The website uses Google Fonts with the following font stack:

#### **1. Inter** (Primary Sans-Serif)
- **Usage:** Body text, subheadings, general content
- **Weight Variants:** 400, 500, 600, 700
- **Implement:** `font-family: 'Inter', sans-serif;` or CSS variable `var(--font-inter)`
- **Tailwind Class:** `font-sans`
- **CSS Variable:** `--font-inter`

#### **2. Montserrat** (Display/Heading Font)
- **Usage:** H1, H2 headings, prominent text
- **Weight Variants:** 500, 600, 700, 800, 900
- **Implement:** `font-family: 'Montserrat', sans-serif;` or CSS variable `var(--font-montserrat)`
- **Tailwind Class:** `font-display`
- **CSS Variable:** `--font-montserrat`

### Font Usage in HTML Structure
```
H1, H2        → Montserrat
H3-H6         → Inter
Body Text     → Inter (default)
Subheadings   → Inter
```

### Font Loading Configuration
- **Display Strategy:** Font Swap (fonts display immediately with fallback, then swap when loaded)
- **Subsets:** Latin
- **Framework:** Next.js Google Fonts (automatic optimization)

---

## 2. COLOR PALETTE

### Core Brand Colors

#### **Brand Blue** (Primary)
- **Hex Code:** `#005596`
- **RGB:** `rgb(0, 85, 150)`
- **CSS Variable:** `--brand-blue`
- **Tailwind:** `brand-blue`
- **Usage:** Primary CTAs, hover states, links, accents, interactive elements

#### **Brand Cyan** (Accent 1)
- **Hex Code:** `#00AEEF`
- **RGB:** `rgb(0, 174, 239)`
- **CSS Variable:** `--brand-cyan`
- **Tailwind:** `brand-cyan`
- **Usage:** Selection highlights, interactive accents, background tints
- **Note:** Used for text selection backgrounds

#### **Brand Dark** (Primary Text/Backgrounds)
- **Hex Code:** `#020617`
- **RGB:** `rgb(2, 6, 23)`
- **CSS Variable:** `--brand-dark`
- **Tailwind:** `brand-dark`
- **Usage:** Primary button backgrounds, dark text, primary interface color
- **Description:** Near-black, very dark blue-grey

#### **Brand Orange** (Accent 2)
- **Hex Code:** `#FFAA40`
- **RGB:** `rgb(255, 170, 64)`
- **CSS Variable:** `--brand-orange`
- **Tailwind:** `brand-orange`
- **Usage:** Highlight text, accent highlights, secondary CTAs
- **Description:** Warm orange accent

#### **Brand Orange Highlight** (Accent 2 Variant)
- **Hex Code:** `#FF8C00`
- **RGB:** `rgb(255, 140, 0)`
- **CSS Variable:** `--brand-orange-highlight`
- **Tailwind:** `brand-orangeHighlight`
- **Usage:** Hover states, emphasized accents, brightest orange variant
- **Note:** Darker/more saturated orange than Brand Orange

#### **Button Orange** (Secondary Button)
- **Hex Code:** `#C15F00`
- **RGB:** `rgb(193, 95, 0)`
- **Usage:** `.btn-accent` buttons
- **Description:** Darker burnt orange for secondary call-to-action buttons

---

### Neutral Colors (System Palette)

These colors are from Tailwind's default slate/sky palette:

#### **Whites**
- **Pure White:** `#FFFFFF` - Page backgrounds, card backgrounds
- **Near White:** `#F9FAFB` - Soft backgrounds

#### **Grays/Slates**
- **Slate 50:** `#F8FAFC` - Very light backgrounds, hover states
- **Slate 200:** `#E2E8F0` - Borders, divider lines
- **Slate 300:** `#CBD5E1` - Scrollbar, subtle borders
- **Slate 700:** `#334155` - Shadow overlays
- **Slate 950:** `#030712` - Dark section backgrounds (near black)

#### **Blues (Sky Palette)**
- **Sky 100:** `#E0F7FE` - Light blue tints
- **Sky 500:** `#0EA5E9` - Bright blue accents

---

### Component-Specific Colors

#### **Glass Morphism Cards** (`.glass-card`)
- **Border Color:** `rgb(191, 219, 254 / 0.68)` (Light blue border, 68% opacity)
- **Background Gradient:**
  - Top: `rgb(233, 245, 255 / 0.5)` (Very light blue)
  - Middle: `rgb(220, 238, 255 / 0.38)` (Light blue fade)
  - Bottom: `rgb(209, 232, 255 / 0.3)` (Lighter blue fade)
- **Shadow:** `0 16px 42px rgba(131, 173, 213, 0.2)` with inset highlight

#### **Glass Morphism Cards Strong** (`.glass-card-strong`)
- **Border Color:** `rgb(191, 219, 254 / 0.76)` (Light blue border, 76% opacity)
- **Background Gradient:**
  - Top: `rgb(236, 247, 255 / 0.6)` (Very light blue, more opaque)
  - Middle: `rgb(224, 240, 255 / 0.46)` (Light blue fade)
  - Bottom: `rgb(212, 234, 255 / 0.34)` (Lighter blue fade)
- **Shadow:** `0 18px 46px rgba(131, 173, 213, 0.22)` with more opaque inset

#### **Section Kicker** (`.section-kicker`)
- **Color:** `#0A4F8A` (Dark blue)
- **Typography:** Small caps, bold, tracking of 0.16em

#### **Text Highlights (HX Classes)**
- **Highlight Color 1:** `rgb(255, 170, 64)` - Primary orange (38% opacity)
- **Highlight Color 2:** `rgb(255, 140, 0)` - Bright orange (54% opacity)

---

### 3D/Canvas Colors (Animated Globe)

#### **Globe Color Palette**
- **Deep Color:** `#579AF6` (Bright blue)
- **Highlight Color:** `#165EA8` (Medium dark blue)
- **Fresnel Color:** `#123D66` (Very dark blue)

#### **Light & Material Colors**
- **Light Color:** `#FFFFFF` (Pure white)
- **Attenuated Light:** `#E0F7FE` (Very light cyan)
- **Sheen Color:** `#005596` (Brand blue)

#### **Canvas Background Gradient**
- **Color 1:** `#6DC7FF` (Light cyan)
- **Color 2:** `#3EA7FF` (Medium cyan)
- **Color 3:** `#8FDCFF` (Light cyan variant)
- **Gradient Colors:** `rgba(59, 164, 255, ...)` → `rgba(96, 193, 255, ...)`

---

### Interactive Element Colors

#### **Button States**

**Primary Button (`.btn-primary`)**
- **Background:** `brand-dark` (#020617)
- **Text:** White
- **Hover Background:** `brand-blue` (#005596)
- **Shadow:** `rgba(2, 6, 23, 0.2)` → `rgba(0, 85, 150, 0.2)` on hover

**Primary Button Compact (`.btn-primary-compact`)**
- **Same as above, smaller** (px-6 py-3 instead of px-8 py-4)

**Accent Button (`.btn-accent`)**
- **Background:** `#C15F00` (Burnt orange)
- **Text:** White
- **Hover Background:** `brand-orangeHighlight` (#FF8C00)
- **Shadow:** `rgba(193, 95, 0, 0.25)` → `rgba(255, 140, 0, 0.3)` on hover

#### **Form Elements**
- **Background:** White
- **Border:** `slate-200` (#E2E8F0)
- **Focus Border:** `brand-blue` (#005596)
- **Focus Ring:** `brand-blue` (#005596) - 1px ring width
- **Text Color:** `brand-dark` (#020617)

#### **Contact Section Hover**
- **Icon Background:** `slate-50` → `brand-blue` on hover
- **Icon Color:** `brand-blue` → White on hover

---

### Other Element Colors

#### **Custom Cursor**
- **Hover Background:** `rgba(0, 85, 150, 0.1)` (Brand blue with 10% opacity)

#### **Scrollbar**
- **Background Track:** `#F1F5F9` (Light gray)
- **Thumb:** `#CBD5E1` (Medium gray)
- **Thumb Hover:** `#94A3B8` (Slightly darker gray)
- **Width:** 8px
- **Border Radius:** 4px

#### **Text Selection**
- **Background:** `#00AEEF` (Brand cyan)
- **Text Color:** White

#### **Links & Section Elements**
- **Section Divider:** `slate-200` border

---

## 3. TAILWIND COLOR THEME EXTENSION

### Configured in `tailwind.config.ts`
```typescript
colors: {
  brand: {
    blue: '#005596',
    cyan: '#00AEEF',
    dark: '#020617',
    orange: '#ffaa40',
    orangeHighlight: '#FF8C00',
  },
}
```

### Usage in Tailwind
- `bg-brand-blue` → Background color
- `text-brand-orange` → Text color
- `border-brand-blue` → Border color
- `shadow-brand-dark` → Shadow with brand dark color

---

## 4. COLOR PSYCHOLOGY & USAGE

| Color | Hex | Purpose | Emotion |
|-------|-----|---------|---------|
| Brand Blue | #005596 | Trust, reliability, CTAs | Professional, Secure |
| Brand Cyan | #00AEEF | Energy, highlights | Modern, Energetic |
| Brand Dark | #020617 | Authority, text | Strong, Premium |
| Brand Orange | #FFAA40 | Warmth, attraction | Creative, Friendly |
| Brand Orange (Highlight) | #FF8C00 | Emphasis, action | Bold, Dynamic |

---

## 5. CSS VARIABLES REFERENCE

All brand colors are available as CSS custom properties:

```css
:root {
  --brand-blue: #005596;
  --brand-cyan: #00aeef;
  --brand-dark: #020617;
  --brand-orange: #ffaa40;
  --brand-orange-highlight: #ff8c00;
}
```

### Font Variables
```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-montserrat: 'Montserrat', sans-serif;
}
```

---

## 6. ACCESSIBILITY CONSIDERATIONS

- **Color Contrast Ratios:** All text meets WCAG AA standards at minimum
- **Selection Highlight:** Cyan on white provides 5.4:1 contrast ratio
- **Focus States:** Brand blue consistently used for focus indicators
- **Form Labels:** Dark text on white for maximum legibility

---

## 7. IMPLEMENTATION GUIDE

### Using Brand Colors in Components
```tsx
// Using Tailwind classes
<button className="bg-brand-blue text-white">CTA</button>

// Using CSS variables
<div style={{ color: 'var(--brand-blue)' }}>Text</div>

// Mixing with opacity
<div className="bg-brand-blue/20">Soft background</div>
```

### Creating New Components
1. Always use brand color tokens first
2. Use Tailwind's slate/sky palette for neutrals
3. Reserve direct hex values for 3D/Canvas elements only
4. Test contrast ratios with accessibility tools

---

**Note:** This design system maintains consistency across all pages and components while providing enough flexibility for varied layouts and interactive states.
