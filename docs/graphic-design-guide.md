# Graphic Design Guide (CJN IT Solutions)

Date: 2026-02-13  
Source of truth: `app/layout.tsx`, `tailwind.config.ts`, `app/globals.css`, and component-level color constants.

## 1) Typography

Both selected fonts are available on Google Fonts and Canva.

### Font stack and weights in use

1. `Montserrat` (Display / major headings)
   - Loaded weights: `500`, `600`, `700`, `800`, `900`
   - Main usage: `h1`, `h2`, hero headlines, major section titles
2. `Inter` (Body / UI / subheadings)
   - Loaded weights: `400`, `500`, `600`, `700`
   - Main usage: body copy, nav labels, form labels, metadata text, `h3-h6`

### Recommended role mapping

1. Hero heading: `Montserrat 800-900`
2. Section heading: `Montserrat 700-800`
3. Subheading/kicker labels: `Inter 600`
4. Body copy: `Inter 400-500`
5. Buttons and short CTAs: `Inter 700` or `Montserrat 700` (current mix is acceptable)

## 2) Core Brand Palette

| Swatch | Token / Name | HEX | RGB | Primary Use |
|---|---|---|---|---|
| <span style="display:inline-block;width:72px;height:18px;background:#005596;border:1px solid #d1d5db;"></span> | `brand-blue` | `#005596` | `rgb(0, 85, 150)` | Primary brand blue, links, key highlights |
| <span style="display:inline-block;width:72px;height:18px;background:#00AEEF;border:1px solid #d1d5db;"></span> | `brand-cyan` | `#00AEEF` | `rgb(0, 174, 239)` | Secondary accent, gradients, selection |
| <span style="display:inline-block;width:72px;height:18px;background:#020617;border:1px solid #d1d5db;"></span> | `brand-dark` | `#020617` | `rgb(2, 6, 23)` | Main text, dark buttons |
| <span style="display:inline-block;width:72px;height:18px;background:#FFAA40;border:1px solid #d1d5db;"></span> | `brand-orange` | `#FFAA40` | `rgb(255, 170, 64)` | Warm accent, highlights |
| <span style="display:inline-block;width:72px;height:18px;background:#FF8C00;border:1px solid #d1d5db;"></span> | `brand-orange-highlight` | `#FF8C00` | `rgb(255, 140, 0)` | Hover/highlight orange |
| <span style="display:inline-block;width:72px;height:18px;background:#C15F00;border:1px solid #d1d5db;"></span> | CTA Orange (button base) | `#C15F00` | `rgb(193, 95, 0)` | Main accent CTA button fill |
| <span style="display:inline-block;width:72px;height:18px;background:#0A4F8A;border:1px solid #d1d5db;"></span> | Manifesto/Text Accent Blue | `#0A4F8A` | `rgb(10, 79, 138)` | Kicker/manifesto emphasis text |

## 3) Frosted Glass and Surface Palette

| Swatch | Name | HEX | RGB | Usage |
|---|---|---|---|---|
| <span style="display:inline-block;width:72px;height:18px;background:#FFFFFF;border:1px solid #d1d5db;"></span> | White | `#FFFFFF` | `rgb(255, 255, 255)` | Base background, text-on-dark contrast |
| <span style="display:inline-block;width:72px;height:18px;background:#E8F4FF;border:1px solid #d1d5db;"></span> | Nav Frost Base | `#E8F4FF` | `rgb(232, 244, 255)` | Top navbar frosted overlay |
| <span style="display:inline-block;width:72px;height:18px;background:#DFF1FF;border:1px solid #d1d5db;"></span> | Menu Frost Base | `#DFF1FF` | `rgb(223, 241, 255)` | Fullscreen menu frosted panel |
| <span style="display:inline-block;width:72px;height:18px;background:#BFDBFE;border:1px solid #d1d5db;"></span> | Glass Border | `#BFDBFE` | `rgb(191, 219, 254)` | Frosted card borders |
| <span style="display:inline-block;width:72px;height:18px;background:#E9F5FF;border:1px solid #d1d5db;"></span> | Glass Gradient A | `#E9F5FF` | `rgb(233, 245, 255)` | Standard card gradient start |
| <span style="display:inline-block;width:72px;height:18px;background:#DCEEFF;border:1px solid #d1d5db;"></span> | Glass Gradient B | `#DCEEFF` | `rgb(220, 238, 255)` | Standard card gradient mid |
| <span style="display:inline-block;width:72px;height:18px;background:#D1E8FF;border:1px solid #d1d5db;"></span> | Glass Gradient C | `#D1E8FF` | `rgb(209, 232, 255)` | Standard card gradient end |
| <span style="display:inline-block;width:72px;height:18px;background:#ECF7FF;border:1px solid #d1d5db;"></span> | Strong Glass A | `#ECF7FF` | `rgb(236, 247, 255)` | Strong glass card start |
| <span style="display:inline-block;width:72px;height:18px;background:#E0F0FF;border:1px solid #d1d5db;"></span> | Strong Glass B | `#E0F0FF` | `rgb(224, 240, 255)` | Strong glass card mid |
| <span style="display:inline-block;width:72px;height:18px;background:#D4EAFF;border:1px solid #d1d5db;"></span> | Strong Glass C | `#D4EAFF` | `rgb(212, 234, 255)` | Strong glass card end |

## 4) Decorative 3D/Background Palette

| Swatch | Name | HEX | RGB | Usage |
|---|---|---|---|---|
| <span style="display:inline-block;width:72px;height:18px;background:#579AF6;border:1px solid #d1d5db;"></span> | Globe Blue 1 | `#579AF6` | `rgb(87, 154, 246)` | Animated globe core |
| <span style="display:inline-block;width:72px;height:18px;background:#165EA8;border:1px solid #d1d5db;"></span> | Globe Blue 2 | `#165EA8` | `rgb(22, 94, 168)` | Animated globe core |
| <span style="display:inline-block;width:72px;height:18px;background:#123D66;border:1px solid #d1d5db;"></span> | Globe Blue 3 | `#123D66` | `rgb(18, 61, 102)` | Animated globe fresnel depth |
| <span style="display:inline-block;width:72px;height:18px;background:#E0F2FE;border:1px solid #d1d5db;"></span> | Globe Glass Tint | `#E0F2FE` | `rgb(224, 242, 254)` | Globe attenuation/glass tint |
| <span style="display:inline-block;width:72px;height:18px;background:#6DC7FF;border:1px solid #d1d5db;"></span> | Data Mesh 1 | `#6DC7FF` | `rgb(109, 199, 255)` | Decorative network background |
| <span style="display:inline-block;width:72px;height:18px;background:#3EA7FF;border:1px solid #d1d5db;"></span> | Data Mesh 2 | `#3EA7FF` | `rgb(62, 167, 255)` | Decorative network background |
| <span style="display:inline-block;width:72px;height:18px;background:#8FDCFF;border:1px solid #d1d5db;"></span> | Data Mesh 3 | `#8FDCFF` | `rgb(143, 220, 255)` | Decorative network background |

## 5) Canva Brand Kit Quick Copy (HEX only)

Copy these directly into Canva brand colors:

```text
#005596
#00AEEF
#020617
#FFAA40
#FF8C00
#C15F00
#0A4F8A
#FFFFFF
#E8F4FF
#DFF1FF
#BFDBFE
#E9F5FF
#DCEEFF
#D1E8FF
#ECF7FF
#E0F0FF
#D4EAFF
#579AF6
#165EA8
#123D66
#E0F2FE
#6DC7FF
#3EA7FF
#8FDCFF
```

## 6) Notes for consistency

1. Keep heading font to `Montserrat` only (avoid mixing more display fonts).
2. Keep body and UI text on `Inter`.
3. Use `#C15F00` only for strong CTAs so orange remains a conversion cue.
4. Keep frosted surfaces in the light-blue family above; avoid introducing neutral gray cards.
