# Marzban Subscription Proxy - Design Guidelines

## Design Approach

**Selected System**: Material Design (simplified)
**Rationale**: Technical utility application requiring clarity, reliability, and mobile-first accessibility. Users need quick, efficient access to subscription information without visual distractions.

## Core Design Principles

1. **Function First**: Every element serves a clear purpose
2. **Mobile Priority**: Users likely configure VPN on mobile devices
3. **Copy-Friendly**: Subscription link must be easily selectable and copyable
4. **Technical Clarity**: Clear status indicators and instructions

## Typography

**Font Family**: 
- Primary: 'Inter' or 'Roboto' via Google Fonts
- Code/Links: 'Roboto Mono' for subscription URLs

**Hierarchy**:
- Page Title: text-2xl font-semibold
- Section Headers: text-lg font-medium
- Body Text: text-base font-normal
- Subscription Link: text-sm font-mono
- Helper Text: text-sm text-gray-600

## Layout System

**Spacing Units**: Tailwind units of 4, 6, 8, and 12
- Component padding: p-6
- Section spacing: space-y-8
- Inner element spacing: space-y-4

**Container**:
- Max width: max-w-2xl
- Centered: mx-auto
- Vertical padding: py-12
- Horizontal padding: px-4 sm:px-6

## Component Library

### Primary Layout
- Single-column centered layout
- Card-based content containers with subtle borders
- Responsive stacking (mobile-first)

### Key Components

**Subscription Link Display**:
- Large, prominent card with border
- Monospace font for the URL
- One-click copy button with icon
- Success feedback on copy ("Copied!" message)
- Background: subtle gray to differentiate from page

**Status Indicator**:
- Connection status badge (Active/Testing)
- Simple dot + text format
- Positioned near page title

**Instructions Card**:
- Numbered step-by-step list
- Icons for each platform (iOS, Android, Windows)
- Collapsible sections for platform-specific details

**QR Code Section** (Optional):
- Generated QR code for quick mobile scanning
- "Scan with VPN app" label
- Centered display

### Navigation
- Minimal header with app name
- No complex navigation needed
- Optional "Refresh" button for manual updates

### Forms & Inputs
- Not applicable for this utility

### Data Display
- Subscription format selector (if supporting multiple formats)
- Radio buttons or simple tabs: Base64 | Clash | Singbox
- Clean selection states

## Visual Treatment

**Cards/Containers**:
- Border: border border-gray-200
- Rounded: rounded-lg
- Background: bg-white
- Shadow: shadow-sm (subtle)

**Interactive Elements**:
- Copy button: Primary button style with icon
- Hover states: Subtle brightness increase
- Active states: Slight scale down

**Spacing & Rhythm**:
- Consistent vertical rhythm with space-y-4 between related elements
- space-y-8 between major sections
- Generous padding inside cards (p-6)

## Mobile Optimization

- Touch-friendly button sizes (minimum h-12)
- Full-width buttons on mobile
- Adequate spacing between interactive elements (min 8px)
- Link displays break-all or break-words for long URLs
- Single-column layout throughout

## Accessibility

- Proper contrast ratios for all text
- Focus indicators on interactive elements
- Clear copy success feedback (visual + text)
- Semantic HTML structure
- Screen reader labels for icon-only buttons

## Page Structure

1. **Header Section**: App title + status indicator
2. **Primary Card**: New subscription link with copy button
3. **Instructions Section**: Platform-specific setup steps
4. **Original Link Reference** (collapsed): Shows original Marzban link for reference
5. **Footer**: Minimal - connection info or last updated timestamp

## No Hero Image Required

This is a utility application - no decorative imagery needed. Focus entirely on functional clarity and ease of use.

**Key Success Metrics**: User can copy subscription link in under 3 seconds, clear understanding of how to use the new link, mobile-friendly interface for on-the-go configuration.