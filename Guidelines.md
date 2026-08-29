# AISpecs — Design System Guidelines

## Overview

AISpecs is a dark-themed SaaS product for generating design-system component specifications from screenshots or Figma nodes. The visual language is precise, technical, and trustworthy — deep navy backgrounds with a cyan-blue brand accent that signals accuracy and clarity.

**Primary fonts:** Inter (headings, UI) + Cousine (code labels, spec values)

---

## Color Tokens

Taken verbatim from Figma Variables → AI Assistant.

### Brand
| Token     | Hex       | Tailwind class | Usage                                         |
|-----------|-----------|----------------|-----------------------------------------------|
| Brand     | `#3B9EDB` | `text-brand` / `bg-brand` | Primary interactive, icons, accents  |

### Foreground
| Token        | Hex       | Usage                                |
|--------------|-----------|--------------------------------------|
| Foreground 1 | `#F0F4F8` | Primary text, headings               |
| Foreground 2 | `#C8D8E4` | Secondary body text                  |
| Accent 1     | `#8FB4CE` | Subdued descriptions, step numbers   |
| Accent 2     | `#4E6E84` | Placeholder text, muted labels       |

### Border
| Token    | Hex       | Usage                                      |
|----------|-----------|--------------------------------------------|
| Border 1 | `#1A2333` | Section dividers, card borders, FAQ lines  |
| Border 2 | `#2E3D52` | Input borders, secondary dividers          |

### Background
| Token | Hex       | Usage                                              |
|-------|-----------|----------------------------------------------------|
| bg 1  | `#0C131B` | Hero section, darker alternating sections          |
| bg 2  | `#0F1015` | Feature/steps sections, card backgrounds           |
| bg 3  | `#1C2130` | Input backgrounds, elevated surfaces, notifications|

---

## Typography

### Font Families
| Family  | Weights loaded    | Role                        |
|---------|-------------------|-----------------------------|
| Inter   | 400, 500, 600     | All UI text and headings    |
| Cousine | 400               | Code-style spec labels only |

### Type Scale
| Role            | Family  | Weight | Size  | Line-height | Tracking   |
|-----------------|---------|--------|-------|-------------|------------|
| Heading 1       | Inter   | 600    | 48px  | 50px        | −1.2px     |
| Heading 2       | Inter   | 600    | 40px  | 44px        | −0.8px     |
| Card Title      | Inter   | 600    | 14px  | 25px        | —          |
| Body Large      | Inter   | 400    | 17px  | 29px        | —          |
| Body            | Inter   | 400    | 14px  | 25px        | —          |
| Caption         | Inter   | 400    | 12px  | 18px        | —          |
| Section Label   | Inter   | 500    | 11px  | 17px        | 1.65px     |
| Button Text     | Inter   | 500    | 14px  | 21px        | 0.35px     |
| Spec / Code     | Cousine | 400    | 12px  | 18px        | —          |

---

## Spacing Tokens

From Figma Variables → Spacing.

| Token | Value | Usage example                        |
|-------|-------|--------------------------------------|
| xs    | 8px   | Tight gaps, dot + label              |
| sm    | 12px  | Form sub-labels, FAQ padding         |
| md    | 16px  | Input horizontal padding             |
| lg    | 20px  | Card internal gap, section labels    |
| xl    | 24px  | Feature card padding supplement      |
| 2xl   | 32px  | Card padding, step number bottom gap |
| 3xl   | 40px  | Section internal spacing             |
| 5xl   | 64px  | Section vertical padding             |
| 6xl   | 80px  | Section horizontal padding           |

---

## Border Radius

| Token | Value | Usage               |
|-------|-------|---------------------|
| lg    | 8px   | All rounded elements|

Cards use `rounded-[12px]` (not a variable — used consistently for feature/spec cards).

---

## Components

### Tag
- Border: 1px solid Brand (`#3B9EDB`)
- Radius: lg (8px)
- Padding: 6px 12px
- Text: Inter Medium 11px, uppercase, letter-spacing 1.65px, Brand color
- No fill (transparent background)

### Button — Primary
- Background: Brand (`#3B9EDB`)
- Text: Foreground 1 (`#F0F4F8`), Inter Medium 14px, tracking 0.35px
- Padding: 12px 24px
- Right border radius: lg (8px); left is flat when joined with EmailInput
- **Hover:** background `#2B8EC8` (Brand −10% lightness)
- Transition: background-color 150ms ease
- Cursor: pointer

### EmailInput
- Background: bg 3 (`#1C2130`)
- Text: Foreground 1 (`#F0F4F8`), Inter Regular 14px
- Placeholder: Accent 2 (`#4E6E84`)
- Padding: 12px 16px
- Left border radius: lg (8px); right is flat when joined with Button
- **States:**
  - Default: border 1px solid Border 2 (`#2E3D52`)
  - Hover: border 1px solid Accent 2 (`#4E6E84`)
  - Focus: border 1px solid Brand (`#3B9EDB`), no browser outline
  - Error: border 1px solid `#E05252` *(derived error color — not in Variables, flag for token addition)*

### FaqItem (Accordion)
- Full-width, separated by 1px solid Border 1 (`#1A2333`)
- Question row: padding 20px 0, flex row, space-between
- Question text: Inter SemiBold 14px, Foreground 1
- Chevron icon: Brand color, rotates 180° when open (transition 200ms)
- Answer text: Inter Regular 14px, Foreground 2 (`#C8D8E4`), padding-bottom 20px
- Answer reveal: max-height transition (overflow hidden)

### Notification — Success Toast
- Position: fixed, bottom-right (24px from edges)
- Background: bg 3 (`#1C2130`)
- Border: 1px solid Brand (`#3B9EDB`)
- Radius: lg (8px)
- Padding: 2xl (16px)
- Title: Inter SemiBold 14px, Foreground 1
- Body: Inter Regular 12px, Accent 1 (`#8FB4CE`)
- Checkmark icon: Brand color
- Auto-dismiss: 4 seconds
- Animate: slide up + fade in from bottom

---

## Section Layout

| Property              | Value                            |
|-----------------------|----------------------------------|
| Container max-width   | 1400px                           |
| Section h-padding     | 6xl — 80px                       |
| Section v-padding     | 5xl — 64px                       |
| Section top border    | 1px solid Border 1 (`#1A2333`)   |
| Alternating bg        | bg1 (`#0C131B`) / bg2 (`#0F1015`)|

### Grid patterns
- **Hero:** text column (left) + illustration (right, absolutely positioned)
- **Features (Огляд функцій):** 2 × 2 card grid, gap 20px
- **How It Works:** 4-column equal grid, gaps handled by column padding
- **FAQ:** single column, max-width 720px, horizontally centered
- **CTA:** single centered column, max-width 640px

---

## Interaction States

All interactive elements must implement:
1. **Hover** — visible background or border shift
2. **Focus** — Brand color border/ring, keyboard accessible
3. **Active/Pressed** — slightly darker than hover
4. **Error** — border color change + error message below input
5. **Disabled** — opacity 40%, cursor not-allowed (when applicable)

Transition duration: 150ms for colors, 200ms for transforms and max-height.

---

## Notes on Missing Tokens

- **Error color** (`#E05252`) is used for input error state but is not defined in Figma Variables. Recommend adding `Color / Error` token.
- `rounded-[12px]` for cards is used consistently but not in Variables. Recommend adding `Border Radius / xl = 12px` token.
