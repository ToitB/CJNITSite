# CJN IT Solutions Design System: Fonts and Colors

**Last Updated:** June 2025

## Canonical Sources

The current design system should be derived from implementation, not older reference notes.

- Primary font source: `app/layout.tsx`
- Primary color token sources: `app/globals.css`, `tailwind.config.ts`
- Implementation-specific color references: `components/BackgroundCanvas.tsx`, `components/AnimatedGlobe.tsx`, `app/export-globe/page.tsx`

`docs/complementary colors.txt` now records both the canonical site palette and the globe shader's derived component colors, but the real source of truth is still the code listed above.

---

## 1. Typography

### Font Stack

The site currently uses two Google fonts via Next.js `next/font/google`.

| Role | Font | Weights Loaded | Subset | Loading Strategy | CSS Variable |
| --- | --- | --- | --- | --- | --- |
| Primary UI and body font | `DM Sans` | `400`, `500`, `600`, `700` | `latin` | `display: 'swap'` | `--font-dm-sans` |
| Display and major heading font | `Sora` | `500`, `600`, `700`, `800` | `latin` | `display: 'swap'` | `--font-sora` |

### Current Font Configuration

```tsx
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});
```

### Semantic Usage Map

| UI Element | Current Font |
| --- | --- |
| `body` default text | `DM Sans` |
| `h1`, `h2` | `Sora` |
| `h3`, `h4`, `h5`, `h6` | `DM Sans` |
| Brand wordmark ("CJN \| IT Solutions") | `Sora` (bold, xl tracking-tight) |
| Brand tagline ("Structured IT, Seamless Business") | `DM Sans` (xs, tracking-wide) |
| Navigation menu items | `Sora` (bold, 4xl–6xl in expanded menu) |
| Navbar dock links | `DM Sans` (xs, uppercase, tracking-widest) |
| UI controls and utility text | Mostly `DM Sans` unless explicitly styled otherwise |
| Hero/display emphasis | `Sora` |

### Practical Typography Guidance

- Use `Sora` where the page needs visual authority or brand presence. Sora's geometric, tech-forward character reinforces the brand's identity as a modern IT solutions provider.
- Use `DM Sans` for readability, UI density, and most interface copy. DM Sans offers excellent legibility at small sizes with a clean, contemporary feel.
- Do not introduce additional font families without a deliberate design-system update.
- `display: swap` is part of the current implementation and should remain the baseline unless typography loading strategy changes intentionally.

---

## 2. Core Color System

### Canonical Brand Tokens

These are the reusable palette tokens currently defined in `app/globals.css` and mirrored in `tailwind.config.ts`.

| Token | CSS Variable | Hex | RGB | Current Role |
| --- | --- | --- | --- | --- |
| Brand Blue | `--brand-blue` | `#03318C` | `rgb(3, 49, 140)` | Primary brand anchor, deep blue for trust and structure |
| Brand Cyan | `--brand-cyan` | `#3B8DBF` | `rgb(59, 141, 191)` | Softer accent blue for gradients and secondary emphasis |
| Brand Dark | `--brand-dark` | `#020617` | `rgb(2, 6, 23)` | Primary text and deepest UI contrast |
| Brand Orange | `--brand-orange` | `#F29216` | `rgb(242, 146, 22)` | Warm action/accent color |
| Brand Orange Highlight | `--brand-orange-highlight` | `#BF5B04` | `rgb(191, 91, 4)` | Darker orange for emphasis and contrast within warm treatments |
| Liquid Blue Deep | `--liquid-blue-deep` | `#03318C` | `rgb(3, 49, 140)` | Repeated token for liquid/glass recipes |
| Liquid Blue Strong | `--liquid-blue-strong` | `#022873` | `rgb(2, 40, 115)` | Secondary deep blue for stronger shadow/gradient depth |
| Liquid Blue Core | `--liquid-blue-core` | `#165FF2` | `rgb(22, 95, 242)` | Bright electric blue for glow and focus energy |
| Liquid Blue Soft | `--liquid-blue-soft` | `#3B8DBF` | `rgb(59, 141, 191)` | Soft blue bridge inside gradients |
| Liquid White | `--liquid-white` | `#F2F2F2` | `rgb(242, 242, 242)` | Frost, glass highlight, light neutral |
| Liquid Orange | `--liquid-orange` | `#F29216` | `rgb(242, 146, 22)` | Warm glass/accent base |
| Liquid Orange Deep | `--liquid-orange-deep` | `#BF4904` | `rgb(191, 73, 4)` | Deeper warm contrast for orange gradients |
| Liquid Orange Warm | `--liquid-orange-warm` | `#BF5B04` | `rgb(191, 91, 4)` | Orange emphasis layer in accent surfaces |
| Liquid Yellow | `--liquid-yellow` | `#F2C916` | `rgb(242, 201, 22)` | Supporting accent, currently defined but lightly used |
| Liquid Slate | `--liquid-slate` | `#445373` | `rgb(68, 83, 115)` | Muted grounding tone for mixed gradients and depth |

### Tailwind Brand Mapping

The Tailwind color keys are intentionally narrow and align with the same palette:

```ts
brand: {
  blue: '#03318C',
  cyan: '#3B8DBF',
  dark: '#020617',
  orange: '#F29216',
  orangeHighlight: '#BF5B04',
}
```

This means utilities like `bg-brand-blue`, `text-brand-orange`, and `focus:ring-brand-orange` are valid expressions of the same canonical palette.

---

## 3. Supporting Neutrals and Utility Colors

These colors are not all formal brand tokens, but they are part of the live visual system and should be documented as implementation-level standards.

| Color | Hex | RGB | Current Usage |
| --- | --- | --- | --- |
| White | `#FFFFFF` | `rgb(255, 255, 255)` | Page backgrounds, text on dark surfaces, globe shell base |
| Near White Frost | `#F2F2F2` | `rgb(242, 242, 242)` | Glass border and highlight system |
| Slate Track | `#F1F5F9` | `rgb(241, 245, 249)` | Scrollbar track |
| Slate Thumb | `#CBD5E1` | `rgb(203, 213, 225)` | Scrollbar thumb and subtle dividers |
| Slate Thumb Hover | `#94A3B8` | `rgb(148, 163, 184)` | Scrollbar hover state |

### Selection Styling

| Property | Value |
| --- | --- |
| Selection background | `#F29216` |
| Selection text | `#FFFFFF` |

The browser selection state currently uses the warm brand orange rather than cyan.

### Additional Implementation Colors Worth Tracking

These values are already live in the site, even though they are not yet formal CSS variables.

| Color | Hex | RGB | Current Usage |
| --- | --- | --- | --- |
| CTA Orange Base | `#C15F00` | `rgb(193, 95, 0)` | Hero/marketing CTA button base in `App.tsx` |

---

## 4. Alpha Tokens and Effect Variables

These variables are part of the interaction system rather than the flat palette. They matter because much of the interface look is produced by translucency, not solid fills alone.

| Token | Value | Purpose |
| --- | --- | --- |
| `--liquid-glass-border` | `rgb(242 242 242 / 0.44)` | Shared glass border color |
| `--liquid-ripple` | `rgba(242, 146, 22, 0.22)` | Warm ripple center on liquid surfaces |
| `--liquid-ripple-strong` | `rgba(242, 146, 22, 0.36)` | Stronger warm ripple state |
| `--liquid-ripple-blue` | `rgba(59, 141, 191, 0.16)` | Secondary cool ripple layer |
| `--liquid-ripple-blue-strong` | `rgba(22, 95, 242, 0.22)` | Stronger electric-blue ripple layer |
| `--liquid-button-ripple` | `rgba(59, 141, 191, 0.20)` | Button interaction bloom |
| `--liquid-button-ripple-strong` | `rgba(22, 95, 242, 0.34)` | Button highlight energy |
| `--liquid-glow` | `rgba(22, 95, 242, 0.18)` | General cool glow support |

### Glassmorphism Parameters

The glassmorphism system relies on `backdrop-filter` for blur and saturation plus layered frost highlights. These are the current canonical values applied via CSS component classes in `globals.css`.

| Class | Blur | Saturate | Frost Highlight Base | Notes |
| --- | --- | --- | --- | --- |
| `.glass-card` | `28px` | `145%` | `rgba(255, 255, 255, 0.18)` | Default card surface |
| `.glass-card-strong` | `32px` | `150%` | `rgba(255, 255, 255, 0.19)` | Elevated / hero-level card |
| `.glass-card-accent` | `22px` | `140%` | Warm `rgba(255, 247, 236, 0.25)` | Accent surfaces with orange warmth |
| `.glass-dock` | `28px` | `148%` | `rgba(255, 255, 255, 0.18)` | Navigation dock / navbar |
| `.liquid-surface` | `28px` | `145%` | `rgba(255, 255, 255, 0.18)` | General liquid card surface |

---

## 5. Detailed Color Breakdown by UI System

### 5.1 Page Foundation

The global page foundation is light and high-contrast:

| Layer | Value | Notes |
| --- | --- | --- |
| Body background | `#FFFFFF` | Default page canvas |
| Body text | `#020617` | Primary readable text tone |
| Top radial wash in `BackgroundCanvas` | `rgba(242,242,242,0.08)` to `rgba(255,255,255,0.82)` to `#FFFFFF` | Creates the soft atmospheric fade from top to base |

### 5.2 Background Blob System

The site-wide background blobs use translucent radial gradients rather than flat circles. This is a meaningful part of the brand look.

| Blob | Dominant Hue | Gradient Stops |
| --- | --- | --- |
| Blob One | Brand Cyan family | `rgba(59,141,191,0.34)` -> `rgba(59,141,191,0.22)` -> `rgba(59,141,191,0.12)` -> `rgba(59,141,191,0.05)` -> `transparent` |
| Blob Two | Brand Blue family | `rgba(3,49,140,0.30)` -> `rgba(3,49,140,0.18)` -> `rgba(3,49,140,0.10)` -> `rgba(3,49,140,0.04)` -> `transparent` |
| Blob Three | Electric Blue family | `rgba(22,95,242,0.32)` -> `rgba(22,95,242,0.20)` -> `rgba(22,95,242,0.11)` -> `rgba(22,95,242,0.05)` -> `transparent` |
| Blob Four | Slate family | `rgba(68,83,115,0.26)` -> `rgba(68,83,115,0.15)` -> `rgba(68,83,115,0.08)` -> `rgba(68,83,115,0.04)` -> `transparent` |
| Blob Five | Liquid Blue Strong family | `rgba(2,40,115,0.24)` -> `rgba(2,40,115,0.13)` -> `rgba(2,40,115,0.07)` -> `rgba(2,40,115,0.03)` -> `transparent` |

### 5.3 Liquid Buttons

The buttons are composite surfaces built from several layers:

#### Shared Base

| Layer | Value |
| --- | --- |
| Border | `rgba(242, 242, 242, 0.34)` |
| Base shadow | `rgba(2, 40, 115, 0.22)` |
| Inner top highlight | `rgba(255, 255, 255, 0.22)` |
| Hover border | `rgba(242, 242, 242, 0.48)` |
| Hover glow ring | `rgba(22, 95, 242, 0.10)` |
| Hover inner highlight | `rgba(255, 255, 255, 0.28)` |
| Focus outline | `rgba(22, 95, 242, 0.62)` |

#### Primary / Blue Button Fill Recipe

| Layer | Value |
| --- | --- |
| Top gloss highlight | `rgba(255, 255, 255, 0.15)` -> `rgba(255, 255, 255, 0.04)` -> `transparent` |
| Blue gradient body | `rgba(59, 141, 191, 0.72)` -> `rgba(3, 49, 140, 0.88)` |
| Ripple layer 1 | `var(--liquid-button-ripple-strong)` -> `rgba(22, 95, 242, 0.16)` -> `rgba(22, 95, 242, 0.06)` -> `transparent` |
| Ripple layer 2 | `var(--liquid-ripple-blue-strong)` -> `var(--liquid-button-ripple)` -> `rgba(59, 141, 191, 0.04)` -> `transparent` |

#### Accent / Orange Button Fill Recipe

| Layer | Value |
| --- | --- |
| Top gloss highlight | `rgba(255, 247, 236, 0.16)` -> `rgba(255, 255, 255, 0.04)` -> `transparent` |
| Orange gradient body | `rgba(242, 146, 22, 0.92)` -> `rgba(191, 73, 4, 0.86)` |

### 5.4 Liquid Surfaces and Glass Cards

The card system uses the same structural language across `.liquid-surface`, `.glass-card`, `.glass-card-strong`, and `.glass-card-accent`.

#### Shared Structural Recipe

| Layer | Value |
| --- | --- |
| Border | `rgb(242 242 242 / 0.44)` |
| Main shadow | `rgba(2, 40, 115, 0.14)` |
| Inner top line | `rgba(255, 255, 255, 0.42)` |
| Inner bottom line | `rgba(68, 83, 115, 0.08)` |
| Hover shadow | `rgba(2, 40, 115, 0.18)` |
| Hover warm outline | `rgba(242, 146, 22, 0.08)` |
| Hover inner highlight | `rgba(255, 255, 255, 0.5)` |

#### Default Glass / Surface Blend

| Layer | Value |
| --- | --- |
| Frost highlight wash | `rgba(242, 242, 242, 0.18)` -> `rgba(242, 242, 242, 0.08)` -> `transparent` |
| Cool body blend | `rgba(59, 141, 191, 0.24)` -> `rgba(3, 49, 140, 0.16)` -> `rgba(68, 83, 115, 0.14)` |
| Specular overlays | `rgba(242, 242, 242, 0.3)`, `rgba(242, 242, 242, 0.18)`, `rgba(242, 242, 242, 0.18)` |
| Ripple overlay | `var(--liquid-ripple)` plus `rgba(242, 146, 22, 0.09)` |

#### Strong / Blue Glass Blend

| Layer | Value |
| --- | --- |
| Frost highlight wash | `rgba(242, 242, 242, 0.19)` -> `rgba(242, 242, 242, 0.08)` -> `transparent` |
| Strong blue body blend | `rgba(22, 95, 242, 0.2)` -> `rgba(2, 40, 115, 0.2)` -> `rgba(68, 83, 115, 0.12)` |
| Stronger shadow | `rgba(2, 40, 115, 0.16)` |
| Stronger inner bottom line | `rgba(68, 83, 115, 0.1)` |

#### Accent / Warm Glass Blend

| Layer | Value |
| --- | --- |
| Warm highlight wash | `rgba(255, 247, 236, 0.25)` -> `rgba(255, 255, 255, 0.08)` -> `transparent` |
| Warm body blend | `rgba(242, 146, 22, 0.24)` -> `rgba(191, 91, 4, 0.2)` -> `rgba(68, 83, 115, 0.12)` |

### 5.5 Scrollbars and Browser UI

| Part | Color |
| --- | --- |
| Scrollbar track | `#F1F5F9` |
| Scrollbar thumb | `#CBD5E1` |
| Scrollbar thumb hover | `#94A3B8` |

---

## 6. Three.js Globe Color System

The globe does not use the same exact five-color blue palette as the rest of the UI. It stays adjacent to the brand palette, but it expands into extra derived blues and whites for refraction, bloom, shell highlights, and glint depth.

### Palette Conformity Check

The answer is: not strictly.

- The globe still lives in the same general family as `#03318C`, `#022873`, `#165FF2`, `#3B8DBF`, and `#F2F2F2`.
- The shader introduces darker blues than the canonical palette for depth and several brighter cyans/lighter reflective blues that do not exist as top-level brand tokens.
- Those extra hues should be treated as component-specific implementation colors, not replacements for the canonical site palette.

### Core Globe Palette

| Role | Hex | RGB | Notes |
| --- | --- | --- | --- |
| Deep shadow blue | `#000F54` | `rgb(0, 15, 84)` | Darker than the canonical palette; used for globe depth and shadow mass |
| Inner deep blue | `#001A66` | `rgb(0, 26, 102)` | Internal refraction base on the dark side of the globe |
| Surface cyan | `#00BAFF` | `rgb(0, 186, 255)` | Brighter than `#3B8DBF`; main lit side blend color |
| Inner refraction cyan | `#0099E6` | `rgb(0, 153, 230)` | Internal blue-cyan light transmitted through the globe |
| Reflection blue | `#66A8FF` | `rgb(102, 168, 255)` | Bright reflected blue used in the top shell reflections |
| Mid reflection blue | `#4D99E6` | `rgb(77, 153, 230)` | Secondary reflection fill on the left-hand side |
| Edge reflection blue | `#3380CC` | `rgb(51, 128, 204)` | Cooler right-edge reflection tone |
| Caustic highlight blue | `#3399FF` | `rgb(51, 153, 255)` | High-energy internal highlight |
| Caustic highlight cyan | `#66CCFF` | `rgb(102, 204, 255)` | Brighter internal cyan flare |
| Bottom glow cyan | `#66E6FF` | `rgb(102, 230, 255)` | Cyan lift at the bottom of the globe |

### Globe Shell and Material Colors

| Material Part | Hex | RGB | Notes |
| --- | --- | --- | --- |
| Shell base color | `#FFFFFF` | `rgb(255, 255, 255)` | Physical glass shell base |
| Liquid white / frost | `#F2F2F2` | `rgb(242, 242, 242)` | Shared frosted highlight family used across the site and globe |
| Cool reflected white | `#CCE6FF` | `rgb(204, 230, 255)` | Small shell reflection dots and cool reflection cues |
| Warm glint white | `#FFFDFC` | `rgb(255, 253, 252)` | Hottest inner glint core |
| Cool glint white | `#F5FAFF` | `rgb(245, 250, 255)` | Slightly cooler outer glint core |

### Globe Lighting and Glint Accent Colors

| Accent | Hex | RGB | Notes |
| --- | --- | --- | --- |
| Soft glint blue | `#B3E6FF` | `rgb(179, 230, 255)` | Outer glint softness |
| Halo blue | `#80D9FF` | `rgb(128, 217, 255)` | Bloom shoulder around the glint |
| Cool fringe blue | `#99D1FF` | `rgb(153, 209, 255)` | Chromatic fringe used to keep the glint from reading as flat white |
| Electric glint cyan | `#7AF0FF` | `rgb(122, 240, 255)` | Bright electric glint energy |
| Outer glint blue | `#4DB8FF` | `rgb(77, 184, 255)` | Cooler trailing edge of the glint |

### Globe Usage Notes

- The globe palette should be treated as a component-specific system, not a replacement for the main brand palette.
- The canonical site blues remain `#03318C`, `#022873`, `#165FF2`, `#3B8DBF`, and `#F2F2F2`.
- The current shader adds darker and brighter derived hues because the globe is simulating depth, refraction, reflections, and glint behavior rather than flat UI fills.
- The relationship is still coherent: the globe stays in the blue/cyan family while the rest of the site uses orange as the warm counterweight.
- `app/export-globe/page.tsx` mirrors the same globe color system for export rendering.

---

## 7. Practical Rules for Future Design Work

### Typography Rules

- Keep `Sora` reserved for high-importance display content.
- Keep `DM Sans` for readable UI and running copy.
- Avoid introducing additional display fonts without revisiting the entire system.

### Color Rules

- Treat `app/globals.css` and `tailwind.config.ts` as the canonical palette sources.
- Reuse existing liquid variables before introducing new opaque color constants.
- Distinguish between:
  - reusable palette tokens
  - component-specific implementation colors
  - one-off translucent effect layers
- Preserve the orange selection state unless a full accessibility and branding review changes it.

### Documentation Rules

- If the code palette changes, update this file and `docs/swatches.md` together.
- If a new reusable token is introduced, add it to both the CSS variable list and the swatches table.
- If a color exists only for a shader, gradient, or lighting recipe, document it here as implementation detail rather than pretending it is a global token.

---

## 8. Quick Reference

### Primary Brand Palette

`#03318C`, `#022873`, `#165FF2`, `#3B8DBF`, `#020617`, `#F29216`, `#C15F00`, `#BF4904`, `#BF5B04`, `#F2C916`, `#445373`, `#F2F2F2`, `#FFFFFF`

### Current Font Pairing

- `DM Sans`: body, UI, secondary headings
- `Sora`: major headings and display emphasis
