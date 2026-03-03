# CJN IT Solutions - Design System: Fonts & Colors

**Last Updated:** March 3, 2026  
**Canonical Palette Source:** `Complementary colors.txt`

---

## 1. TYPOGRAPHY / FONTS

### Font Families

The website uses Google Fonts with the following font stack:

#### **1. Inter** (Primary Sans-Serif)
- **Usage:** Body text, subheadings, general content, form labels, section kickers
- **Weight Variants:** 400, 500, 600, 700
- **Implement:** `font-family: 'Inter', sans-serif;` or CSS variable `var(--font-inter)`
- **Tailwind Class:** `font-sans` / `font-subheading`
- **CSS Variable:** `--font-inter`

#### **2. Montserrat** (Display/Heading Font)
- **Usage:** H1, H2 headings, prominent display text, button labels
- **Weight Variants:** 500, 600, 700, 800, 900
- **Implement:** `font-family: 'Montserrat', sans-serif;` or CSS variable `var(--font-montserrat)`
- **Tailwind Class:** `font-display`
- **CSS Variable:** `--font-montserrat`

### Font Usage in HTML Structure
```
H1, H2        → Montserrat (font-display)
H3-H6         → Inter (font-sans)
Body Text     → Inter (font-sans, default)
Subheadings   → Inter (font-subheading)
Kickers       → Inter uppercase, tracking-widest, bold
```

### Font Loading Configuration
- **Display Strategy:** Font Swap (`display: 'swap'`) — fonts display immediately with fallback, then swap when loaded
- **Subsets:** Latin
- **Framework:** Next.js Google Fonts (automatic optimization)

---

## 2. COLOR PALETTE — Complementary Colors

> The canonical palette is defined in `Complementary colors.txt` and mapped to both CSS custom properties (in `globals.css`) and the Tailwind color theme (in `tailwind.config.ts`).

### Core Brand Colors

#### **Brand Blue** (Primary)
- **Hex Code:** `#03318C`
- **RGB:** `rgb(3, 49, 140)`
- **CSS Variable:** `--brand-blue` / `--liquid-blue-deep`
- **Tailwind:** `brand-blue`
- **Usage:** Primary CTAs, hover states, links, accents, interactive elements, gradient endpoints

#### **Brand Blue Strong**
- **Hex Code:** `#022873`
- **RGB:** `rgb(2, 40, 115)`
- **CSS Variable:** `--liquid-blue-strong`
- **Usage:** Deeper blue for shadows, gradient dark stops

#### **Brand Blue Core** (Vibrant)
- **Hex Code:** `#165FF2`
- **RGB:** `rgb(22, 95, 242)`
- **CSS Variable:** `--liquid-blue-core`
- **Usage:** Bright accent blue, liquid glass glow, ripple effects, scroll progress bar midpoint

#### **Brand Cyan** (Accent 1)
- **Hex Code:** `#3B8DBF`
- **RGB:** `rgb(59, 141, 191)`
- **CSS Variable:** `--brand-cyan` / `--liquid-blue-soft`
- **Tailwind:** `brand-cyan`
- **Usage:** Gradient text accents (Hero H1), menu overlay text, liquid ripple

#### **Brand White**
- **Hex Code:** `#F2F2F2`
- **RGB:** `rgb(242, 242, 242)`
- **CSS Variable:** `--liquid-white`
- **Usage:** Glass morphism border tint, soft background, liquid glass border

#### **Brand Dark** (Primary Text/Backgrounds)
- **Hex Code:** `#020617`
- **RGB:** `rgb(2, 6, 23)`
- **CSS Variable:** `--brand-dark`
- **Tailwind:** `brand-dark`
- **Usage:** Primary button backgrounds, dark text, primary interface color
- **Description:** Near-black, very dark blue-grey (Tailwind slate-950)

---

### Orange Accents

#### **Brand Orange** (Primary Orange)
- **Hex Code:** `#F29216`
- **RGB:** `rgb(242, 146, 22)`
- **CSS Variable:** `--brand-orange` / `--liquid-orange`
- **Tailwind:** `brand-orange`
- **Usage:** Text selection, highlight text, accent highlights, secondary CTAs, liquid ripple effects

#### **Brand Orange Deep** (Secondary Orange)
- **Hex Code:** `#BF4904`
- **RGB:** `rgb(191, 73, 4)`
- **CSS Variable:** `--liquid-orange-deep`
- **Usage:** Deep orange for gradients, shadows

#### **Brand Orange Highlight** (Warm Orange)
- **Hex Code:** `#BF5B04`
- **RGB:** `rgb(191, 91, 4)`
- **CSS Variable:** `--brand-orange-highlight` / `--liquid-orange-warm`
- **Tailwind:** `brand-orangeHighlight`
- **Usage:** Logo "Solutions" text, hover states, emphasized accents, `.btn-accent` buttons

---

### Complementary Accents

#### **Brand Yellow**
- **Hex Code:** `#F2C916`
- **RGB:** `rgb(242, 201, 22)`
- **CSS Variable:** `--liquid-yellow`
- **Usage:** Reserved — available for micro-interactions (success states, badges, star ratings)

#### **Brand Slate**
- **Hex Code:** `#445373`
- **RGB:** `rgb(68, 83, 115)`
- **CSS Variable:** `--liquid-slate`
- **Usage:** ServiceShowcase card icon accent (Business Continuity), muted blue-grey

---

### Neutral Colors (System Palette)

These colors are from Tailwind's default slate palette:

#### **Whites**
- **Pure White:** `#FFFFFF` — Page backgrounds, card backgrounds
- **Near White / Brand White:** `#F2F2F2` — Soft backgrounds, glass borders

#### **Grays/Slates**
- **Slate 200:** `#E2E8F0` — Borders, divider lines, input borders
- **Slate 300:** `#CBD5E1` — Scrollbar thumb, subtle borders
- **Slate 600:** `#475569` — Secondary body text
- **Slate 700:** `#334155` — Primary body text on light backgrounds (WCAG AA minimum)
- **Slate 950:** `#030712` — Near black for dark sections

---

## 3. LIQUID GLASS SYSTEM COLORS

### Glass Morphism Tokens (CSS Custom Properties)

```css
:root {
  /* Liquid ripple effects */
  --liquid-ripple: rgba(242, 146, 22, 0.22);        /* Orange ripple */
  --liquid-ripple-strong: rgba(242, 146, 22, 0.36);  /* Orange ripple strong */
  --liquid-ripple-blue: rgba(59, 141, 191, 0.16);    /* Blue ripple */
  --liquid-ripple-blue-strong: rgba(22, 95, 242, 0.22); /* Blue ripple strong */
  --liquid-glow: rgba(22, 95, 242, 0.18);            /* Blue glow */
  --liquid-glass-border: rgb(242 242 242 / 0.44);    /* Glass border */
}
```

### Glass Card Variants

#### **`.glass-card`** — Standard glass panel
- **Border:** `rgb(191, 219, 254 / 0.68)`
- **Background:** Multi-stop gradient from light blue at 50% → 38% → 30% opacity
- **Backdrop blur:** 16px

#### **`.glass-card-strong`** — Emphasized glass panel
- **Border:** `rgb(191, 219, 254 / 0.76)`
- **Background:** More opaque gradient (60% → 46% → 34%)
- **Backdrop blur:** 20px

#### **`.glass-card-accent`** — Warm-tinted glass panel
- Uses warm red-shifted backgrounds
- Used for menu overlay info panel

---

## 4. INTERACTIVE ELEMENT COLORS

### Button States

**`.btn-primary`**
- **Background:** `brand-dark` (`#020617`)
- **Text:** White
- **Hover Background:** `brand-blue` (`#03318C`)
- **Shadow:** `rgba(2, 6, 23, 0.2)` → `rgba(3, 49, 140, 0.2)` on hover

**`.btn-accent`**
- **Background:** `#BF5B04` (brand-orangeHighlight)
- **Text:** White
- **Hover Background:** Lighter orange
- **Shadow:** `rgba(191, 91, 4, 0.25)` → `rgba(242, 146, 22, 0.3)` on hover

### Form Elements
- **Background:** White
- **Border:** `slate-200` (`#E2E8F0`)
- **Focus Border:** `brand-blue` (`#03318C`)
- **Focus Ring:** `brand-blue` 1px ring
- **Focus Glow:** `rgba(3, 49, 140, 0.08)` — 4px expanding ring shadow
- **Text Color:** `brand-dark` (`#020617`)

### Text Selection
- **Background:** `#F29216` (brand-orange)
- **Text Color:** White

### Scroll Progress Bar
- **Height:** 3px, fixed top
- **Gradient:** `brand-blue` → `liquid-blue-core` → `brand-orange`

---

## 5. 3D/CANVAS COLORS (Animated Globe)

#### **Globe Color Palette**
- **Deep Color:** `#579AF6` (Bright blue)
- **Highlight Color:** `#165EA8` (Medium dark blue)
- **Fresnel Color:** `#123D66` (Very dark blue)

#### **Light & Material Colors**
- **Light Color:** `#FFFFFF` (Pure white)
- **Attenuated Light:** `#E0F7FE` (Very light cyan)
- **Sheen Color:** `#03318C` (Brand blue)

---

## 6. TAILWIND COLOR THEME EXTENSION

### Configured in `tailwind.config.ts`
```typescript
colors: {
  brand: {
    blue: '#03318C',       // Complementary palette primary blue
    cyan: '#3B8DBF',       // Complementary palette soft blue
    dark: '#020617',       // Near-black (slate-950)
    orange: '#F29216',     // Complementary palette primary orange
    orangeHighlight: '#BF5B04',  // Complementary palette warm orange
  },
}
```

### Usage in Tailwind
- `bg-brand-blue` → Background color (`#03318C`)
- `text-brand-orange` → Text color (`#F29216`)
- `border-brand-cyan` → Border color (`#3B8DBF`)
- `text-brand-orangeHighlight` → Emphasized orange (`#BF5B04`)

---

## 7. CSS VARIABLES REFERENCE

All brand and liquid system colors are available as CSS custom properties:

```css
:root {
  /* Brand tokens */
  --brand-blue: #03318c;
  --brand-cyan: #3b8dbf;
  --brand-dark: #020617;
  --brand-orange: #f29216;
  --brand-orange-highlight: #bf5b04;

  /* Liquid glass palette (full complementary set) */
  --liquid-blue-deep: #03318c;
  --liquid-blue-strong: #022873;
  --liquid-blue-core: #165ff2;
  --liquid-blue-soft: #3b8dbf;
  --liquid-white: #f2f2f2;
  --liquid-orange: #f29216;
  --liquid-orange-deep: #bf4904;
  --liquid-orange-warm: #bf5b04;
  --liquid-yellow: #f2c916;
  --liquid-slate: #445373;

  /* Font variables */
  --font-inter: 'Inter', sans-serif;
  --font-montserrat: 'Montserrat', sans-serif;
}
```

---

## 8. COLOR PSYCHOLOGY & USAGE

| Color | Hex | Purpose | Emotion |
|-------|-----|---------|---------|
| Brand Blue | `#03318C` | Trust, reliability, CTAs | Professional, Secure |
| Blue Core | `#165FF2` | Energy, interactive glow | Modern, Energetic |
| Brand Cyan | `#3B8DBF` | Gradient text, soft accents | Calm, Approachable |
| Brand Dark | `#020617` | Authority, primary text | Strong, Premium |
| Brand Orange | `#F29216` | Warmth, selection, highlights | Creative, Friendly |
| Orange Highlight | `#BF5B04` | Emphasis, CTA buttons | Bold, Dynamic |
| Yellow | `#F2C916` | Success, micro-interactions | Optimistic, Energetic |
| Slate | `#445373` | Muted accents | Grounded, Subtle |

---

## 9. ACCESSIBILITY CONSIDERATIONS

- **Minimum text contrast:** `text-slate-700` on light backgrounds (WCAG AA compliant)
- **Selection highlight:** Orange (`#F29216`) on white — high contrast
- **Focus states:** Brand blue ring + 4px glow shadow for visibility
- **Skip navigation:** Hidden link, visible on focus with brand-blue background
- **Focus trap:** Menu overlay traps focus with Tab cycling
- **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`

---

## 10. IMPLEMENTATION GUIDE

### Using Brand Colors in Components
```tsx
// Tailwind classes (preferred)
<button className="bg-brand-blue text-white hover:bg-brand-dark">CTA</button>
<span className="text-brand-orange">Highlighted</span>

// CSS variables (for dynamic usage)
<div style={{ color: 'var(--brand-blue)' }}>Text</div>

// Liquid system references
<div style={{ background: 'var(--liquid-blue-core)' }}>Glow</div>

// Opacity variants via Tailwind
<div className="bg-brand-blue/20">Soft blue tint</div>
```

### Creating New Components
1. Always use brand color tokens from the complementary palette first
2. Use Tailwind's slate palette for neutrals (slate-200 for borders, slate-700 for text)
3. Reserve direct hex values for 3D/Canvas elements only
4. Test contrast ratios for accessibility — minimum slate-700 text on light backgrounds
5. Use liquid system CSS variables for glass morphism effects

---

**Note:** This design system is built on the Complementary Colors palette defined in `Complementary colors.txt`. All implementations in `globals.css`, `tailwind.config.ts`, and component files reference these values.
