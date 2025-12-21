# Marzban Subscription Proxy

## Overview

This is a VPN subscription proxy application that provides users with an alternative URL to access their Marzban VPN subscription links. The application acts as a proxy server, fetching subscription data from a configured Marzban server and serving it through a Replit-hosted endpoint. This is useful when the original Marzban subscription URLs are blocked or inaccessible.

The application features a React frontend with a clean, mobile-first Material Design interface, and an Express backend that handles proxy requests in Google Apps Script style.

## Deployment Status

**Published**: Yes
**Published URL**: https://merhaba-nasilsin-chatgptplusucin.replit.app
**Status**: Active and running 24/7 (Core plan)

## User Preferences

Preferred communication style: Simple, everyday language (Turkish).

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: Shadcn UI (New York style) built on Radix UI primitives
- Component library provides a comprehensive set of accessible, customizable UI components
- Tailwind CSS for styling with Material Design principles
- Simple, focused interface showing only the template URL for Marzban integration

**State Management**: Minimal - just for UI state (copy button feedback)

**Routing**: Wouter for lightweight client-side routing
- Single home page with integration instructions

**Design System**:
- Mobile-first responsive design
- Clear, step-by-step instructions for Marzban integration
- Card-based layout with centered content (max-w-2xl)

### Backend Architecture

**Runtime**: Node.js with Express framework

**API Endpoints**:
1. **`/api/sub/:token?format={format}`** - Direct token-based proxy
   - Used for direct Replit access
   - Example: `/api/sub/ABC123?format=base64`

2. **`/api/exec?url={url}`** - Google Apps Script style proxy (RECOMMENDED)
   - Used for Marzban integration
   - Proxies any subscription URL passed as parameter
   - Marzban automatically replaces {USER_TOKEN} and {FORMAT}
   - Example: `/api/exec?url=https://mary.marylytm.uk/sub/{USER_TOKEN}?format={FORMAT}`

**CORS Configuration**: Enabled for all origins on API routes

**Request Handling**:
- Fetches from configured Marzban server (mary.marylytm.uk)
- Returns subscription data with appropriate content types
- Logs requests with timing information
- Handles errors gracefully with proper HTTP status codes

**Build Process**:
- Client: Vite builds React app to dist/public
- Server: esbuild bundles server code to dist/index.js with ESM format
- Development and production entry points configured

### Data Storage Solutions

**Database**: PostgreSQL via Neon (configured but not actively used)
- Proxy service operates statelessly
- No persistent data storage needed for current functionality

### External Dependencies

**VPN Service Integration**:
- Marzban VPN server at https://mary.marylytm.uk
- Proxy forwards subscription requests to this service
- Uses GET method with proper User-Agent headers

**Third-Party Services**:
- Radix UI component primitives
- Tailwind CSS styling
- Lucide React for icons

**Development Tools** (Replit-specific):
- `@replit/vite-plugin-runtime-error-modal`
- `@replit/vite-plugin-cartographer`
- `@replit/vite-plugin-dev-banner`

**Subscription Format Support**:
- base64: Standard V2Ray subscription format
- clash: Clash for Windows/Android format
- singbox: sing-box VPN client format

## Integration Instructions for Marzban

### Template URL to Use in Marzban Settings:
```
https://merhaba-nasilsin-chatgptplusucin.replit.app/api/exec?url=https://mary.marylytm.uk/sub/{USER_TOKEN}?format={FORMAT}
```

### Steps:
1. Access your Marzban panel
2. Navigate to Settings → Subscription
3. Set the "Subscription URL Template" field to the template URL above
4. Save settings

Marzban will automatically replace `{USER_TOKEN}` with each user's token and `{FORMAT}` with the requested format. All 30-40 users will now receive subscriptions through this proxy automatically.

## Recent Changes

- **2025-11-21**: 
  - Implemented Google Apps Script style `/api/exec?url=` endpoint for Marzban integration
  - Simplified frontend to focus on integration instructions
  - Published application to Replit
  - Set up for 24/7 operation via Core plan deployment
