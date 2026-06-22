# Design Plan: ChatBubble Applied to 壁纸精选

## Source
Based on `chatbubble-DESIGN.md` — a conversational, friendly, light-first design system.

## Key Differences from Green Deck
- **Light background** (#FFFFFF) — NOT dark
- **Surface** (#F3F4F6) — light gray, not dark surfaces
- **20px border-radius** — generous, friendly rounding
- **No large shadows** — clean, flat feel
- **44px minimum touch target** — mobile-first
- **Primary green** (#22C55E) — for interactive accents
- **Blue** (#3B82F6) — for links and secondary actions
- **Purple** (#A855F7) — for reactions/premium

## Token System

### Colors
```
Background:  #FFFFFF (pure white)
Surface:     #F3F4F6 (light gray — cards, received messages)
Primary:     #22C55E (green — sent messages, active states)
Secondary:   #3B82F6 (blue — links, received accent)
Tertiary:    #A855F7 (purple — reactions, premium)
Success:     #22C55E
Warning:     #F59E0B
Error:       #EF4444
Text:        #000000 (primary), #6B7280 (secondary)
Border:      #E5E7EB (subtle dividers)
```

### Typography
```
Font: DM Sans (Google Fonts) — friendly, rounded feel
Display:    DM Sans 800, tracking -0.02em
Body:       DM Sans 400, line-height 1.6
Label:      DM Sans 600, 0.875rem
```

### Border Radius
```
All bubbles/cards: 20px (generous, friendly)
Buttons: 12px
Inputs: 12px
Icons: 9999px (circle)
```

### Elevation
```
No large shadows — use surface color differences instead
Subtle: 0 1px 3px rgba(0,0,0,0.08) for cards if needed
```

## Component Mapping

| Component | ChatBubble Rule | Implementation |
|-----------|----------------|----------------|
| **Background** | #FFFFFF | White page background |
| **Cards** | #F3F4F6 surface, 20px radius | ImageCard with light gray bg |
| **Buttons** | 12px radius, primary green | Pill-ish but less rounded than 9999px |
| **Chips** | 20px radius, #F3F4F6 bg | Category filters |
| **Search** | 12px radius, #F3F4F6 bg | Input field |
| **Header** | White bg, subtle bottom border | Clean, minimal |
| **Hover** | Subtle surface change | #F3F4F6 → #E5E7EB |
| **Touch targets** | 44px minimum | All buttons/interactive elements |

## Do's Applied
- ✅ 20px large radius for all card-like elements
- ✅ No large shadows on cards/bubbles
- ✅ 44px minimum touch target on mobile
- ✅ Light, friendly, approachable feel
- ✅ Surface color differences for elevation

## Don'ts Respected
- ✅ No large shadows on message bubbles (cards)
- ✅ No dark backgrounds
